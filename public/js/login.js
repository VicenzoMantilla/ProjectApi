// Log In validations Variables

const form = document.getElementById('form');
const passwordLogin = document.getElementById('password');
const errorDisplay = document.getElementsByClassName('errorMessage');
const validMessage = document.getElementsByClassName('validMessage');
const logIn = document.getElementById('logIn');
const emailLogin = document.getElementById('email');

// Form Validations Variables

var formExist = document.getElementsByTagName('form');
var LabelQuantity = document.getElementsByTagName('label');
var InputsQuantity= document.getElementsByTagName('input');
var ButtonsQuantity= document.getElementsByTagName('button');
var divVisibility=document.getElementById('containerValid');
var AnchorValidation=document.getElementById('anchorForm');
var listErrors=document.getElementById('listErrors');
var accountInformation= document.getElementById('accountInformation');
var userInformation = document.getElementById('userInformation');

// Extra Variables

var textEmail="";
var textPassword="";
var textForm="";
var textConfirm="";
var valid = 0;

// Clean Functions

function CleanEmail(){
	if (textEmail !=="Valid Email"){
	errorDisplay[0].style.display='none';
	}
};
function CleanPassword(){
	if (textPassword !== "Valid Password"){
		valid= 0;
		errorDisplay[1].style.display='none';
	};
};

// Events

window.addEventListener("load", ()=>{
	setTimeout(formValidations,1000);
});
emailLogin.addEventListener("focus", function(e){
	CleanEmail(textEmail);
});
emailLogin.addEventListener("blur", function(e){
	checkEmail(textEmail);
});
passwordLogin.addEventListener("focus", function(e){
	CleanPassword(textPassword);
});
passwordLogin.addEventListener("blur", function(e){
	checkPassword(valid);
});
logIn.addEventListener("click", function(e){
	handleLogin();
});

// Function for styles

function emailStylesMessage(){
	errorDisplay[0].style.display='flex';
	validMessage[0].style.display='none';
};
function passwordStylesMessage(){
	errorDisplay[1].style.display='flex';
	validMessage[1].style.display='none';
};
function validationMessagePassword(){
	errorDisplay[1].innerHTML=textPassword;
	passwordStylesMessage();
};
function validationMessageEmail(){
	errorDisplay[0].innerHTML=textEmail;
	emailStylesMessage();
}

// Validation Functions

function showErrors(){
	var li = document.createElement('li');
	li.appendChild(document.createTextNode(textForm));
	listErrors.appendChild(li);
	divVisibility.style.visibility= 'visible';
};
function formValidations(){

	if (document.getElementById('form') === null) {
		document.getElementById('validationDetail').innerHTML="Form is not found";
		divVisibility.style.visibility= 'visible';
	}

	control="pass";

	if (AnchorValidation == 'undefined' || AnchorValidation == null){
		textForm="The Anchor is Missing";
		showErrors(textForm);
		control="error";
		
	}else if (LabelQuantity.length !== 5) {
        textForm="There are missing labels for inputs";
		showErrors(textForm);
		control="error";
		
    }else if (InputsQuantity.length !== 4) {
        textForm="There are missing inputs";
		showErrors(textForm);
		control="error";
        
    }else if (ButtonsQuantity.length !== 1) {
        textForm="Missing submit button";
		showErrors(textForm);
		control="error";
        
    }else{
		if (control == "pass"){
		document.getElementById('validationDetail').innerHTML="Every validation has passed.";
        divVisibility.style.visibility= 'visible';
		return;
		}
	}
};
function checkEmail(){

	if(emailLogin.value == '' || emailLogin.value == null){
		textEmail="Email can't be blank";
		validationMessageEmail(textEmail);
	}else if (emailLogin.value.search(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)== -1){
		textEmail="The email is not valid";
		validationMessageEmail(textEmail);
	}else{
		if (textEmail !=="Email can't be blank" || textEmail !=="The email is not valid"){
			textEmail="Valid Email";
			validMessage[0].innerHTML=textEmail;
			validMessage[0].style.display='flex';
		}
	}
};
function checkPassword() {
	
	if (passwordLogin.value === '' || passwordLogin.value == null){
		textPassword="Password can't be blank";
		validationMessagePassword(textPassword);
		valid= 1;
	}else if (passwordLogin.value.length<8 || passwordLogin.value.length>25){
		textPassword="Password must contain between 8-25 characters";
		validationMessagePassword(textPassword);
		valid= 1;
	}else if (passwordLogin.value.search(/[0-9]/)== -1){
		textPassword="Password must have 1 numeric character";
		validationMessagePassword(textPassword);
		valid= 1;
	}else if (passwordLogin.value.search(/[A-Z]/)== -1){
		textPassword="Password must have 1 UpperCase character";
		validationMessagePassword(textPassword);
		valid= 1;
	}else if (passwordLogin.value.search(/[a-z]/)== -1){
		textPassword="Password must have 1 LowerCase character";
		validationMessagePassword(textPassword);
		valid= 1;
	}else{
		if (valid == 0){
			textPassword="Valid Password";
			validMessage[1].innerHTML=textPassword;
			validMessage[1].style.display='flex';
		};
	}
};

// Http Request, PUT method

function handleLogin() {
    let email=document.getElementById('email').value;
	let password=document.getElementById('password').value;

    fetch('http://localhost:4000/login',{
    	method: 'PUT',
		headers:{
			'Accept': 'application/json',
			'Content-type': 'application/json'
		},
		body: JSON.stringify({email: email, password: password})	
    })
	.then((res)=> {
		res.json().then((data)=>{
			checkResponse(res,data)
		})
	})
	.then((data)=> console.log(data))
	.catch((error) =>console.log(error))
};

function checkResponse(res,data){
	if (!res.ok){
		alert("Incorrect Email or Password, Please try again.");
		emailLogin.value="";
		passwordLogin.value="";
		var cleanAll = document.querySelectorAll('div.validMessage');
		Array.prototype.forEach.call(cleanAll, function(e){
		e.setAttribute('style', 'display: none;')
		});
	}
	else{
		accountInformation.style.visibility='visible';	
		var confirmEmail=`Your email is: ${data.logged.email}`;
		var confirmPassword=`Your Password is: ${data.logged.password}`;
		var showEmail = document.createElement('li');
		showEmail.appendChild(document.createTextNode(confirmEmail));
		userInformation.appendChild(showEmail);
		var showPassword = document.createElement('li');
		showPassword.appendChild(document.createTextNode(confirmPassword));
		userInformation.appendChild(showPassword);

		emailLogin.value="";
		passwordLogin.value="";
		var cleanAll = document.querySelectorAll('div.validMessage');
		Array.prototype.forEach.call(cleanAll, function(e){
		e.setAttribute('style', 'display: none;')
		});
	}
};