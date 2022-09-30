const express = require("express");
const router = express.Router();
const upload = require("../Middleware/upload");

const ReviewController = require("../Controllers/ReviewController");
router.get("/", ReviewController.index);
router.get("/:id", ReviewController.findOne);
router.post(
  "/add/:userId/:hotelId",
  upload.fields([
    {
      name: "Images",
      maxCount: 6,
    },
    {
      name: "Justificatif",
      maxCount: 1,
    },
  ]),
  ReviewController.add
);

module.exports = router;
