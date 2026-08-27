const raceList = document.getElementById("race-list");
const raceForm = document.getElementById("race-form");
const message = document.getElementById("message");

//Skapa lopp
export function addRace() {
    if (!raceForm) return;

    raceForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        //Hämtar värden från input-fält
        const name = document.getElementById("name").value;
        const date = document.getElementById("date").value;
        const distance = document.getElementById("distance").value;
        const location = document.getElementById("location").value;
        const description = document.getElementById("description").value;

        //Felmeddelande
        const raceNameError = document.getElementById("racename-error");
        const dateError = document.getElementById("date-error");
        const distanceError = document.getElementById("distance-error");
        const locationError = document.getElementById("location-error");

        //Rensar från tidigare meddelanden
        raceNameError.innerHTML = "";
        dateError.innerHTML = "";
        distanceError.innerHTML = "";
        locationError.innerHTML = "";
        message.innerHTML = "";
        message.style.color = "";


        //Valideing
        let error = false;

        if (!name) {
            raceNameError.innerHTML = "Fyll i namn på loppet."
            error = true;
        }

        if (!date) {
            dateError.innerHTML = "Välj ett datum.";
            error = true;
        }

        if (!distance) {
            distanceError.innerHTML = "Ange distans i km.";
            error = true;
        }

        if (!location) {
            locationError.innerHTML = "Fyll i en plats.";
            error = true;
        }

        if (error) return;

        let newRace = {
            name,
            date,
            distance,
            location,
            description
        }

        //Hämtar token
        const token = localStorage.getItem("raceToken");

        //POST-anrop
        try {
            const response = await fetch("http://localhost:3000/races", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": "Bearer " + token
                },
                //Omvandlar till JSON-data
                body: JSON.stringify(newRace)

            });
            //Om anoropet misslyckades
            if (!response.ok) {
                throw new Error(response.status);
            }
            //Omvandlar resultatet till JS-objekt
            const result = await response.json();

            message.style.color = "green";
            message.innerHTML = "Ditt lopp är nu tillagt på sidan!"

            setTimeout(() => {
                window.location.href = "/"
            }, 3000);

            return result;

        } catch (error) {
            message.style.color = "red";
            if (error.message === "403") {
                message.innerHTML = "Du måste vara inloggad för att lägga till ett lopp!";
            } else if (error.message === "409") {
                message.innerHTML = "Loppet finns redan registrerat!";
            } else {
                message.innerHTML = "Det gick inte att lägga till lopp. Försök igen senare!"
            }
        }

    });
}




//Hämtar lopp
export async function getRaces() {
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
