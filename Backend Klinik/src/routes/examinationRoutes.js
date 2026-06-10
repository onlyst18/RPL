const express = require("express");
const router = express.Router();

const examinationController =
require("../controllers/examinationController");

router.get(
    "/",
    examinationController.getExaminations
);

router.get(
    "/:id",
    examinationController.getExaminationById
);

router.post(
    "/",
    examinationController.createExamination
);

router.put(
    "/:id",
    examinationController.updateExamination
);

router.delete(
    "/:id",
    examinationController.deleteExamination
);

module.exports = router;