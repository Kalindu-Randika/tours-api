const express = require('express');
const fs = require('fs');

const app = express();
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

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


// Routers


app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);


// app.get('/', (req, res) => {
//   res.status(200).json({ message:'This is response from server', app: "natours"});
// })
//
// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint');
// })


// Start the server
module.exports = app;
