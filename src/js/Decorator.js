export class App {


	constructor(){

	}

}



export class ForecastDecorator extends App{


	constructor(app){
		super();
		this.app = app;
		this.calendar = document.getElementById('calendar');
		this.monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
		this.weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
		this.initCaledar();
	}


	formatDate(date) {
	    let d = new Date(date),
	            month = '' + (d.getMonth() + 1),
	            day = '' + d.getDate(),
	            year = d.getFullYear(),
	            weekDay = d.getDay();

	    if (month.length < 2)
	        month = '0' + month;
	    if (day.length < 2)
	        day = '0' + day;
	    // return day;
	    return [year, month, day,weekDay];
	}



	initCaledar(){
		let options = "";
		let curr = new Date;
		let first = curr.getDate()
		let firstday = (new Date(curr.setDate(first))).toString();




		// Set Current Month
		let currMonth = curr.getMonth();
		let month = this.monthNames[currMonth];
		document.getElementById('month').innerText = month
		document.getElementById('monthCount').innerText = currMonth


		// Set Current Year
		let currYear = curr.getFullYear();
		document.getElementById('year').innerText = currYear



		for (let i = 0; i < 7; i++) {

		    let next = new Date(curr.getTime());



		    next.setDate(first + i);

		    let weekDay = this.formatDate((next.toString()))[3]
		    let weekDayName = this.weekDays[weekDay];

			let day = this.formatDate((next.toString()))[2];
		    let div = document.createElement('div');

		    div.innerHTML = day + '<div class="weekDay">' +  weekDayName + '</div>'; 
			div.className = 'date-item';		    
		    div.dataset.day = day;
		    div.dataset.index = i;


		    this.calendar.appendChild(div)


		}
	}





}