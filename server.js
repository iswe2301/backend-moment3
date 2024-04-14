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
const port = process.env.PORT || 3000;

// Ansluter till MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Ansluten till MongoDB!");
}).catch((error) => {
    console.log("Fel vid anslutning till MongoDB: " + error);
});

// Skapar schema för erfarenheter i DB
const experienceScheme = new mongoose.Schema({
    companyName: {
        type: String,
        required: [true, "Du måste skicka med företagsnamn"] // Skickar med anpassat felmeddelande vid false
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
            // Returnerar felmeddelande med felkod om inga resultat finns
            return res.status(404).json({ message: "Inga jobberfarenheter funna" });
        } else {
            // Returnerar resultatet om erfarenheter finns
            return res.json(result);
        }
        // Fångar upp ev. felmeddelanden
    } catch (error) {
        console.error("Fel vid hämtning av erfarenheter: ", error);
        // Returnerar statuskod tillsammans med felet
        return res.status(500).json(error);
    }
});

// Route för att hämta en specifik jobberfarenhet baserat på ID
app.get("/api/workexperience/:id", async (req, res) => {
    try {
        const id = req.params.id;  // Hämtar ID från URL-parametern
        let result = await experience.findById(id);  // Använder Mongoose-metoden findById för att söka i databasen

        // Kontrollerar om inget resultat kunde hittas
        if (!result) {
            // Returnerar felmeddelande med felkod om inget resultat finns
            return res.status(404).json({ message: "Ingen erfarenhet hittad med det angivna ID:t" });
        }
        // Returnerar resultatet resultatet om erfarenheten finns
        return res.json(result);
        //  Fångar upp ev. fel
    } catch (error) {
        console.error("Fel vid hämtning av erfarenhet: ", error);
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
        // Returnerar resultatet
        return res.json(result);
        // Fångar upp ev. felmeddelanden
    } catch (error) {
        console.error("Fel vid skapande av erfarenhet: ", error);
        // Returnerar statuskod tillsammans med felet
        return res.status(500).json(error);
    }
});

// Route för PUT (update)
app.put("/api/workexperience/:id", async (req, res) => {
    try {
        // Hämtar ID från url:en
        const id = req.params.id;
        // Hämtar erfarenheten från datan i bodyn
        const data = req.body;
        // Skapar en uppdatering av specifik erfarenhet baserat på id, med datan som hämtats från bodyn
        let result = await experience.updateOne({ _id: id }, { $set: data }, { runValidators: true }); // Sätter runValidators till true för att aktivera schemavalidering vid uppdateringen
        // Kontrollerar om det inte finns en matchande post i DB
        if (result.matchedCount === 0) {
            // Returnerar felmeddelande med felkod om ingen matchande post kunde hittas
            return res.status(404).json({ message: `Ingen erfarenhet hittades med ID ${id}.` });
        } else {
            // Loggar lyckad uppdatering
            console.log(`Erfarenhet med ID ${id} uppdaterad!`);
            // Returnerar resultatet
            return res.json(result);
        }
        // Fångar upp ev. fel
    } catch (error) {
        console.error("Fel vid uppdatering av erfarenhet: ", error);
        // Returnerar statuskod tillsammans med felet
        return res.status(500).json(error);
    }
});

// Route för DELETE
app.delete("/api/workexperience/:id", async (req, res) => {
    try {
        // Hämtar ID från url:en
        const id = req.params.id;

        // Försöker radera den specifika erfarenheten baserat på id
        let result = await experience.deleteOne({ _id: id });

        // Kontrollerar om erfarenheten raderades
        if (result.deletedCount === 0) {
            // Returnerar felmeddelande med felkod om radering misslyckades
            return res.status(404).json({ message: `Radering misslyckades, ingen erfarenhet hittades med ID ${id}.` });
        } else {
            // Loggar lyckad radering
            console.log(`Erfarenhet med ID ${id} raderad!`);
            // Returnerar ett meddelande om lyckad radering
            return res.json({ message: "Erfarenhet raderad" });
        }
        // Fångar upp ev. fel
    } catch (error) {
        console.error("Fel vid radering av erfarenhet: ", error);
        // Returnerar statuskod tillsammans med felet
        return res.status(500).json(error);
    }
});

// Startar applikationen/servern
app.listen(port, () => {
    console.log("Server startad på port: " + port);
});