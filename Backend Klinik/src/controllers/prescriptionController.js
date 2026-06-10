const Prescription =
require("../models/prescriptionModel");

const getPrescriptions =
(req, res) => {

    Prescription.getAllPrescriptions(
        (err, results) => {

            if (err)
                return res.status(500).json(err);

            res.json(results);
        }
    );
};

const getPrescriptionById =
(req, res) => {

    Prescription.getPrescriptionById(
        req.params.id,
        (err, results) => {

            if (err)
                return res.status(500).json(err);

            res.json(results);
        }
    );
};

const createPrescription =
(req, res) => {

    Prescription.createPrescription(
        req.body,
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.status(201).json({
                message:
                "Resep berhasil ditambahkan"
            });
        }
    );
};

const updatePrescription =
(req, res) => {

    Prescription.updatePrescription(
        req.params.id,
        req.body,
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message:
                "Resep berhasil diupdate"
            });
        }
    );
};

const deletePrescription =
(req, res) => {

    Prescription.deletePrescription(
        req.params.id,
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message:
                "Resep berhasil dihapus"
            });
        }
    );
};

module.exports = {
    getPrescriptions,
    getPrescriptionById,
    createPrescription,
    updatePrescription,
    deletePrescription
};