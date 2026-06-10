const db = require("../config/database");

// Semua pembayaran
const getAllPayments = (callback) => {

    const query = `
        SELECT *
        FROM pembayaran
    `;

    db.query(query, callback);
};

// Hitung total obat
const calculateMedicineCost = (
    id_pendaftaran,
    callback
) => {

    const query = `
        SELECT
            SUM(resep.jumlah * obat.harga)
            AS total_obat
        FROM pemeriksaan

        JOIN resep
            ON pemeriksaan.id_pemeriksaan =
               resep.id_pemeriksaan

        JOIN obat
            ON resep.id_obat =
               obat.id_obat

        WHERE pemeriksaan.id_pendaftaran = ?
    `;

    db.query(
        query,
        [id_pendaftaran],
        callback
    );
};

// Simpan pembayaran
const createPayment = (
    data,
    callback
) => {

    const query = `
        INSERT INTO pembayaran
        (
            id_pendaftaran,
            biaya_pemeriksaan,
            biaya_obat,
            total_bayar,
            tanggal_bayar
        )
        VALUES (?, ?, ?, ?, NOW())
    `;

    db.query(
        query,
        [
            data.id_pendaftaran,
            data.biaya_pemeriksaan,
            data.biaya_obat,
            data.total_bayar
        ],
        callback
    );
};

module.exports = {
    getAllPayments,
    calculateMedicineCost,
    createPayment
};