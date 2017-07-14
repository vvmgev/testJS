import getForcast from './src/js/getForcast';
import {App,ForecastDecorator} from './src/js/Decorator';


class Main extends ForecastDecorator {

	constructor(app){
		super(app);



		this.forecasts = {};
		this.selectedCity = undefined;



		let citiesUl = document.getElementById('citiesUl');
		let caledarDays = document.getElementById('calendar');
		let temperatureLow = document.getElementById('temperatureLowSpan');
		let temperatureHigh = document.getElementById('temperatureHighSpan');
		let dayStatus = document.getElementById('dayStatus');
		let dayStatusImg = document.getElementById('dayStatusImg');

		this.caledarDays = caledarDays
		this.citiesUl = citiesUl;
		this.temperatureLow = temperatureLow;
		this.temperatureHigh = temperatureHigh;
		this.dayStatus = dayStatus;
		this.dayStatusImg = dayStatusImg;


		citiesUl.addEventListener('click',this.citiesUlHandler.bind(this));
		caledarDays.addEventListener('click',this.caledarDaysHalder.bind(this));



		this.geocoder;
		this.lat;
		this.lng;


	  	if (navigator.geolocation) {
		    navigator.geolocation.getCurrentPosition(this.successFunction.bind(this), this.errorFunction.bind(this));
			this.initGoogleMaps();

		} 

	}


	citiesUlHandler(e){
		let childElem = e.target;
		let city = childElem.dataset.city
		this.selectedCity = city;
		getForcast(city,(data,city)=>this.forcastHandler(data,city))

	}

	forcastHandler(data,city){
		this.forecasts[city] = data
		document.getElementById('city').innerText = city.toUpperCase();
		let today = document.getElementsByClassName('date-item')[0]
		today.click();

	}


	caledarDaysHalder(e){
		let chidlEleme = e.target;
		let index = chidlEleme.dataset.index;
		let day = chidlEleme.dataset.day;


		if(this.selectedCity == undefined){
			alert('Please choose city')
			return false;
		}


		let selectedCityObj = this.forecasts[this.selectedCity];
		let selectedCityData = selectedCityObj.query.results.channel.item.forecast
		let currentData = selectedCityData[index];



		let lastActiveDaysArr = document.getElementsByClassName("active");
		let lastActiveDaysArrLength = lastActiveDaysArr.length

		if(lastActiveDaysArrLength > 0){
			for(let i = 0; i<lastActiveDaysArrLength; i++){
				let elem = lastActiveDaysArr[i];
				elem.classList.remove("active")
			}
		}

		e.target.classList.add('active')

		this.setData(currentData);

	}

	setData(data){
		this.temperatureLow.innerText = data.low
		this.temperatureHigh.innerText = data.high
		this.dayStatus.innerText = data.text
		let url = './src/img/'+data.text + '.png';
		this.dayStatusImg.src = url

	}


		initGoogleMaps(){
			let script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = 'http://maps.googleapis.com/maps/api/js?sensor=false';
			script.onload = () => {
				this.initialize()
			}
			document.getElementsByTagName('head')[0].appendChild(script);

		}

		initialize() {
		  this.geocoder = new google.maps.Geocoder();

		}



		successFunction(position) {
	    	let lat = position.coords.latitude;
	    	let lng = position.coords.longitude;
	    	this.codeLatLng(lat, lng);
		}


		errorFunction(){
		    alert("Geocoder failed");
		}



		codeLatLng(lat, lng) {

		  let latlng = new google.maps.LatLng(lat, lng);
		  this.geocoder.geocode({'latLng': latlng}, (results, status) => {
		    if (status == google.maps.GeocoderStatus.OK) {
		      if (results[1]) {
		      	console.log(results)
		           for (var i=0; i<results[0].address_components.length; i++) {
		          for (var b=0;b<results[0].address_components[i].types.length;b++) {

		              if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
		                  var city= results[0].address_components[i];
		                  break;
		              }
		          }
		      }
		      
		      this.setCity(city.long_name)


		      } else {
		        alert("No results found");
		      }
		    } else {
		      alert("Geocoder failed due to: " + status);
		    }
		  });
		}



		setCity(city){
			this.cityNameByGeo = city.toLowerCase();
			var cityA = document.querySelectorAll('[data-city="'+this.cityNameByGeo+'"]')[0];
			cityA.click();
		}










}



new Main(App);




