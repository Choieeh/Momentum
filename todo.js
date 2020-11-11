const toDoForm = document.querySelector(".js-toDoForm"),
	  toDoInput = toDoForm.querySelector("input"),
	  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';



let toDos = [];

function deleteToDo(event) {
	const btn =event.target;
	const li = btn.parentNode;
	toDoList.removeChild(li);
	const cleanToDos = toDos.filter(function(toDo){
		return toDo.id !== parseInt(li.id);
	});
	//filter는 array의 모든 것 확인한 후 true인 것만 모아서 다시 array만듦
	toDos = cleanToDos;
	saveToDos();
}

function saveToDos(){
	localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
	//localStorage에는 JS의 데이터 타입인 object, boolean등이 안들어가기 때문에 JSON.stringify사용
}

function paintToDo(text) {
	const li = document.createElement("li");
	const delBtn = document.createElement("button");
	const span = document.createElement("span");
	const newId = toDos.length + 1;
	
	delBtn.innerHTML = "X";
	delBtn.addEventListener("click", deleteToDo);
	span.innerText = text;
	li.appendChild(delBtn);
	li.appendChild(span);
	li.id = newId;
	
	toDoList.appendChild(li);
	
	const toDoObj = {
		text : text,
		id : newId
	};
	toDos.push(toDoObj);
	saveToDos();
}

function handleSubmit(event){
	event.preventDefault();
	const currentValue = toDoInput.value;
	paintToDo(currentValue);
	toDoInput.value="";
}

function loadToDos() {
	const loadedToDos = localStorage.getItem(TODOS_LS);
	if(loadedToDos !== null) {
		const parsedToDos = JSON.parse(loadedToDos);
		//마찬가지로 JSON을 사용해서 string을 다시 object 형식으로 바꿔줌
		parsedToDos.forEach(function(toDo){
			paintToDo(toDo.text);
		});
		//forEach는 array에 담겨있는 것 하나하나마다 함수 실행
	} 
}

function init() {
	loadToDos();
	toDoForm.addEventListener("submit", handleSubmit)
}

init();