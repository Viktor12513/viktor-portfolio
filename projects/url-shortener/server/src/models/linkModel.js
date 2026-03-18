import mongoose from 'mongoose';

const visitSchema = new mongoose.Schema(
  {
    visitedAt: {
      type: Date,
      default: Date.now
    }
  },
  { _id: false },
);

const linkSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
    trim: true
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  clickCount: {
    type: Number,
    default: 0
  },
  visits: {
    type: [visitSchema],
    default: []
  },
  expiresAt: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const LinkModel = mongoose.model('Link', linkSchema);
