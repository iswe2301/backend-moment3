# DT207G - Backend-baserad webbutveckling, Moment 3 NoSQL-databaser

Detta repository innehåller koden för en webbtjänst byggd med Node.js och Express, designad för att hantera arbetserfarenheter. Denna webbtjänst tillhandahåller grundläggande CRUD (Create, Read, Update, Delete) funktionalitet och interagerar med en MongoDB-databas för att lagra information om tidigare anställningar, arbetsroller och tidsperioder.

## Förberedelser

För att köra detta projekt behöver du ha Node.js och npm (Node Package Manager) installerat på din dator. Node.js är miljön som kör serverkoden och npm används för att hantera projektets beroenden.

### Kloning av projekt

Klona projektet med följande kommando:

```bash
git clone https://github.com/iswe2301/backend-moment3.git
```

### Projektberoenden

Kör sedan följande kommando för att installera de beroenden som behövs i projeket:

```bash
npm install
```

## Installation & databas-setup

### Miljövariabler

Börja med att skapa en `.env`-fil (lägg i projektets rotmapp) för att ställa in dina databasanslutningsuppgifter. Exempel på innehåll/struktur för `.env`-filen finns att se i `.env.sample`-filen.

### Starta servern

För att starta servern kan du använda:

```bash
npm run server
```
eller:

```bash
nodemon server.js
```

## Schemastruktur

Schemastruktur
Webbtjänsten använder ett Mongoose-schema för att definiera strukturen på `workexperience`-dokumenten i MongoDB. Nedan är en detaljerad beskrivning av varje fält i schemat:

| Fält        | Typ    | Krav          | Beskrivning                                                                                      |
|-------------|--------|---------------|--------------------------------------------------------------------------------------------------|
| companyName | String | Obligatoriskt | Företagsnamnet där erfarenheten erhölls. Obligatoriskt; "Du måste skicka med företagsnamn".       |
| jobTitle    | String | Obligatoriskt | Titeln på jobbet eller rollen under denna erfarenhet. Obligatoriskt; "Du måste skicka med jobbtitel". |
| location    | String | Obligatoriskt | Platsen där jobbet utfördes. Obligatoriskt; "Du måste skicka med plats".                         |
| startDate   | Date   | Obligatoriskt | Startdatum för erfarenheten. Måste anges i formatet YYYY-MM-DD; "Du måste skicka med startdatum i korrekt datumformat: YYYY-MM-DD". |
| endDate     | Date   | Valfritt      | Slutdatum för erfarenheten. Detta fält är valfritt och kan lämnas tomt.                          |
| description | String | Obligatoriskt | En beskrivning av arbetet och uppgifterna som utfördes. Obligatoriskt; "Du måste skicka med en beskrivning av erfarenheten". |

## Användning

För att använda med webbtjänsten kan du använda följande endpoints:

| Metod   | Ändpunkt                   | Beskrivning                                              |
|---------|----------------------------|----------------------------------------------------------|
| GET     | `/api/workexperience`      | Hämtar alla tillgängliga arbetserfarenheter.             |
| GET     | `/api/workexperience/:id`  | Hämtar en specifik arbetserfarenhet med angivet ID.      |
| POST    | `/api/workexperience`      | Skapar en ny arbetserfarenhet.                           |
| PUT     | `/api/workexperience/:id`  | Uppdaterar en befintlig arbetserfarenhet med angivet ID. |
| DELETE  | `/api/workexperience/:id`  | Raderar en arbetserfarenhet med angivet ID.              |

**OBS!** POST och PUT kräver att du skickar med ett JSON-objekt i förfrågans body. Objektet måste följa strukturen som definieras av schemastrukturen för `workexperience`, samt att alla obligatoriska fält måste skickas med. Se nedan.

En arbetserfarenhet skickas som JSON med följande struktur:

```json
{
  "companyname": "Exempelföretaget AB",
  "jobtitle": "Webbutvecklare",
  "location": "Sundsvall",
  "startdate": "2020-01-01",
  "enddate": "2022-12-31",
  "description": "Arbetat med utveckling av webbapplikationer i JavaScript, HTML och CSS."
}
```

* **Av:** Isa Westling
* **Kurs:** Backend-baserat webbutveckling (DT207G)
* **Program:** Webbutvecklingsprogrammet
* **År:** 2024
* **Skola:** Mittuniversitetet