const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const upload = require("../Middleware/UploadFireBase");

//getAll
const index = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users) {
      res.status(404).json("no users found");
    } else {
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//getOne
const findOne = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json("User not found");
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Creer compte
const register = async (req, res, next) => {
  try {
    const p = await bcrypt.hash(req.body.pwd, 10);
    var user = new User({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Email: req.body.Email,
      Password: p,
      Role: "Client",
    });
    userCheck = await User.findOne({ Email: user.Email });
    console.log(userCheck);

    if (userCheck) {
      res.status(400).json({ err: "user already exists" });
    } else {
      newUser = await user.save();
      res.status(200).json(newUser);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//Se connecter
const login = async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.pwd;
    userCheck = await User.findOne({
      $or: [{ Email: username }, { FirstName: username }],
    });
    if (!userCheck) {
      res.status(404).json({ message: "user not found" });
    } else {
      bcrypt.compare(
        password,
        userCheck.Password,
        async function (err, result) {
          if (!result) {
            res.status(400).json({ err: "invalid info" });
          } else {
            if (result) {
              var token = jwt.sign(
                { user: userCheck },
                process.env.TOKEN_SECRET,
                { expiresIn: "30d" }
              );
              res.status(200).json({
                message: "login successfully",
                token,
                userCheck: userCheck,
              });
            }
          }
        }
      );
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

const findOneEmail = async (req, res, next) => {
  try {
    const email = req.body.email;
    userCheck = await User.findOne({
      $or: [{ Email: email }, { FirstName: email }],
    });
    if (!userCheck) {
      res.status(404).json({ message: "user not found" });
    } else {
      res.status(200).json(userCheck);
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};
//Update Profile
const update = async (req, res, next) => {
  try {
    const userID = req.params.id;
    const user = await User.findById(userID);
    if (!user) {
      res.status(404).json({ message: "user not found" });
    } else {
      if (req.body.Password) {
        const p = await bcrypt.hash(req.body.Password, 10);
        user.Password = p;
      }

      if (req.body.FirstName) {
        user.FirstName = req.body.FirstName;
      }
      if (req.body.Email) {
        user.Email = req.body.Email;
      }
      if (req.body.LastName) {
        user.LastName = req.body.LastName;
      }

      updatedUser = await user.save();
      console.log(updatedUser);
      res.status(200).json(updatedUser);
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  update,
  findOne,
  index,
  findOneEmail,
};
