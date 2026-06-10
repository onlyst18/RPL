const Payment =
require("../models/paymentModel");

// Semua pembayaran
const getPayments = (req, res) => {

    Payment.getAllPayments(
        (err, results) => {

            if (err)
                return res.status(500).json(err);

            res.json(results);
        }
    );
};

// Buat pembayaran
const createPayment = (req, res) => {

    const {
        id_pendaftaran,
        biaya_pemeriksaan
    } = req.body;

    Payment.calculateMedicineCost(
        id_pendaftaran,
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            const biayaObat =
                result[0].total_obat || 0;

            const totalBayar =
                Number(biaya_pemeriksaan)
                +
                Number(biayaObat);

            Payment.createPayment(
                {
                    id_pendaftaran,
                    biaya_pemeriksaan,
                    biaya_obat:
                        biayaObat,
                    total_bayar:
                        totalBayar
                },
                (err, insertResult) => {

                    if (err)
                        return res.status(500).json(err);

                    res.status(201).json({
                        message:
                        "Pembayaran berhasil",

                        biaya_pemeriksaan,

                        biaya_obat:
                        biayaObat,

                        total_bayar:
                        totalBayar
                    });
                }
            );
        }
    );
};

module.exports = {
    getPayments,
    createPayment
};