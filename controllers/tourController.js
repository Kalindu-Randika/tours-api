const express = require('express');
const fs = require('fs')
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours.json`));

// Route handlers
exports.getAllTours = (req, res) => {

  res.status(200).json({
    status: 'success' ,
    requestedat: req.requestTime,
    results: tours.length,
    data: {
      tours
    }
  })
}

exports.getTourById = (req, res) => {

  const id = req.params.id * 1;
  const tour = tours.find( el => el.id === id)

  if(!tour){
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID"
    })
  }

  res.status(200).json({
    status: 'success' ,
    data: {
      tours: tour
    }
  })
}

exports.createTour = (req, res) => {
  const newId = tours.length > 0 ? tours[tours.length - 1].id + 1 : 1;
  const newTour = Object.assign({id: newId}, req.body);

  tours.push(newTour);
  fs.writeFile(`${__dirname}/../dev-data/data/tours.json`, JSON.stringify(tours) , err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    })
  })}

exports.updateTour = (req, res) => {

  const id = req.params.id * 1;
  const tour = tours.find( el => el.id === id)

  if(!tour){
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID"
    })
  }

  res.status(200).json({
    status: "success",
    data: {
      tour: '<Updated tour>'
    }
  })
}
