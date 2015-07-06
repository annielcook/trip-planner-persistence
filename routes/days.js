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

dayRouter.post('/', function (req, res, next){
	var newDay = new Day();
	console.log(newDay);
	res.status(200);
})

module.exports = dayRouter;