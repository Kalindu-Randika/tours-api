const express = require('express');
const tourController = require('./../controllers/tourController');
const fs = require('fs');

// Route handlers



/// Routes

const router = express.Router();

router.param('id', (req, res, next, val) => {
  console.log(`Tour id is ${val}`);
  next();
});

router.get('/', tourController.getAllTours);
router.get('/:id', tourController.getTourById);


router.post('/', tourController.createTour);
router.patch('/:id', tourController.updateTour);

module.exports = router;
