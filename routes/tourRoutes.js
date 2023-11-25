const express = require('express');
const tourController = require('./../controllers/tourController');
const fs = require('fs');

// Route handlers



/// Routes

const router = express.Router();

router.get('/', tourController.getAllTours);
router.get('/:id', tourController.getTourById);


router.post('/', tourController.createTour);
router.patch('/:id', tourController.updateTour);

module.exports = router;
