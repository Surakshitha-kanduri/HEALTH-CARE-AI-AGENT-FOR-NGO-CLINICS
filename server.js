const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ----- Temporary Storage -----
let patients = [];
let triages = [];

// ----- Register Endpoint -----
app.post("/register", (req, res) => {
  const patient = { ...req.body, date: new Date() };
  patients.push(patient);
  console.log("🧾 Registration:", patient);
  res.json({ success: true, message: "Patient registered successfully!" });
});

// ----- Triage Endpoint -----
app.post("/triage", (req, res) => {
  const triage = { ...req.body, date: new Date() };
  triages.push(triage);
  console.log("⚕️ Triage:", triage);
  res.json({ success: true, result: "Triage complete. Severity level recorded." });
});

// ----- Dashboard Data -----
app.get("/patients", (req, res) => {
  res.json(patients);
});

app.get("/triages", (req, res) => {
  res.json(triages);
});

// ----- Start Server -----
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
