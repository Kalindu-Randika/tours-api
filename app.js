const express = require('express');
const fs = require('fs');

const app = express();
const morgan = require('morgan');

// Middleware

app.use(morgan('dev'));

app.use(express.json());

app.use((req,res,next) => {
  console.log("Hellow from the middleware");
  next();
});

app.use((req,res,next)=>{
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours.json`));

// Route handlers
const getAllTours = (req, res) => {

  res.status(200).json({
    status: 'success' ,
    requestedat: req.requestTime,
    results: tours.length,
    data: {
      tours
    }
  })
}

const getTourById = (req, res) => {

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

const createTour = (req, res) => {
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
  })}

const updateTour = (req, res) => {

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

const getAllUsers = (req, res) => {
  res.status(500).json(
    {status: 'error',
    message: 'This route is not yet defined'}
  )
};

const getUser = (req, res) => {
  res.status(500).json(
    {status: 'error',
      message: 'This route is not yet defined'}
  )
};

const createUser = (req, res) => {
  res.status(500).json(
    {status: 'error',
      message: 'This route is not yet defined'}
  )
};

const updateUser = (req, res) => {
  res.status(500).json(
    {status: 'error',
      message: 'This route is not yet defined'}
  )
};

const deleteUser = (req, res) => {
  res.status(500).json(
    {status: 'error',
      message: 'This route is not yet defined'}
  )
};
// Routes

app.get('/api/v1/tours', getAllTours);
app.get('/api/v1/tours/:id', getTourById);



app.post('/api/v1/tours', createTour);
app.patch('/api/v1/tours/:id', updateTour);

app.route('/api/v1/tours').get(getAllTours);

app.route('/api/v1/users').get(getAllUsers).post(createUser);

app.route('/api/users/:id').get(getUser).patch(updateUser).delete(deleteUser);


// app.get('/', (req, res) => {
//   res.status(200).json({ message:'This is response from server', app: "natours"});
// })
//
// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint');
// })


// Start the server
const port = 3000;
app.listen(port, () => {
  console.log('App running on port 3000');
});

