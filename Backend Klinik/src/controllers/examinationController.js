const Examination =
require("../models/examinationModel");

const getExaminations =
(req, res) => {

    Examination.getAllExaminations(
        (err, results) => {

            if (err)
                return res.status(500).json(err);

            res.json(results);
        }
    );
};

const getExaminationById =
(req, res) => {

    Examination.getExaminationById(
        req.params.id,
        (err, results) => {

            if (err)
                return res.status(500).json(err);

            res.json(results);
        }
    );
};

const createExamination =
(req, res) => {

    Examination.createExamination(
        req.body,
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.status(201).json({
                message:
                "Pemeriksaan berhasil ditambahkan"
            });
        }
    );
};

const updateExamination =
(req, res) => {

    Examination.updateExamination(
        req.params.id,
        req.body,
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message:
                "Pemeriksaan berhasil diupdate"
            });
        }
    );
};

const deleteExamination =
(req, res) => {

    Examination.deleteExamination(
        req.params.id,
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message:
                "Pemeriksaan berhasil dihapus"
            });
        }
    );
};

module.exports = {
    getExaminations,
    getExaminationById,
    createExamination,
    updateExamination,
    deleteExamination
};