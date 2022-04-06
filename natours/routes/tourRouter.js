const express = require('express');
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  top5CheapTour,
} = require('../controller/tourController');

const router = express.Router();
router.route('/top-5-cheap').get(top5CheapTour, getAllTours);
// router.param('id', checkId);
router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
