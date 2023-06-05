import { Request, Response, NextFunction } from 'express';
import redis from 'redis';

import Feature from '@models/Feature';
import { ErrorResponse } from '@utils/errorResponse';

// @desc        Get all features
// @route       GET /api/v1/features
// @access      Public
const getFeatures = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const features = await Feature.find();

    res.status(200).json({ success: true, count: features.length, data: features });
  } catch (error) {
    next(error);
  }
};

// @desc        Get single feature
// @route       GET /api/v1/features:id
// @access      Public
const getFeature = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const feature = await Feature.findById(req.params.id);

    if (!feature) return next(new ErrorResponse(`Feature not found with ID: ${req.params.id}`, 404));

    res.status(200).json({ success: true, data: feature });
  } catch (error) {
    next(error);
  }
};

// @desc        Create new feature
// @route       POST /api/v1/features
// @access      Private
const createFeature = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const feature = await Feature.create(req.body);
    res.status(201).json({ success: true, data: feature });
  } catch (error) {
    next(error);
  }
};

// @desc        Update single feature
// @route       PUT /api/v1/features:id
// @access      Private
const updateFeature = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const feature = await Feature.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!feature) return next(new ErrorResponse(`Feature not found with ID: ${req.params.id}`, 404));
    res.status(200).json({ success: true, data: feature });
  } catch (error) {
    next(error);
  }
};

// @desc        Delete single feature
// @route       DELETE /api/v1/features:id
// @access      Private
const deleteFeature = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const feature = await Feature.findByIdAndDelete(req.params.id);

    if (!feature) return next(new ErrorResponse(`Feature not found with ID: ${req.params.id}`, 404));
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

export { getFeatures, getFeature, createFeature, updateFeature, deleteFeature };
