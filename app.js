const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours.json`));


app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
   status: 'success' ,
    results: tours.length,
    data: {
     tours
    }
  })
});

app.get('/api/v1/tours/:id', (req, res) => {

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
});

app.post('/api/v1/tours', (req, res) => {
  const newId = tours.length > 0 ? tours[tours.length - 1].id + 1 : 1;
  const newTour = Object.assign({id: newId}, req.body);

  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours.json`, JSON.stringify(tours) , err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    })
  })

});


// app.get('/', (req, res) => {
//   res.status(200).json({ message:'This is response from server', app: "natours"});
// })
//
// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint');
// })

const port = 3000;
app.listen(port, () => {
  console.log('App running on port 3000');
});

