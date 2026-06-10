const Registration =
require("../models/registrationModel");

const getRegistrations = (req, res) => {

    Registration.getAllRegistrations(
        (err, results) => {

            if (err)
                return res.status(500).json(err);

            res.json(results);
        }
    );
};

const getRegistrationById = (req, res) => {

    Registration.getRegistrationById(
        req.params.id,
        (err, results) => {

            if (err)
                return res.status(500).json(err);

            res.json(results);
        }
    );
};

const createRegistration = (req, res) => {

    Registration.createRegistration(
        req.body,
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.status(201).json({
                message:
                "Pendaftaran berhasil dibuat"
            });
        }
    );
};

const updateRegistration = (req, res) => {

    Registration.updateRegistration(
        req.params.id,
        req.body,
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message:
                "Status pendaftaran berhasil diubah"
            });
        }
    );
};

const deleteRegistration = (req, res) => {

    Registration.deleteRegistration(
        req.params.id,
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message:
                "Pendaftaran berhasil dihapus"
            });
        }
    );
};

module.exports = {
    getRegistrations,
    getRegistrationById,
    createRegistration,
    updateRegistration,
    deleteRegistration
};