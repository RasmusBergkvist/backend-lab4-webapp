"use strict";

import './style.css'
import { createAccount, loginUser } from './users';
import { addRace, renderRaces, renderMyPage, cardButtons } from './races';

//Väntar tills sidan har laddats klart.
document.addEventListener("DOMContentLoaded", () => {
    const raceList = document.getElementById("race-list");
    const raceForm = document.getElementById("race-form");
    const registerForm = document.getElementById("register-form");
    const loginForm = document.getElementById("login-form");
    const menu = document.getElementById("menu");
    const myRaceList = document.getElementById("my-race-list");

    //Hämtar lopp
    if (raceList) {
        renderRaces();
        
    }
    //Lägger till lopp
    if (raceForm) {
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

    if (menu) {
        changeMenu();
    }

    //Hämtar lopp till min sida
    if(myRaceList) {
        renderMyPage();
        cardButtons();
    }


});

//Ändra huvudmenyn dymnaiskt
function changeMenu() {
    //Kontroll av token styr hur menyn ser ut
    if (!localStorage.getItem("raceToken")) {
        menu.innerHTML = `
        <li><a href="/" class="nav-link current">Startsida</a></li>
        <li><a href="/login" class="nav-link">Logga in</a></li>
        `
    } else {
        menu.innerHTML =
            `
                <li><a href="/" class="nav-link current">Startsida</a></li>
                <li><a href="/add" class="nav-link">Lägg till lopp</a></li>
                <li><a href="/" id="logout-link" class="nav-link">Logga ut</a></li>
                `
    }

    //Raderar token och användarnamn vid utloggning.
    const logout = document.getElementById("logout-link");
    if (logout) {
        logout.addEventListener("click", () => {
            localStorage.removeItem("raceToken");
            localStorage.removeItem("username");
        });

    }

}