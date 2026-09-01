"use strict";

import './style.css'
import { createAccount, loginUser } from './users';
import { submitRace, renderRaces, renderMyPage, cardButtons, getEditData } from './races';

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
    //Lägger till nya lopp eller uppdaterar befintliga.
    if (raceForm) {

        //Hämtar data som ska uppdateras.
        if (window.name) {
            getEditData();
        }

        submitRace();
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
    if (myRaceList) {
        renderMyPage();
        cardButtons();
    }


});

//Ändra huvudmenyn dymnaiskt
function changeMenu() {
    //Kontroll av token styr hur menyn ser ut
    if (!localStorage.getItem("raceToken")) {
        menu.innerHTML = `
        <li><a href="/" class="nav-link">Alla lopp</a></li>
        <li><a href="/login" class="nav-link">Logga in</a></li>
        `
    } else {
        menu.innerHTML =
            `
                <li><a href="/" class="nav-link">Alla lopp</a></li>
                <li><a href="/my-page" class="nav-link">Min sida</a></li>
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