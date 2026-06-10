const Doctor = require("../models/doctorModel");

// GET ALL
const getDoctors = (req, res) => {
    Doctor.getAllDoctors((err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(results);
    });
};

// GET BY ID
const getDoctorById = (req, res) => {
    const id = req.params.id;

    Doctor.getDoctorById(id, (err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(results);
    });
};

// CREATE
const createDoctor = (req, res) => {

    Doctor.createDoctor(req.body, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(201).json({
            message: "Dokter berhasil ditambahkan"
        });
    });
};

// UPDATE
const updateDoctor = (req, res) => {

    const id = req.params.id;

    Doctor.updateDoctor(id, req.body, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Dokter berhasil diupdate"
        });
    });
};

// DELETE
const deleteDoctor = (req, res) => {

    const id = req.params.id;

    Doctor.deleteDoctor(id, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Dokter berhasil dihapus"
        });
    });
};

module.exports = {
    getDoctors,
    getDoctorById,
    createDoctor,
    updateDoctor,
    deleteDoctor
};