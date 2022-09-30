const express = require("express");
const router = express.Router();
const upload = require("../Middleware/upload");

const UserController = require("../Controllers/UserController");
router.get("/", UserController.index);
router.get("/:id", UserController.findOne);
router.post("/searchEmail/", UserController.findOneEmail);
router.post("/login", UserController.login);
router.post("/update/:id", UserController.update);
router.post(
  "/register",
  upload.fields([
    {
      name: "Image",
      maxCount: 1,
    },
  ]),
  UserController.register
);

module.exports = router;
