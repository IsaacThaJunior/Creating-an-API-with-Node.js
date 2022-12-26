const express = require('express');
const {
  getAllTours,
  createTour,
  getOneTour,
  updateTour,
  deleteTour,
  getFiveCheap,
  checkRequestBody,
  getTourStats
} = require('../controllers/tourControllers');
const router = express.Router();

router.route('/top-5-cheap').get(getFiveCheap,getAllTours)
router.route('/tour-stats').get(getTourStats)

router.route('/').get(getAllTours).post(checkRequestBody, createTour);

router.route('/:id').get(getOneTour).patch(updateTour).delete(deleteTour);

module.exports = router;
