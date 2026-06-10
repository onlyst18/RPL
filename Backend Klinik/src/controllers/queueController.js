const Queue =
require("../models/queueModel");

// Semua antrian
const getQueues = (req, res) => {

    Queue.getAllQueues((err, results) => {

        if (err)
            return res.status(500).json(err);

        res.json(results);
    });
};

// Buat antrian otomatis
const createQueue = (req, res) => {

    const { id_pendaftaran } = req.body;

    Queue.getLastQueueNumber((err, result) => {

        if (err)
            return res.status(500).json(err);

        let nextNumber = 1;

        if (result[0].lastNumber) {
            nextNumber =
            result[0].lastNumber + 1;
        }

        Queue.createQueue(
            {
                id_pendaftaran,
                nomor_antrian: nextNumber,
                status: "Menunggu"
            },
            (err, insertResult) => {

                if (err)
                    return res.status(500).json(err);

                res.status(201).json({
                    message:
                    "Antrian berhasil dibuat",
                    nomor_antrian:
                    nextNumber
                });
            }
        );
    });
};

// Update status
const updateQueueStatus = (req, res) => {

    Queue.updateQueueStatus(
        req.params.id,
        req.body.status,
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message:
                "Status antrian berhasil diubah"
            });
        }
    );
};

// Hapus
const deleteQueue = (req, res) => {

    Queue.deleteQueue(
        req.params.id,
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message:
                "Antrian berhasil dihapus"
            });
        }
    );
};

module.exports = {
    getQueues,
    createQueue,
    updateQueueStatus,
    deleteQueue
};