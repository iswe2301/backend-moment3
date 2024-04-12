// Inkluderar .env-filen med anslutningsinställningar
require("dotenv").config();

// Inkluderar express
const express = require("express");
const app = express(); // Startar applikationen med express

// Inkluderar mongoose
const mongoose = require("mongoose");

// Inkluderar och använder cors
const cors = require("cors");
app.use(cors());

app.use(express.json()); // Inkluderar middleware till express för att konvertera data till json automatiskt

// Lagrar variabel för port, startar antingen enligt inställningar i env-filen eller på port 3000
const port = process.env.DB_PORT || 3000;

// Ansluter till MongoDB
mongoose.connect("mongodb://localhost:27017/workexperience").then(() => {
    console.log("Ansluten till MongoDB!");
}).catch((error) => {
    console.log("Fel vid anslutning till MongoDB: " + error);
});

// Skapar schema för erfarenheter i DB
const experienceScheme = new mongoose.Schema({
    companyName: {
        type: String,
        required: [true, "Du måste skicka med företagsnamn"] // Sickar med anpassat felmeddelande vid false
    },
    jobTitle: {
        type: String,
        required: [true, "Du måste skicka med jobbtitel"]
    },
    location: {
        type: String,
        required: [true, "Du måste skicka med plats"]
    },
    startDate: {
        type: Date,
        required: [true, "Du måste skicka med startdatum i korrekt datumformat: YYYY-MM-DD"]
    },
    endDate: {
        type: Date,
        required: false
    },
    description: {
        type: String,
        required: [true, "Du måste skicka med en beskrivning av erfarenheten"]
    }
});

// Inkluderar schemat till databasen, skapar tabell med model
const experience = mongoose.model("Experience", experienceScheme);

// Skapar routes

// Route för GET
app.get("/api/workexperience", async (req, res) => {
    try {
        // Hämtar alla alla jobberfarenheter från DB
        let result = await experience.find({});
        // Kontrollerar om det inte finns några erfarenheter (tom)
        if (result.length === 0) {
            // Skriver ut felmeddelande med felkod om inga resultat finns
            res.status(404).json({ message: "Inga jobberfarenheter funna" });
        } else {
            // Returnerar resultatet om erfarenheter finns
            return res.json(result);
        }
        // Fångar upp ev. felmeddelanden
    } catch (error) {
        // Returnerar statuskod tillsammans med felet
        return res.status(500).json(error);
    }
});

// Route för POST
app.post("/api/workexperience", async (req, res) => {
    try {
        // Skapar ny erfarenhet genom att läsa in datan från body
        let result = await experience.create(req.body);
        // Loggar lyckad tilläggning
        console.log("Ny erfarenhet skapad!");
        return res.json(result);
        // Fångar upp ev. felmeddelanden
    } catch (error) {
        // Returnerar statuskod tillsammans med felet
        return res.status(400).json(error);
    }
});

// Startar applikationen/servern
app.listen(port, () => {
    console.log("Server startad på port: " + port);
});