const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const registrationRoutes = require("./routes/registrationRoutes");
const queueRoutes = require("./routes/queueRoutes");
const examinationRoutes = require("./routes/examinationRoutes");
const prescriptionRoutes = require("./routes/prescriptionRoutes");
const medicineRoutes = require("./routes/medicineRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Backend Klinik Berjalan"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/pasien", patientRoutes);
app.use("/api/dokter", doctorRoutes);
app.use("/api/pendaftaran", registrationRoutes);
app.use("/api/antrian", queueRoutes);
app.use("/api/pemeriksaan", examinationRoutes);
app.use("/api/resep", prescriptionRoutes);
app.use("/api/obat", medicineRoutes);
app.use("/api/pembayaran", paymentRoutes);
app.use("/api/dashboard", dashboardRoutes);
module.exports = app;