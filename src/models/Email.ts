import { Schema, model } from 'mongoose';

const EmailSchema = new Schema(
  {
    ip: {
      type: String,
    },
    name: {
      type: String,
      required: [true, 'Please add your full name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please add your email address'],
      trim: true,
    },
    who: {
      type: [String],
      required: [true, 'Please select your status'],
      enum: ['Hiring', 'Other'],
    },
    description: {
      type: String,
      require: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model('Email', EmailSchema);
