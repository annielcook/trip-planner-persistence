var dayRouter = require('express').Router();
var attractionRouter = require('express').Router();
var models = require('../models');


dayRouter.get('/', function(req, res, next) {
  models.Day
    .find({})
    .exec(function(err, days) {

      //console.log(days);
      res.json(days);
    })
})

dayRouter.post('/', function(req, res, next) {
  models.Day.exec()
    .then(function(days) {
      console.log("trying to create a day");
      models.Day.create({
        number: days.length + 1,
        hotel: null,
        restaurants: [],
        thingsToDo: []
      }).then(function(day) {
        console.log("DAY CREATED ...");
        res.json(day);
      }).then(null, function(err) {
        console.log("Error:", err);
      })
    });
});
// GET /days/:id
dayRouter.get('/:id', function(req, res, next) {
  // serves a particular day as json
  models.Day
    .findOne({
      _id: req.params.id
    })
    .exec(function(err, day) {
      res.json(day);
    })
});
// DELETE /days/:id
dayRouter.delete('/:id', function(req, res, next) {
  // deletes a particular day
});

//dayRouter.use('/:id', attractionRouter);
// POST /days/:id/hotel
attractionRouter.post('/hotel', function(req, res, next) {
  // creates a reference to the hotel
  console.log(typeof req.body._id);
  models.Day
    .findOne({
      _id: req.body._id
    }, function(err, obj) {
      console.log("the found object:    ", obj)
    })
    .exec()
    .then(function(day) {
      console.log("This is the day!  ", day);
      day.hotel = req.body.name;
    })
  res.send();
});
// DELETE /days/:id/hotel
attractionRouter.delete('/hotel', function(req, res, next) {
  // deletes the reference of the hotel
});
// POST /days/:id/restaurants
attractionRouter.post('/restaurant', function(req, res, next) {
  // creates a reference to a restaurant
  console.log("made it to restaurants")
});
// DELETE /days/:dayId/restaurants/:restId
attractionRouter.delete('/restaurant/:id', function(req, res, next) {
  // deletes a reference to a restaurant
});
// POST /days/:id/thingsToDo
attractionRouter.post('/things-to-d', function(req, res, next) {
  // creates a reference to a thing to do
  console.log("made it to things to d")
});
// DELETE /days/:dayId/thingsToDo/:thingId
attractionRouter.delete('/things-to-d/:id', function(req, res, next) {
  // deletes a reference to a thing to do
});
module.exports = {
  dayRouter: dayRouter,
  attractionRouter: attractionRouter
}