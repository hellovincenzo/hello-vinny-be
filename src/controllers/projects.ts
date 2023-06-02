import { Request, Response, NextFunction } from 'express';
import redis from 'redis';

import Project from '@models/Project';
import { ErrorResponse } from '@utils/errorResponse';

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
    const project = await Project.create(req.body);
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

export { getProjects, getProject, createProject, updateProject, deleteProject };
