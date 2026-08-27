import './style.css'
import { createAccount, loginUser } from './users';
import { getRaces } from './races';

//Väntar tills sidan har laddats klart.
document.addEventListener("DOMContentLoaded", () => {
    const raceList = document.getElementById("race-list");
    const registerForm = document.getElementById("register-form");
    const loginForm = document.getElementById("login-form");

    if (raceList) {
        getRaces();
    }

    if (registerForm) {
        createAccount();
    }

    if (loginForm) {
        loginUser();
    }

});


