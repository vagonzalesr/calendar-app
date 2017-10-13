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
			var date = self.dom.startDate.value.split('-');
			self.data.startDate = new Date(parseInt(date[0]),parseInt(date[1]),parseInt(date[2]));
			self.data.numberDays = parseInt(self.dom.numberDays.value);
			self.data.countryCode = self.dom.countryCode.value;
			self.buildDates(function(){
				self.render();
			});
		});
	},
	buildDates: function(callback) {
		var self = this;

		self.calendar = [];

		// Building all dates in a simple array
		var array = [];
		for (let i = 0; i < self.data.numberDays; i++) {
			array[i] =  new Date(new Date().setDate(self.data.startDate.getDate() + i));
		}

		// Splice all dates in weeks
		var week = [];
		array.forEach(function(date, index) {
			week.push(date); // Push a date in the week
			var lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0); // Last day of month
			if (date.getDay() === 6 || index === array.length - 1 || date.toDateString() === lastDayOfMonth.toDateString()) {				
				self.calendar.push(week); // Push a week in the calendar
				week = [];
			}
		});

		// Complete non full weeks
		self.calendar.forEach(function(week) {
			if (week.length < 7) {
				var firstDay = week[0].getDay();
				var lastDay = week[week.length - 1].getDay();
				for (let i = 0; i < firstDay; i++) {
					week.unshift(null);
				}
				for (var i = 6; i > lastDay; i--) {
					week.push(null);
				}
			}			
		});

		callback();
	},
	render: function() {
		var self = this;

		self.dom.calendarBody.innerHTML = '';

		self.calendar.forEach(function(week, i) {
			var firsDateOfWeek = week.filter(function(e, i, a) { return e != null;})[0]
			// Render Header Month
			if (i == 0 || firsDateOfWeek.getDate() == 1) {
				var newRowHeader = self.dom.calendarBody.insertRow(self.dom.calendarBody.rows.length);				
				var newCellHeader  = newRowHeader.insertCell(0);
				newCellHeader.setAttribute('colspan', '7');				
				newCellHeader.innerText = self.months[firsDateOfWeek.getMonth()] + ' ' + firsDateOfWeek.getFullYear();
			}
			// Render every day of Week
			var newRow = self.dom.calendarBody.insertRow(self.dom.calendarBody.rows.length);
			week.forEach(function(date, index) {
				var newCell  = newRow.insertCell(index);
				if (date !== null) {
					newCell.innerText = date.getDate();
					if (date.getDay() == 0 || date.getDay() == 6) {
						newCell.classList.add('weekend');
					}
				} else {
					newCell.classList.add('invalid');
				}
			});
		});
	}
};

main.init();