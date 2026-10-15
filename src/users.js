"use strict";

//Hämtar element från DOM
const message = document.getElementById("message");
const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");


//Skapa konto
export function createAccount() {
    if (!registerForm) return;

    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();


        ///Hämtar värde från formuläret.
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        //Hämtar felmeddelanden
        const usernameError = document.getElementById("username-error");
        const emailError = document.getElementById("email-error");
        const passwordError = document.getElementById("password-error");

        //Rensar från tidigare meddelande
        usernameError.innerHTML = "";
        emailError.innerHTML = "";
        passwordError.innerHTML = "";
        message.innerHTML = "";

        let error = false;

        //Validera input 
        if (username.trim().length < 5) {
            usernameError.innerHTML = "Fyll i användernamn. Minst 5 tecken.";
            error = true;
        }

        if (!email) {
            emailError.innerHTML = "Fyll i e-postadress.";
            error = true;
        }

        if (!password) {
            passwordError.innerHTML = "Fyll i lösenord.";
            error = true;
        }

        //Vid fel arbryt sumbit.
        if (error) return;



        //Skapar nytt objekt
        const newAccount = {
            username,
            email,
            password,
        }

        try {
            await addMember(newAccount);
            //Vid lyckat registering
            message.style.color = "green";
            message.innerHTML = "Ditt konto är nu skapat. Du skickas vidare till login-sidan."

            setTimeout(() => {
                window.location.href = "/login"
            }, 3000);

        } catch (error) {
            message.style.color = "red";

            if (error.message === "409") {
                message.innerHTML = "Användarnamnet eller e-postadressen finns redan registrerad."

            } else {
                message.innerHTML = "Det gick inte att lägga till användare. Försök igen senare."
            }

        }

    });
}

//Spara användare
export async function addMember(data) {
    try {
        const response = await fetch("https://backend-lab4-api.onrender.com/users/register", {
            method: "POST",
            headers: {
                //Anger vilket format som skickas
                "Content-Type": "application/json"
            },
            //Omvandlar värden till JSON-data.
            body: JSON.stringify(data)
        });

        //Om anoropet misslyckades
        if (!response.ok) {

            throw new Error(response.status);
        }

        //Omvandlar resultatet till JS-objekt
        const result = await response.json()


    } catch (error) {
        throw error;
    }

}

//Inloggning
export function loginUser() {
    if (!loginForm) return;

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        //Hämtar värden från formuläret
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        //Rensar från tidigare meddelanden
        message.style.color = "";
        message.innerHTML = "";


        //Validerar input
        if (!username || !password) {
            message.style.color = "red"
            message.innerHTML = "Fyll i användarnamn och lösenord."
            return;
        }

        //Nytt objekt
        let user = {
            username: username,
            password: password,
        }

        try {
            const response = await fetch("https://backend-lab4-api.onrender.com/users/login", {
                method: "POST",
                headers: {
                    //Anger vilket format som skickas
                    "Content-Type": "application/json"
                },
                //Omvandlar till JSON-data
                body: JSON.stringify(user)
            });

            //Om anropet misslyckas
            if (!response.ok) {
                throw new Error(response.status);
            }

            const data = await response.json();
            localStorage.setItem("raceToken", data.token);
            localStorage.setItem("username", data.username);
            window.location.href = "/my-page";

        } catch (error) {
            message.style.color = "red";
            if (error.message === "401") {
                message.innerHTML = "Ogiltigt användarnamn eller lösenord!"
            } else {
                message.innerHTML = "Det gick inte att logga in. Försök igen senare."
            }

        }


    });
}
