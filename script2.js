//const fetch = require("node-fetch");


const InitialScreen = document.getElementById( 'initialScreen');
const IdScreen = document.getElementById( 'idScreen');
const sendForm = document.getElementById( 'SendForm');
const signUpBtn = document.getElementById( 'SignUp');
const login = document.getElementById("login");
login.addEventListener('click', on);
sendForm.addEventListener('click', sendFormValidation);
signUpBtn.addEventListener('click', registerForm);


// Ejemplo implementando el metodo POST:
async function postData(url = '', data = {}) {
    // Opciones por defecto estan marcadas con un *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        //'Content-Type': 'application/x-www-form-urlencoded',
    },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

function on () {
    const url = 'http://localhost:8000/login';
    const usern = document.getElementById("user").value;
    const passn = document.getElementById("pass").value;    
    let data = {
        "username": usern,
        "password": passn
    }
    postData(url, data)
    .then(data => {
        if(data.data){
            InitialScreen.style.display = 'none';
            IdScreen.style.display = 'block';
        } else {
            alert("Not valid user")
        }
    });
 }

function sendFormValidation () {
    const url = 'http://localhost:8000/sign-up';
    const uname = document.getElementById("sgname").value;
    const usern= document.getElementById("sgusername").value;
    const uemail = document.getElementById("sgemail").value;
    const passn = document.getElementById("sgpassword").value;
    let data = {
        "name": uname,
        "username": usern,
        "email": uemail,
        "password": passn
    }
    postData(url, data)
    .then(data => {
        if(data.message){
            signUpScreen.style.display = 'none';
            InitialScreen.style.display = 'block';
        } else {
            alert("Not valid user")
        }
    });
}

function registerForm (){
    InitialScreen.style.display = 'none';
    signUpScreen.style.display = 'block';
}