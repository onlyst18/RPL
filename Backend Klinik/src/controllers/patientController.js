const Patient = require("../models/patientModel");

// GET ALL
const getPatients = (req, res) => {
    Patient.getAllPatients((err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(results);
    });
};

// GET BY ID
const getPatientById = (req, res) => {
    const id = req.params.id;

    Patient.getPatientById(id, (err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(results);
    });
};

// CREATE
const createPatient = (req, res) => {

    Patient.createPatient(req.body, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(201).json({
            message: "Pasien berhasil ditambahkan"
        });
    });
};

// UPDATE
const updatePatient = (req, res) => {

    const id = req.params.id;

    Patient.updatePatient(id, req.body, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Pasien berhasil diupdate"
        });
    });
};

// DELETE
const deletePatient = (req, res) => {

    const id = req.params.id;

    Patient.deletePatient(id, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Pasien berhasil dihapus"
        });
    });
};

module.exports = {
    getPatients,
    getPatientById,
    createPatient,
    updatePatient,
    deletePatient
};