const db = require("../config/database");

// Semua resep
const getAllPrescriptions = (callback) => {

    const query = `
        SELECT
            resep.*,
            obat.nama_obat
        FROM resep
        JOIN obat
            ON resep.id_obat = obat.id_obat
    `;

    db.query(query, callback);
};

// Detail resep
const getPrescriptionById = (id, callback) => {

    const query = `
        SELECT *
        FROM resep
        WHERE id_resep = ?
    `;

    db.query(query, [id], callback);
};

// Tambah resep
const createPrescription = (data, callback) => {

    const query = `
        INSERT INTO resep
        (
            id_pemeriksaan,
            id_obat,
            jumlah,
            keterangan
        )
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        query,
        [
            data.id_pemeriksaan,
            data.id_obat,
            data.jumlah,
            data.keterangan
        ],
        callback
    );
};

// Update resep
const updatePrescription =
(id, data, callback) => {

    const query = `
        UPDATE resep
        SET
            jumlah = ?,
            keterangan = ?
        WHERE id_resep = ?
    `;

    db.query(
        query,
        [
            data.jumlah,
            data.keterangan,
            id
        ],
        callback
    );
};

// Hapus resep
const deletePrescription =
(id, callback) => {

    const query =
        "DELETE FROM resep WHERE id_resep = ?";

    db.query(query, [id], callback);
};

module.exports = {
    getAllPrescriptions,
    getPrescriptionById,
    createPrescription,
    updatePrescription,
    deletePrescription
};