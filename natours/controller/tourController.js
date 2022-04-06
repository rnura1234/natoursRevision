const { match } = require('assert');
const { query, json } = require('express');
const express = require('express');
const fs = require('fs');
const { findByIdAndDelete } = require('../model/tourModel');
const Tour = require('../model/tourModel');

// exports.checkId = (req, res, next, id) => {
//   if (id > tours.length - 1) {
//     return res.status(401).json({
//       error: 'error',
//       message: 'Invalid Id',
//     });
//   }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(401).json({
//       status: 'failed',
//       message: 'tour must have name and price field',
//     });
//   }
//   next();
// };

exports.top5CheapTour = async (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = 'price';
  req.query.fields = 'name,price,difficulty,summary,duration';
  next();
};
exports.getAllTours = async (req, res) => {
  try {
    //BUILD THE QUERY

    //1) Filtering
    const reqObj = { ...req.query };
    const excludedField = ['limit', 'sort', 'page', 'fields'];
    excludedField.forEach((el) => delete reqObj[el]);

    //2)ADVANCE FILTERING
    let queryStr = JSON.stringify(reqObj);
    queryStr = queryStr.replace(/\b(lt|gt|lte|gte)\b/g, (match) => `$${match}`);

    //QUERY

    let query = Tour.find(JSON.parse(queryStr));
    //3)SORTING
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    //4) LIMITING FIELD
    if (req.query.fields) {
      const limitFields = req.query.fields.split(',').join(' ');
      query = query.select(limitFields);
    } else {
      query = query.select('-__v');
    }

    //5)PAGINATION
    const page = req.query.page * 1;
    const limit = req.query.limit * 1;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTour = await Tour.countDocuments();
      if (skip >= numTour) {
        throw new Error('this page does not exit');
      }
    }
    const tours = await query;
    //RESPONSE DATA
    res.status(200).json({
      message: 'success',
      results: tours.length,
      data: { tours },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      errorMassage: err,
    });
  }
};
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    return res.status(200).json({
      status: 'success',
      message: 'data added succesfully',
      data: {
        newTour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      status: 'success',
      data: {
        updatedTour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await findByIdAndDelete(req.params.id);
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
