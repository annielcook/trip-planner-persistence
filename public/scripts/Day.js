var Day, currentDay;

$(document).ready(function () {



	$.get('/days', function (data) {
		if(data.length === 0) {
			currentDay = new Day(null, [], [], 1);
			currentDay.$button.addClass('current-day');
		} else {
			data.forEach(function(day){
				new Day(day.hotel, day.restaurants, day.thingsToDo, day.number);
			})

		}
	})

	Day = function (h, rest, todo, num) {
		this.hotel = h;
		this.restaurants = rest;
		this.thingsToDo = todo;
		this.number = num;

		this.buildButton()
			.drawButton();
	}


	Day.prototype.buildButton = function () {
		this.$button = $('<button class="btn btn-circle day-btn"></button>').text(this.number);
		var self = this;
		this.$button.on('click', function () {
			self.switchTo();
		});
		return this;
	};

	Day.prototype.drawButton = function () {
		var $parent = $('.day-buttons');
		this.$button.appendTo($parent);
		return this;
	};

	Day.prototype.eraseButton = function () {
		this.$button.detach();
		return this;
	};

	Day.prototype.switchTo = function () {
		function eraseOne (attraction) {
			attraction.eraseMarker().eraseItineraryItem();
		}
		if (currentDay.hotel) eraseOne(currentDay.hotel);
		currentDay.restaurants.forEach(eraseOne);
		currentDay.thingsToDo.forEach(eraseOne);

		function drawOne (attraction) {
			attraction.drawMarker().drawItineraryItem();
		}
		if (this.hotel) drawOne(this.hotel);
		this.restaurants.forEach(drawOne);
		this.thingsToDo.forEach(drawOne);

		currentDay.$button.removeClass('current-day');
		this.$button.addClass('current-day');
		$('#day-title > span').text('Day ' + this.number);
		currentDay = this;
	};

	function deleteCurrentDay () {
		if (days.length > 1) {
			var index = days.indexOf(currentDay),
				previousDay = days.splice(index, 1)[0],
				newCurrent = days[index] || days[index - 1];
			days.forEach(function (day, idx) {
				day.number = idx + 1;
				day.$button.text(day.number);
			});
			newCurrent.switchTo();
			previousDay.eraseButton();
		}
	};

	$('#add-day').on('click', function () {
		
		$.post('/days', function (data) {
			console.log(data);
			new Day(null, [], [], data.number);
			$.get('/days', function (data2) {console.log('GET response data', data2)})
		})
		
	});

	$('#day-title > .remove').on('click', deleteCurrentDay);
});