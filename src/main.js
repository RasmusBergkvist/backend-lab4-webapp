import './style.css'
import { createAccount, loginUser } from './users';
import { getRaces, addRace } from './races';

//Väntar tills sidan har laddats klart.
document.addEventListener("DOMContentLoaded", () => {
    const raceList = document.getElementById("race-list");
     const raceForm = document.getElementById("race-form");
    const registerForm = document.getElementById("register-form");
    const loginForm = document.getElementById("login-form");

    //Hämtar lopp
    if (raceList) {
        getRaces();
    }
    //Lägger till lopp
    if(raceForm){
        addRace();
    }

    //Skapar konto
    if (registerForm) {
        createAccount();
    }

    //Inloggning
    if (loginForm) {
        loginUser();
    }


});


