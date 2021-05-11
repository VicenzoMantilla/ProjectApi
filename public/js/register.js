// Log In Validation Variables 

const form = document.getElementById('form');
const username = document.getElementById('user');
const email = document.getElementById('email');
const password = document.getElementById('pwd');
const password2 = document.getElementById('pwd2');
const errorDisplay = document.getElementsByClassName('errorMessage');
const validMessage = document.getElementsByClassName('validMessage');

//  Form Validation Variables 

var formExist = document.getElementsByTagName('form');
var LabelQuantity = document.getElementsByTagName('label');
var InputsQuantity= document.getElementsByTagName('input');
var ButtonsQuantity= document.getElementsByTagName('button');
var divVisibility=document.getElementById('containerValid');
var listErrors=document.getElementById('listErrors');
var AnchorValidation=document.getElementById('anchorForm');
var buttonReset=document.getElementById('reset');
var singIn = document.getElementById('singIn');
var userInformation = document.getElementById('userInformation');

// Control Variables 

var textForm="";
var textPassword="";
var textEmail="";
var textFullName="";
var PasswordVerification="";
var textConfirm="";
var valid = 0;
var validUser=0;

// Reset Control 

function CleanInputs(){
	document.getElementById('user').value="";
	document.getElementById('pwd').value="";
	document.getElementById('pwd2').value="";
	document.getElementById('email').value="";
};

//Clean Inputs Functions

function CleanPassword(){
	if (textPassword !== "Valid Password"){
		valid= 0;
		errorDisplay[1].style.display='none';
	};
};

function CleanPasswordMatch(){
	if (PasswordVerification !=="Passwords Match"){
		PasswordVerification="";
		errorDisplay[2].style.display='none';
	}
};
function CleanEmail(){
	if (textEmail !=="Valid Email"){
		errorDisplay[3].style.display='none';
	}
};
function CleanUserName(){
	if (textFullName !=="First and Last Name correct"){
		textFullName="";
		errorDisplay[0].style.display='none';
	}
};

// Funcions for Styles Messages

function userStylesMessage(){
	errorDisplay[0].style.display='flex';
	validMessage[0].style.display='none';
};
function passwordStylesMessage(){
	errorDisplay[1].style.display='flex';
	validMessage[1].style.display='none';
};
function emailStylesMessage(){
	errorDisplay[3].style.display='flex';
	validMessage[3].style.display='none';
};
function validationMessagePassword(){
	errorDisplay[1].innerHTML=textPassword;
	passwordStylesMessage();
};
function validationMessagePassword2(){
	errorDisplay[2].innerHTML=PasswordVerification;
	errorDisplay[2].style.display='flex';
	validMessage[2].style.display='none';
};
function validationMessageUser(){
	errorDisplay[0].innerHTML=textFullName;
	userStylesMessage();
};
function validationMessageEmail(){
	errorDisplay[3].innerHTML=textEmail;
	emailStylesMessage();
}

// Events 

window.addEventListener("load", ()=>{
	setTimeout(formValidations,1000);
});
username.addEventListener("focus",function(e){
	CleanUserName(textFullName);
});
username.addEventListener("blur",function(e){
	checkUser(textFullName);
});
password.addEventListener("focus",function(e){
	CleanPassword(textPassword);
});
password.addEventListener("blur",function(e){
	checkPassword(valid);
});
password2.addEventListener("focus",function(e){
	CleanPasswordMatch(PasswordVerification);
});
password2.addEventListener("blur",function(e){
	checkPasswordValidation(PasswordVerification);
});
email.addEventListener("focus",function(e){
	CleanEmail(textEmail);
});
email.addEventListener("blur",function(e){
	checkEmail(textEmail);
});
buttonReset.addEventListener("click",function(e){
	CleanInputs();
});
singIn.addEventListener("click",function(e){
	if (validUser==1 && valid==0 && textEmail=="Valid Email" && PasswordVerification=="Passwords Match"){
		accountInformation.style.visibility='visible';	
		var confirmEmail="Your email is: " + email.value;
		var confirmPassword="Your Password is: " + `${password.value}`;
		var showEmail = document.createElement('li');
		showEmail.appendChild(document.createTextNode(confirmEmail));
		userInformation.appendChild(showEmail);
		var showPassword = document.createElement('li');
		showPassword.appendChild(document.createTextNode(confirmPassword));
		userInformation.appendChild(showPassword);

		validUser=0;
		handleRegister();
		username.value="";
		email.value="";
		password.value="";
		password2.value="";
		var cleanAll = document.querySelectorAll('div.validMessage');
		Array.prototype.forEach.call(cleanAll, function(e){
		e.setAttribute('style', 'display: none;')
		});	
	}else{
		alert("Incorrect User Name, Email or Password, Please try again.");
		username.value="";
		email.value="";
		password.value="";
		password2.value="";
		var cleanAll = document.querySelectorAll('div.validMessage');
		Array.prototype.forEach.call(cleanAll, function(e){
		e.setAttribute('style', 'display: none;')
		});
	}
});


// Validation Functions

function formValidations(){

	control="pass";

	if (document.getElementById('form') == null) {
		document.getElementById('validationDetail').innerHTML="Form is not found";
		divVisibility.style.visibility= 'visible';
	}else if (AnchorValidation == 'undefined' || AnchorValidation == null){
		textForm="The Anchor is Missing";
		showErrors(textForm);
		control="error";
	}else if (LabelQuantity.length !== 6) {
        textForm="There are missing labels for inputs";
		showErrors(textForm);
		control="error";
    }else if (InputsQuantity.length !== 5) {
        textForm="There are missing inputs";
		showErrors(textForm);
		control="error";
    }else if (ButtonsQuantity.length !== 2) {
        textForm="Missing submit button";
		showErrors(textForm);
		control="error";
    }else if (control == "pass"){
		textForm="Every validation has passed.";
		showErrors(textForm);
	}
};
function showErrors(){
	var li = document.createElement('li');
	li.appendChild(document.createTextNode(textForm));
	listErrors.appendChild(li);
	divVisibility.style.visibility= 'visible';
};
function checkUser (){

	fullname = document.getElementById('user').value
	space = fullname.indexOf(" ");
	firstname= fullname.substring(0,space);
	lastname= fullname.substring(space+1,fullname.length);

	if (username.value === '' || username.value == null){
		textFullName="First and Last Name is required";
		validationMessageUser(textFullName);
	}else if (fullname.length < 6 || space == -1){
		textFullName="Please enter your first and last name again";
		validationMessageUser(textFullName);
	}else{
		textFullName="First and Last Name correct";
		validMessage[0].innerHTML=textFullName;
		validMessage[0].style.display='flex';
		validUser=1;
	}
};
function checkPassword() {

	if (password.value === '' || password.value == null){
		textPassword="Password is required";
		validationMessagePassword(textPassword);
		valid = 1;
	}else if (password.value.length < 8 || password.value.length > 25){
		textPassword="Password must contain between 8-25 characters";
		validationMessagePassword(textPassword);
		valid = 1;
	}else if (password.value.search(/[0-9]/)== -1){
		textPassword="Password must contain at least 1 number";
		validationMessagePassword(textPassword);
		valid = 1;
	}else if (password.value.search(/[A-Z]/)== -1){
		textPassword="Password must have 1 UpperCase character";
		validationMessagePassword(textPassword);
		valid = 1;
	}else if (password.value.search(/[a-z]/)== -1){
		textPassword="Password must have 1 LowerCase character";
		validationMessagePassword(textPassword);
		valid = 1;
	}else{
		if (valid == 0){
			textPassword="Valid Password";
			validMessage[1].innerHTML=textPassword;
			validMessage[1].style.display='flex';
		};
	}
};
function checkPasswordValidation(){
	if (password2.value == '' || password2.value === null){
		PasswordVerification="This field cannot be empty";
		validationMessagePassword2(PasswordVerification);
	}else if (password.value !== password2.value){
		PasswordVerification="Passwords must be the same";
		validationMessagePassword2(PasswordVerification);
	}else{
		PasswordVerification="Passwords Match";
		validMessage[2].innerHTML=PasswordVerification;
		validMessage[2].style.display='flex';
	}
};
function checkEmail(){

	if(email.value == '' || email.value == null){
		textEmail="Email can't be blank";
		validationMessageEmail(textEmail);
	}else if (email.value.search(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)== -1){
		textEmail="The email is not valid";
		validationMessageEmail(textEmail);
	}else{
		if (textEmail !=="Email can't be blank" || textEmail !=="The email is not valid"){
			textEmail="Valid Email";
			validMessage[3].innerHTML=textEmail;
			validMessage[3].style.display='flex';
		}
	}
};

// Http Request, POST Method

function handleRegister() {

	let email=document.getElementById('email').value;
	let password=document.getElementById('pwd').value;
	let name=document.getElementById('user').value;

    fetch('http://localhost:4000/register',{
    	method: 'POST',
		headers:{
			'Accept': 'application/json',
			'Content-type': 'application/json'
		},
		body: JSON.stringify({email: email, pwd: password, user:name})	
    })
	.then((res)=> res.json())
	.then((data)=> console.log(data))
	.catch((error)=> console.log(error))
};