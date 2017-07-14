
export default function getForcast(city,callback){

		let url = 'https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text in ("'+city+'"))&format=json&env=store://datatables.org/alltableswithkeys';


		return fetch(url)
		.then((response) => response.json())
		.then(function(json) {
			callback(json,city)
		 })
		 .catch( alert );


	}



