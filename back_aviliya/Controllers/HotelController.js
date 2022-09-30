const Hotel = require("../Models/Hotel");
const upload = require("../Middleware/UploadFireBase");

//GetAll
const index = async (req, res, next) => {
  try {
    const hotels = await Hotel.find().populate("Reviews");
    if (!hotels) {
      res.status(404).json("no hotel found");
    } else {
      res.status(200).json(hotels);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//GetOne
const findOne = async (req, res, next) => {
  try {
    const hotelId = req.params.id;
    const hotel = await Hotel.findById(hotelId).populate("Reviews");
    if (!hotel) {
      res.status(404).json("hotel not found");
    } else {
      res.status(200).json(hotel);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//Ajout Hotel
const add = async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.data);
    let gallery = [];
    const files = req.files.Images;
    files.forEach(async (file) => {
      let newFileName = `hotels/${file.originalname + "-" + Date.now()}$/ `;
      let publicURL = `https://storage.googleapis.com/royal-pass-339716.appspot.com/${encodeURI(
        newFileName
      )}`;
      await gallery.push(publicURL);
      await upload.uploadFile(file, newFileName).catch((reject) => {
        console.log(reject);
      });
    });

    const newHotel = new Hotel({
      Name: data.Name,
      Localisation: data.Localisation,
      Description: data.Description,
      Stars: data.Stars,
      Latitude: data.Latitude,
      Longitude: data.Longitude,
      Images: gallery[0],
    });

    const savedHotel = await newHotel.save();
    console.log("updated");
    res.status(200).json(savedHotel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update Hotel
const update = async (req, res, next) => {
  try {
    const hotelId = req.params.id;
    const data = JSON.parse(req.body.data);
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      res.status(404).json({ message: "hotel not found" });
    } else {
      if (data.Name) {
        hotel.Name = data.Name;
      }
      if (data.Localisation) {
        hotel.Localisation = data.Localisation;
      }
      if (data.Description) {
        hotel.Description = data.Description;
      }
      if (data.Stars) {
        hotel.Stars = data.Stars;
      }
      if (data.Longitude) {
        hotel.Longitude = data.Longitude;
      }
      if (data.Latitude) {
        hotel.Latitude = data.Latitude;
      }
      if (req.files.Images) {
        let gallery = [];
        const files = req.files.Images;
        files.forEach(async (file) => {
          let newFileName = `hotels/${file.originalname + "-" + Date.now()}$/ `;
          let publicURL = `https://storage.googleapis.com/royal-pass-339716.appspot.com/${encodeURI(
            newFileName
          )}`;
          await gallery.push(publicURL);
          await upload.uploadFile(file, newFileName).catch((reject) => {
            console.log(reject);
          });
        });
        hotel.Images = gallery[0];
        console.log(hotel.Images);
      }
      updatedHotel = await hotel.save();
      res.status(200).json(updatedHotel);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  index,
  findOne,
  add,
  update,
};
