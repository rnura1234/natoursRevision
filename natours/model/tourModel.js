const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'name must be filled'],
  },
  duration: {
    type: Number,
    required: [true, 'Tour must have durations '],
  },

  maxGroupSize: {
    type: Number,
    required: [true, 'group size  is required'],
  },

  price: {
    type: Number,
    required: [true, 'A tour must have price'],
    min: 100,
    max: 4000,
  },
  priceDiscount: Number,
  summary: {
    type: String,
    maxlength: 200,
    required: [true, 'summery field is required'],
  },

  ratingsAverage: {
    type: Number,
    default: 3,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'difficult'],
  },
  descriptions: {
    type: String,
    trim: true,
  },
  imageCover: { type: String, required: [true, 'tour must have cover image'] },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  startDate: [Date],
});

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
