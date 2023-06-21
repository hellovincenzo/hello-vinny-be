import { Schema, model } from 'mongoose';

const EmailSchema = new Schema(
  {
    subject: {
      type: String,
      required: [true, 'Please add a subject'],
    },
    who: {
      type: String,
      required: [true, 'Please select your status'],
      enum: ['Hiring', 'Other'],
    },
    description: {
      type: String,
      require: [true, 'Please add a description'],
    },
  },
  {
    timestamps: true,
  },
);

export default model('Email', EmailSchema);
