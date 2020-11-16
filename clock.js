const clockContainer = document.querySelector(".js-clock");
  clockTitle = clockContainer.querySelector("h1");

function getTime() {
	const date = new Date();
	const minutes = date.getMinutes();
	const hours = date.getHours();
	const seconds = date.getSeconds();
	clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
	//innerText는 문자열을 그대로 리턴하지만 innerHTML은 문자열을 html로 인식하여 리턴
}
// `(back) {문자열} 이랑 $ 이용하기 {데이터}

function init() {
	getTime();
	setInterval(getTime, 1000);
	//1초마다 새로고침
}

init();