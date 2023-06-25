import { Schema, model } from 'mongoose';

const EmailSchema = new Schema(
  {
    ip: {
      type: String,
    },
    subject: {
      type: String,
      required: [true, 'Please add a subject'],
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
