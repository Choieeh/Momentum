const weather = document.querySelector(".js-weather");

const API_KEY = "7938719976d75f63796340b245b10d61";
const COORDS = 'coords';

function getWeather(lat, lon){
	fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`).then(function(json){}).then(function(json){
		const temperature = json.main.temp;
		const place = json.name;
		weather.innerText = `${temperature} @ ${place}`;
	});
	//then은 data가 완전히 들어온다음에 ()호출
}

function saveCoords(coordsObj){
	localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;
	const coordsObj = {
		latitude,
		longitude
	};
	console.log("aaaaa")
	saveCoords(coordsObj);
	getWeather(latitude, longitude);
}

function handleGeoError() {
	console.log("asdf");
}

function askForCoords() {
	navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords(){
	const loadedCoords = localStorage.getItem(COORDS);
	if(loadedCoords === null) {
		askForCoords();
	} else{
		const parsedCoords = JSON.parse(loadedCoords);
		getWeather(parsedCoords.latitude, parsedCoords.longitude);
	}
}

function init() {
	loadCoords();
}

init();