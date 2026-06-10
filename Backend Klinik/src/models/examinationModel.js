const db = require("../config/database");

// Semua pemeriksaan
const getAllExaminations = (callback) => {

    const query = `
        SELECT
            pemeriksaan.*,
            pasien.nama_pasien,
            dokter.nama_dokter
        FROM pemeriksaan
        JOIN pendaftaran
            ON pemeriksaan.id_pendaftaran =
               pendaftaran.id_pendaftaran
        JOIN pasien
            ON pendaftaran.id_pasien =
               pasien.id_pasien
        JOIN dokter
            ON pemeriksaan.id_dokter =
               dokter.id_dokter
    `;

    db.query(query, callback);
};

// Detail pemeriksaan
const getExaminationById = (id, callback) => {

    const query = `
        SELECT *
        FROM pemeriksaan
        WHERE id_pemeriksaan = ?
    `;

    db.query(query, [id], callback);
};

// Tambah pemeriksaan
const createExamination = (data, callback) => {

    const query = `
        INSERT INTO pemeriksaan
        (
            id_pendaftaran,
            id_dokter,
            diagnosis,
            tindakan
        )
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        query,
        [
            data.id_pendaftaran,
            data.id_dokter,
            data.diagnosis,
            data.tindakan
        ],
        callback
    );
};

// Update pemeriksaan
const updateExamination =
(id, data, callback) => {

    const query = `
        UPDATE pemeriksaan
        SET
            diagnosis = ?,
            tindakan = ?
        WHERE id_pemeriksaan = ?
    `;

    db.query(
        query,
        [
            data.diagnosis,
            data.tindakan,
            id
        ],
        callback
    );
};

// Hapus pemeriksaan
const deleteExamination =
(id, callback) => {

    const query =
        "DELETE FROM pemeriksaan WHERE id_pemeriksaan = ?";

    db.query(query, [id], callback);
};

module.exports = {
    getAllExaminations,
    getExaminationById,
    createExamination,
    updateExamination,
    deleteExamination
};