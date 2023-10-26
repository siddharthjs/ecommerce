function validateForm(){
	const isPasswordValid = validatePassword()
	const isEmailValid = validateEmail()
	return isPasswordValid && isEmailValid
}

function validateEmail(){
const email = document.getElementById('email').value
const emailError = document.getElementById('emailError')

let errorMessage = ""
let isValid = true

const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

if(!email){
	errorMessage += "Email is required!"
	isValid = false
}
else if(!emailPattern.test(email)){
	errorMessage += "Invalid email format."
	isValid = false
}

emailError.textContent = errorMessage
return isValid
}

function validatePassword(){
const password = document.getElementById('password').value
const passwordError = document.getElementById('passwordError')

let errorMessage = ""
let isValid = true

if(password.length < 8){
	errorMessage += "Password should be at least 8 characters. "
	isValid = false
}
if(!/[a-z]/.test(password)){
	errorMessage += "Lowercase letter required. "
	isValid = false
}
if(!/[A-Z]/.test(password)){
	errorMessage += "Uppercase letter required. "
	isValid = false
}
if(!/[0-9]/.test(password)){
	errorMessage += "Number required. "
	isValid = false
}
if(!/[!@#$%^&*()]/.test(password)){
	errorMessage += "Special character required."
	isValid = false
}

passwordError.textContent = errorMessage
return isValid

}