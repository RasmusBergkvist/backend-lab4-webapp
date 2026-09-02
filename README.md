# Laboration 4.2 – Webbapplikation
Detta är en webbapplikation för publicering av löparlopp. Det går att skapa användare, logga in, samt skapa och hantera sina publicerade lopp. Applikationens innehåll och åtkomst authentiseras med hjälp av tokens, samt är kopplad till ett REST API som lagrar och hämtar data från en NoSQL-databas.

## Url till appplikation


## Funktioner
* Skapa användare 
* Inloggning
* Autentisering med token till skyddat innehåll och funktionalitet på sidorna my-page, add och edit.
* My-page (Min sida) visar endast användarens publicerad lopp.


## Tekniker
* HTML, CSS, JavaScript
* REST API
* CORS
* Fetch API med Async/Await
* Local Storage


## Så fungerar applikationen
* Alla publicerade lopp visas på startsidan.
* Användaren skapar ett konto på registreringssidan. Användaruppgifterna skickas till backend för hantering och lagring.
* Vid lyckad inloggning får användaren en token och kommer till Min Sida (my-page) där användarens kan se sina publicerade lopp, skapa nya, radera och ändra i befintliga lopp. Token sparas i Local Storage.
* Huvudmenyn ändras dynamiskt vid inloggning där Min sida och Logga ut blir synliga, medans Logga in döljs.
* När användaren loggar ut rensas Local Storage.
* Token är giltig i 1 timme, därefter behöver användaren logga in på nytt.
* Kontroll görs om användaren har en token på sidorna my-page, add och edit. Saknas token omdirigeras användare till inloggningssidan.
* Fetch-anrop användas för att skicka till eller hämtar data från REST API med GET, POST, PUT, DELETE. 
* Datan skickas i JSON-format med i headern Content-Type: application/json och omvandlas med JSON.stringify(data) i body. 
* Vid skapande (POST), redigering (PUT) och radering av lopp (DELETE) krävs att token skickas med i headern "authorization": "Bearer " + token.
* Backend hanterar och lagrar datan i en NoSQL-databas.
* CORS används för att tillåta kommunikation mellan domäner.
* Frontend hämtar datan, omvandlar den till JavaScript-objekt och visar den i webbapplikationen.


## Felhantering
Fel fångas med try/catch-block och visar felmeddelanden för användaren beroende på HTTP-statuskoder som 401, 403, 409 och 500.