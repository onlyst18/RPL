const db = require("../config/database");

// Semua pendaftaran
const getAllRegistrations = (callback) => {
    const query = `
        SELECT
            pendaftaran.*,
            pasien.nama_pasien
        FROM pendaftaran
        JOIN pasien
        ON pendaftaran.id_pasien = pasien.id_pasien
    `;

    db.query(query, callback);
};

// Detail pendaftaran
const getRegistrationById = (id, callback) => {
    const query = `
        SELECT
            pendaftaran.*,
            pasien.nama_pasien
        FROM pendaftaran
        JOIN pasien
        ON pendaftaran.id_pasien = pasien.id_pasien
        WHERE id_pendaftaran = ?
    `;

    db.query(query, [id], callback);
};

// Tambah pendaftaran
const createRegistration = (data, callback) => {
    const query = `
        INSERT INTO pendaftaran
        (id_pasien, tanggal_daftar, keluhan, status)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        query,
        [
            data.id_pasien,
            data.tanggal_daftar,
            data.keluhan,
            data.status || "Menunggu"
        ],
        callback
    );
};

// Update status
const updateRegistration = (id, data, callback) => {
    const query = `
        UPDATE pendaftaran
        SET status = ?
        WHERE id_pendaftaran = ?
    `;

    db.query(
        query,
        [
            data.status,
            id
        ],
        callback
    );
};

// Hapus
const deleteRegistration = (id, callback) => {
    const query =
        "DELETE FROM pendaftaran WHERE id_pendaftaran = ?";

    db.query(query, [id], callback);
};

module.exports = {
    getAllRegistrations,
    getRegistrationById,
    createRegistration,
    updateRegistration,
    deleteRegistration
};