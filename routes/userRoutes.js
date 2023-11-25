const express = require('express');
const { router } = require('express/lib/application');
const userController = require('./../controllers/userController')
// Routes


// app.route('/api/v1/tours').get(getAllTours);

const router1 = express.Router();

router1.route('/').get(userController.getAllUsers).post(userController.createUser);

router1.route('/:id').get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser);

module.exports = router1;
