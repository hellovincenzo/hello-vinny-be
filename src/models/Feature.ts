import { Schema, model } from 'mongoose';

const FeatureSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
  },
  {
    timestamps: true,
  },
);

export default model('Feature', FeatureSchema);
