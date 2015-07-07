function eachKeyValue (obj, onEach) {
	Object.keys(obj).forEach(function (key) {
		onEach(key, obj[key])
	});
}

var days;

$(document).ready(function () {
	days = [];
	$.get('/days', function (data) {console.log('GET response data', data)})

});