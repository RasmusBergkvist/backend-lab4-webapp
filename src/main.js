import './style.css'

//Hämtar element från DOM
const raceList = document.getElementById("race-list");
const message = document.getElementById("message");

const registerForm = document.getElementById("register-form");

window.onload = init;

function init() {
    if (raceList) {
        getRaces();
    }

    if (registerForm) {
        createAccount();
    }
}

//Hämtar lopp
async function getRaces() {
    try {
        const response = await fetch("http://localhost:3000/races");

        if (!response.ok) {
            throw new Error;
        }

        const data = await response.json();
        console.log(data);

        //Anropar funktionen och skickar med svart
        renderRaces(data)

    } catch (error) {
        if (message) {
            message.innerHTML = "Det gick inte att hämta datan från servern.";
        }

        throw error;

    }
}

//Skriver ut lopp till DOM
async function renderRaces(data) {

    if (!raceList) return;

    //Rensar tidigare innehåll.
    raceList.innerHTML = "";
    try {
        data.forEach(race => {
            //Formatera datum
            const formattedDate = race.date.slice(0, 10);

            //Skapar artikel-element till loppen.
            const articleEl = document.createElement("article");
            articleEl.classList.add("race-card");

            articleEl.innerHTML = `
      <h3>${race.name} ${race.distance} km</h3>
      <p><strong>Datum:</strong> ${formattedDate}</p>
      <p><strong>Plats:</strong> ${race.location}</p>  
      <p><strong>Om loppet:</strong> ${race.description}</p>
      <p><strong>Publicerat av:</strong>  ${race.createdBy} </p>
      `
            //Lägger artikel i raceList.
            raceList.appendChild(articleEl);

        });
    } catch (error) {
        console.error("Fel vid rendering av kurser", error)
        return;
    }
}


//Skapa konto
function createAccount() {
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
async function addMember(data) {
    try {
        const response = await fetch("http://localhost:3000/users/register", {
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


