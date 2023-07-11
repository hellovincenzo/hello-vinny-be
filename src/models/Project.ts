import { Schema, model } from 'mongoose';

import slugify from 'slugify';

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      unique: true,
      trim: true,
      maxlength: [50, 'Name can not be more than 50 characters'],
    },
    slug: String,
    role: {
      type: String,
      required: true,
      trim: true,
      maxlength: [50, 'Role can not be more than 50 characters.'],
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: [500, 'Content can not be more than 500 characters'],
    },
    link: {
      type: String,
      // match: [validator.isURL, 'Please use a valid URL wit HTTP or HTTPS'],
    },
    stack: {
      react: {
        type: Boolean,
        default: false,
      },
      next: {
        type: Boolean,
        default: false,
      },
      typescript: {
        type: Boolean,
        default: false,
      },
      node: {
        type: Boolean,
        default: false,
      },
      express: {
        type: Boolean,
        default: false,
      },
      python: {
        type: Boolean,
        default: false,
      },
      django: {
        type: Boolean,
        default: false,
      },
      java: {
        type: Boolean,
        default: false,
      },
      spring: {
        type: Boolean,
        default: false,
      },
      scss: {
        type: Boolean,
        default: false,
      },
      tailwind: {
        type: Boolean,
        default: false,
      },
      mui: {
        type: Boolean,
        default: false,
      },
      mongodb: {
        type: Boolean,
        default: false,
      },
      mysql: {
        type: Boolean,
        default: false,
      },
      postgre: {
        type: Boolean,
        default: false,
      },
    },
    photo: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// Create project slug from the name
ProjectSchema.pre('save', function (next) {
  this.slug = this.name && slugify(this.name, { lower: true });

  next();
});

export default model('Project', ProjectSchema);
