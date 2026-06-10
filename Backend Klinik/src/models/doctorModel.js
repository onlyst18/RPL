const db = require("../config/database");

// Ambil semua dokter
const getAllDoctors = (callback) => {
    const query = "SELECT * FROM dokter";

    db.query(query, callback);
};

// Ambil dokter berdasarkan ID
const getDoctorById = (id, callback) => {
    const query = "SELECT * FROM dokter WHERE id_dokter = ?";

    db.query(query, [id], callback);
};

// Tambah dokter
const createDoctor = (data, callback) => {
    const query = `
        INSERT INTO dokter
        (nama_dokter, spesialis, no_telp)
        VALUES (?, ?, ?)
    `;

    db.query(
        query,
        [
            data.nama_dokter,
            data.spesialis,
            data.no_telp
        ],
        callback
    );
};

// Update dokter
const updateDoctor = (id, data, callback) => {
    const query = `
        UPDATE dokter
        SET
            nama_dokter=?,
            spesialis=?,
            no_telp=?
        WHERE id_dokter=?
    `;

    db.query(
        query,
        [
            data.nama_dokter,
            data.spesialis,
            data.no_telp,
            id
        ],
        callback
    );
};

// Hapus dokter
const deleteDoctor = (id, callback) => {
    const query = "DELETE FROM dokter WHERE id_dokter=?";

    db.query(query, [id], callback);
};

module.exports = {
    getAllDoctors,
    getDoctorById,
    createDoctor,
    updateDoctor,
    deleteDoctor
};