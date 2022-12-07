const express = require('express');
const {
  getAllTours,
  createTour,
  getOneTour,
  updateTour,
  deleteTour,
  // checkID,
  checkRequestBody,
} = require('../controllers/tourControllers');
const router = express.Router();

// router.param('id', checkID);

router.route('/').get(getAllTours).post(checkRequestBody, createTour);

router.route('/:id').get(getOneTour).patch(updateTour).delete(deleteTour);

module.exports = router;
