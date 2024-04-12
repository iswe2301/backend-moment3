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
        required: true
    },
    jobTilte: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: false
    },
    description: {
        type: String,
        required: true
    }
});

// Skapar routes

// Route för GET
app.get("/api/workexperience", (req, res) => {
    res.json({ message: "Wälkommen till mitt API!" });
});

// Startar applikationen/servern
app.listen(port, () => {
    console.log("Server startad på port: " + port);
});