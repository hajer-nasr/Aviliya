const Review = require("../Models/Review");
const Hotel = require("../Models/Hotel");
const User = require("../Models/User");
const upload = require("../Middleware/UploadFireBase");
const mongoose = require("mongoose");
//getAll
const index = async (req, res, next) => {
  try {
    const review = await Review.find()
      .populate("Hotel", "-Reviews")
      .populate("User");
    if (!review) {
      res.status(404).json("no review found");
    } else {
      res.status(200).json(review);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//getOne
const findOne = async (req, res, next) => {
  try {
    const reviewId = req.params.id;
    const review = await Review.findById(reviewId)
      .populate("Hotel", "-Reviews")
      .populate("User");
    if (!review) {
      res.status(404).json("review not found");
    } else {
      res.status(200).json(review);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Ajout
const add = async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.data);
    console.log(req.params.userId);
    console.log(req.params.hotelId);
    const user = await User.findById(req.params.userId);
    const hotel = await Hotel.findById(req.params.id);
    // console.log("user" + user);
    // console.log("hotel" + hotel);
    console.log("data" + data);
    if (!user || !hotel) {
      res.status(400).json("wrong request");
      return;
    }
    let file = "";
    let gallery = [];

    const files = req.files.Images;
    files.forEach(async (file) => {
      let newFileName = `reviews/${file.originalname + "-" + Date.now()}$/ `;
      let publicURL = `https://storage.googleapis.com/royal-pass-339716.appspot.com/${encodeURI(
        newFileName
      )}`;

      await gallery.push(publicURL);
      await upload.uploadFile(file, newFileName).catch((reject) => {
        console.log(reject);
      });
    });
    const files2 = req.files.Justificatif;
    files2.forEach(async (file) => {
      let newFileName = `reviews/${file.originalname + "-" + Date.now()}$/ `;
      let publicURL = `https://storage.googleapis.com/royal-pass-339716.appspot.com/${encodeURI(
        newFileName
      )}`;
      file = publicURL;
      await upload.uploadFile(file, newFileName).catch((reject) => {
        console.log(reject);
      });
    });

    const newReview = new Review({
      Value: data.Value,
      Images: gallery[0],
      Justificatif: file,
      User: user,
      Hotel: hotel,
    });

    const savedReview = await newReview.save();
    console.log(savedReview);
    const allReview = await Review.find({ hotel: hotel._id });
    var newStar = 0;

    allReview.forEach((rev) => {
      newStar += rev.Value;
    });
    newStar = newStar / allReview.length;

    hotel.Stars = newStar.toString();
    updatedHotel = await hotel.save();
    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  index,
  findOne,
  add,
};
