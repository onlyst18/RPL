const db = require("../config/database");

// Semua obat
const getAllMedicines = (callback) => {
    const query = "SELECT * FROM obat";

    db.query(query, callback);
};

// Detail obat
const getMedicineById = (id, callback) => {
    const query =
        "SELECT * FROM obat WHERE id_obat = ?";

    db.query(query, [id], callback);
};

// Tambah obat
const createMedicine = (data, callback) => {
    const query = `
        INSERT INTO obat
        (nama_obat, stok, harga)
        VALUES (?, ?, ?)
    `;

    db.query(
        query,
        [
            data.nama_obat,
            data.stok,
            data.harga
        ],
        callback
    );
};

// Update obat
const updateMedicine =
(id, data, callback) => {

    const query = `
        UPDATE obat
        SET
            nama_obat=?,
            stok=?,
            harga=?
        WHERE id_obat=?
    `;

    db.query(
        query,
        [
            data.nama_obat,
            data.stok,
            data.harga,
            id
        ],
        callback
    );
};

// Hapus obat
const deleteMedicine =
(id, callback) => {

    const query =
        "DELETE FROM obat WHERE id_obat=?";

    db.query(query, [id], callback);
};

module.exports = {
    getAllMedicines,
    getMedicineById,
    createMedicine,
    updateMedicine,
    deleteMedicine
};