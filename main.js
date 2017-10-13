var main = {
	dom: {},
	data: {},
	days: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
	months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
	calendar: [],
	init: function () {
		var self = this;
		self.buildDOM();
		self.setListeners();
	},
	buildDOM: function() {
		var self = this;
		self.dom.startDate = document.getElementById('start-date');
		self.dom.countryCode = document.getElementById('country-code');
		self.dom.numberDays = document.getElementById('number-days');
		self.dom.buttonSubmit = document.getElementById('button-submit');
		self.dom.calendarBody = document.querySelector('#calendar tbody');
	},
	setListeners: function() {
		var self = this;
		self.dom.buttonSubmit.addEventListener('click', function() {
			self.data.startDate = new Date(self.dom.startDate.value);
			self.data.numberDays = parseInt(self.dom.numberDays.value);
			self.data.countryCode = self.dom.countryCode.value;
			self.buildDates();
		});
	},
	buildDates: function() {
		var self = this;
		// Building all dates in a simple array
		var array = [];
		for (let i = 0; i < self.data.numberDays; i++) {
			array[i] =  new Date(new Date().setDate(self.data.startDate.getDate() + i));
		}
		console.log(array);
	},
};

main.init();