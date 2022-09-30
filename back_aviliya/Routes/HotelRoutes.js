const express = require("express");
const router = express.Router();
const upload = require("../Middleware/upload");

const HotelController = require("../Controllers/HotelController");
router.get("/", HotelController.index);
router.get("/:id", HotelController.findOne);
router.post(
  "/add",
  upload.fields([
    {
      name: "Images",
      maxCount: 1,
    },
  ]),
  HotelController.add
);

router.post(
  "/update/:id",
  upload.fields([
    {
      name: "Images",
      maxCount: 1,
    },
  ]),
  HotelController.update
);

module.exports = router;
