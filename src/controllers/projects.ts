import path from 'path';
import fs from 'fs';
import redis from 'redis';
import { Request, Response, NextFunction } from 'express';

import Project from '@models/Project';
import { ErrorResponse } from '@utils/errorResponse';

import { UploadedFile } from 'express-fileupload';

// @desc        Get all projects
// @route       GET /api/v1/projects
// @access      Public
const getProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projects = await Project.find();

    res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    next(error);
  }
};

// @desc        Get single project
// @route       GET /api/v1/projects:id
// @access      Public
const getProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) return next(new ErrorResponse(`Project not found with ID: ${req.params.id}`, 404));

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
    // res.status(400).json({ success: false });
  }
};

// @desc        Create new project
// @route       POST /api/v1/projects
// @access      Private
const createProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let project: any;
    const file = req.files?.file as UploadedFile;

    if (!file) {
      project = await Project.create(req.body);
    } else {
      // Check file being an image
      if (file.mimetype.startsWith('image')) {
        new ErrorResponse('Please upload a file', 400);
      }

      // Check file size
      if (file.size > Number(process.env.MAX_SIZE_UPLOAD)) {
        new ErrorResponse(`Please upload an image less than ${process.env.MAX_SIZE_UPLOAD}`, 400);
      }

      // Create custom file name
      file.name = path.parse(file.name).name + '_' + Date.now() + path.parse(file.name).ext;

      project = await Project.create({ ...req.body, photo: file.name });

      // Check if folder exist
      fs.access(`${process.env.FILE_UPLOAD_PROJECTS_PATH}/${project._id}`, fs.constants.F_OK, (err) => {
        // Project ID Folder does not exist
        if (err) {
          // Create New Project Folder with ID 'project._id'
          fs.mkdir(`${process.env.FILE_UPLOAD_PROJECTS_PATH}/${project._id}`, { recursive: true }, (err) => {
            if (err) {
              new ErrorResponse('Problem while creating folder with ID:' + project._id, 400);
            }
          });
        }

        // Move the photo in folder
        file.mv(`${process.env.FILE_UPLOAD_PROJECTS_PATH}/${project._id}/${file.name}`, async (err) => {
          if (err) {
            return next(new ErrorResponse(`Problem with file upload`, 500));
          }
        });
      });
    }

    res.status(201).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

// @desc        Update single project
// @route       PUT /api/v1/projects:id
// @access      Private
const updateProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!project) return next(new ErrorResponse(`Project not found with ID: ${req.params.id}`, 404));
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

// @desc        Delete single project
// @route       DELETE /api/v1/projects:id
// @access      Private
const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) return next(new ErrorResponse(`Project not found with ID: ${req.params.id}`, 404));
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

// @desc        Upload photo for bootcamp
// @route       PUT /api/v1/projects:id/photo
// @access      Private
const projectPhotoUpload = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) return next(new ErrorResponse(`Project not found with ID: ${req.params.id}`, 404));

    const file = req.files?.file as UploadedFile;

    if (!file) new ErrorResponse('Please upload a file', 400);

    // Check file being an image
    if (file.mimetype.startsWith('image')) {
      new ErrorResponse('Please upload a file', 400);
    }

    // Check file size
    if (file.size > Number(process.env.MAX_SIZE_UPLOAD)) {
      new ErrorResponse(`Please upload an image less than ${process.env.MAX_SIZE_UPLOAD}`, 400);
    }

    // Create custom file name
    file.name = path.parse(file.name).name + '_' + Date.now() + path.parse(file.name).ext;

    file.mv(`${process.env.FILE_UPLOAD_PROJECTS_PATH}/${project._id}/${file.name}`, async (err) => {
      if (err) {
        return next(new ErrorResponse(`Problem with file upload`, 500));
      }

      await Project.findByIdAndUpdate(req.params.id, {
        photo:
          req.protocol +
          '://' +
          req.get('host') +
          `${process.env.FILE_UPLOAD_PROJECTS_PATH?.replace('./public', '')}/${file.name}`,
      });
    });

    res.status(200).json({
      success: true,
      data: file.name,
    });
  } catch (error) {
    next(error);
  }
};

export { getProjects, getProject, createProject, updateProject, deleteProject, projectPhotoUpload };
