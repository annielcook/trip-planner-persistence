var dayRouter = require('express').Router();
var models = require('../models');


dayRouter.get('/', function (req, res, next){
	models.Day
	.find({})
	.exec(function (err, days){

		//console.log(days);
		res.json(days);
	})
})

dayRouter.post('/', function(req, res, next) {

   models.Day.find().exec()
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

module.exports = dayRouter;