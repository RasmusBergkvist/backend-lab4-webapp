import './style.css'

//Hämtar element från DOM
const raceList = document.getElementById("race-list");
const message = document.getElementById("message");

window.onload = init;

function init() {
    if (raceList) {
        getRaces();

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
            const formattedDate =race.date.slice(0,10);

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

