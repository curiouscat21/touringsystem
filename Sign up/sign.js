const signInBtn = document.getElementById("signIn");
const signUpBtn = document.getElementById("signUp");
const firstForm = document.getElementById("form1");
const secondForm = document.getElementById("form2");
const container = document.querySelector(".container");

// Store users in localStorage
let users = JSON.parse(localStorage.getItem('users')) || [];

signInBtn.addEventListener("click", () => {
	container.classList.remove("right-panel-active");
});

signUpBtn.addEventListener("click", () => {
	container.classList.add("right-panel-active");
});

// Handle Sign Up
firstForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const username = firstForm.querySelector('input[type="text"]').value;
	const email = firstForm.querySelector('input[type="email"]').value;
	const password = firstForm.querySelector('input[type="password"]').value;

	// Check if user already exists
	if (users.find(user => user.email === email)) {
		alert('User already exists! Please sign in.');
		container.classList.remove("right-panel-active");
		return;
	}

	// Add new user
	users.push({ username, email, password });
	localStorage.setItem('users', JSON.stringify(users));
	alert('Registration successful! Please sign in.');
	container.classList.remove("right-panel-active");
	firstForm.reset();
});

// Handle Sign In
secondForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const email = secondForm.querySelector('input[type="email"]').value;
	const password = secondForm.querySelector('input[type="password"]').value;

	// Check if user exists and password matches
	const user = users.find(user => user.email === email && user.password === password);
	
	if (user) {
		// Store current user session
		localStorage.setItem('currentUser', JSON.stringify(user));
		window.location.href = 'portfolio/index.html';
	} else {
		alert('Invalid credentials! Please sign up if you haven\'t already.');
	}
});
