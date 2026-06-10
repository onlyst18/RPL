const Medicine =
require("../models/medicineModel");

const getMedicines = (req, res) => {

    Medicine.getAllMedicines(
        (err, results) => {

            if (err)
                return res.status(500).json(err);

            res.json(results);
        }
    );
};

const getMedicineById = (req, res) => {

    Medicine.getMedicineById(
        req.params.id,
        (err, results) => {

            if (err)
                return res.status(500).json(err);

            res.json(results);
        }
    );
};

const createMedicine = (req, res) => {

    Medicine.createMedicine(
        req.body,
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.status(201).json({
                message:
                "Obat berhasil ditambahkan"
            });
        }
    );
};

const updateMedicine = (req, res) => {

    Medicine.updateMedicine(
        req.params.id,
        req.body,
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message:
                "Obat berhasil diupdate"
            });
        }
    );
};

const deleteMedicine = (req, res) => {

    Medicine.deleteMedicine(
        req.params.id,
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message:
                "Obat berhasil dihapus"
            });
        }
    );
};

module.exports = {
    getMedicines,
    getMedicineById,
    createMedicine,
    updateMedicine,
    deleteMedicine
};