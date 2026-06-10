const db = require("../config/database");

// Ambil semua antrian
const getAllQueues = (callback) => {
    const query = `
        SELECT
            antrian.*,
            pasien.nama_pasien
        FROM antrian
        JOIN pendaftaran
            ON antrian.id_pendaftaran = pendaftaran.id_pendaftaran
        JOIN pasien
            ON pendaftaran.id_pasien = pasien.id_pasien
        ORDER BY nomor_antrian ASC
    `;

    db.query(query, callback);
};

// Cari nomor antrian terakhir
const getLastQueueNumber = (callback) => {

    const query = `
        SELECT MAX(nomor_antrian) AS lastNumber
        FROM antrian
    `;

    db.query(query, callback);
};

// Tambah antrian
const createQueue = (data, callback) => {

    const query = `
        INSERT INTO antrian
        (id_pendaftaran, nomor_antrian, status)
        VALUES (?, ?, ?)
    `;

    db.query(
        query,
        [
            data.id_pendaftaran,
            data.nomor_antrian,
            data.status
        ],
        callback
    );
};

// Update status
const updateQueueStatus = (id, status, callback) => {

    const query = `
        UPDATE antrian
        SET status = ?
        WHERE id_antrian = ?
    `;

    db.query(query, [status, id], callback);
};

// Hapus antrian
const deleteQueue = (id, callback) => {

    const query =
        "DELETE FROM antrian WHERE id_antrian = ?";

    db.query(query, [id], callback);
};

module.exports = {
    getAllQueues,
    getLastQueueNumber,
    createQueue,
    updateQueueStatus,
    deleteQueue
};