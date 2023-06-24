import { Schema, model } from 'mongoose';

const EmailSchema = new Schema(
  {
    ip: {
      type: String,
    },
    subject: {
      type: String,
      required: [true, 'Please add a subject'],
    },
    who: {
      type: [String],
      validate(value: string) {
        if (value === 'test') {
          throw new Error('Age must be a positive number');
        }
      },
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
