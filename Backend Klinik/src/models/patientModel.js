const db = require("../config/database");

// Ambil semua pasien
const getAllPatients = (callback) => {
    const query = "SELECT * FROM pasien";

    db.query(query, callback);
};

// Ambil pasien berdasarkan ID
const getPatientById = (id, callback) => {
    const query = "SELECT * FROM pasien WHERE id_pasien = ?";

    db.query(query, [id], callback);
};

// Tambah pasien
const createPatient = (data, callback) => {
    const query = `
        INSERT INTO pasien
        (nama_pasien, jenis_kelamin, tanggal_lahir, alamat, no_telp)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        query,
        [
            data.nama_pasien,
            data.jenis_kelamin,
            data.tanggal_lahir,
            data.alamat,
            data.no_telp
        ],
        callback
    );
};

// Update pasien
const updatePatient = (id, data, callback) => {
    const query = `
        UPDATE pasien
        SET
            nama_pasien=?,
            jenis_kelamin=?,
            tanggal_lahir=?,
            alamat=?,
            no_telp=?
        WHERE id_pasien=?
    `;

    db.query(
        query,
        [
            data.nama_pasien,
            data.jenis_kelamin,
            data.tanggal_lahir,
            data.alamat,
            data.no_telp,
            id
        ],
        callback
    );
};

// Hapus pasien
const deletePatient = (id, callback) => {
    const query = "DELETE FROM pasien WHERE id_pasien=?";

    db.query(query, [id], callback);
};

module.exports = {
    getAllPatients,
    getPatientById,
    createPatient,
    updatePatient,
    deletePatient
};