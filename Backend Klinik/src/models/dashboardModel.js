const db = require("../config/database");

const getDashboardData = (callback) => {

    const query = `
        SELECT

        (SELECT COUNT(*) FROM pasien)
        AS total_pasien,

        (SELECT COUNT(*) FROM dokter)
        AS total_dokter,

        (SELECT COUNT(*) FROM pendaftaran)
        AS total_pendaftaran,

        (SELECT COUNT(*) FROM pemeriksaan)
        AS total_pemeriksaan,

        (SELECT COUNT(*) FROM pembayaran)
        AS total_transaksi,

        (SELECT IFNULL(SUM(total_bayar),0)
         FROM pembayaran)
        AS total_pendapatan
    `;

    db.query(query, callback);
};

module.exports = {
    getDashboardData
};