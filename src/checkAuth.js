"use strict";

//Kontroll om token finns
if (!localStorage.getItem("raceToken")) {
    window.location.href = "/login";
}

