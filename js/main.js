const buttonGetUser = document.querySelector("#js-btn");
const tBody = document.querySelector("#js-tbody");
const allUsers = document.querySelector("#all-user").textContent.trim();
const buttonSearchById = document.querySelector("#js-search-by-ID");
const buttonAddUser = document.querySelector("#js-add-user");
const buttunDeleteUser = document.querySelector("#js-delete-by-ID")

buttonGetUser.addEventListener("click", getAllUsers);
buttonSearchById.addEventListener("click", getUserById);
buttonAddUser.addEventListener("click", addUser);
buttunDeleteUser.addEventListener("click", removeUser);

const compile = _.template(allUsers);
const updateView = user => {
	let userString = "";
	user.map((index) => {
		userString += compile(index);
	});
	tBody.innerHTML = userString;
};

//ф-я для получения всех пользователей БД
function getAllUsers() {
	event.preventDefault()
	fetch("https://test-users-api.herokuapp.com/users/")
	.then(response => {
		if (response.ok) return response.json();
		throw new Error("Error fetching data");
	})
	.then(user => {
	//console.log(user.data); 
	updateView(user.data);

})
	.catch(error => {
		console.error("Error: ", error);
	});
};

//ф-я для получения пользователя с id
function getUserById(id) {
	event.preventDefault()
	id = document.querySelector("#input-ID");
	const resultById = document.querySelector(".result-ID");
	fetch("https://test-users-api.herokuapp.com/users/" + id.value)
	.then(response => {
		if (response.ok) return response.json();
		throw new Error("Error fetching data");
	})
	.then(user => {
	//console.log(user.data); 
	//updateView(user.data); 
	resultById.textContent = JSON.stringify(user.data.name);   
})
	.catch(error => {
		console.error("Error: ", error);
	});
};

//ф-я для записи пользователя с полями name age
function addUser(name, age) {
	event.preventDefault()
	name = document.querySelector("#name");
	age = document.querySelector("#age");	
	fetch('https://test-users-api.herokuapp.com/users', {
		method: 'POST',
		body: JSON.stringify({ name: name.value, age: age.value}),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		}
	});	
};

//ф-я для удаления пользователя с id
function removeUser(id) {
	event.preventDefault()
	id = document.querySelector("#delete-user");
	fetch('https://test-users-api.herokuapp.com/users' + id.value , {
		method: 'delete',
		headers: {
			"X-Custom-Header": "",
		}
	});
};

//функция для обновления данных по id.user 
function updateUser(id, user) {
	event.preventDefault()
	id = document.querySelector("#updata-user");
	user = {
		name: "Ruuus",
		age: 111111
	};
	fetch('https://test-users-api.herokuapp.com/users', {
		method: 'POST',
		body: JSON.stringify({ name: user.name, age: user.age}),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		}
	});
};