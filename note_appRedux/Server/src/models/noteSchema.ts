import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: false,
    },
  },
  { collection: 'notes' }
);

export = mongoose.model('note', noteSchema);
