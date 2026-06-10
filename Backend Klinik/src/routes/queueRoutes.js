const express = require("express");
const router = express.Router();

const queueController =
require("../controllers/queueController");

router.get(
    "/",
    queueController.getQueues
);

router.post(
    "/",
    queueController.createQueue
);

router.put(
    "/:id",
    queueController.updateQueueStatus
);

router.delete(
    "/:id",
    queueController.deleteQueue
);

module.exports = router;