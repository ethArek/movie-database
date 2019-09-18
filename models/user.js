const mongoose = require("mongoose");
const validator = require("validator");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../config/config.js");

const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "E-mail nie został podany"],
    trim: true,
    unique: [true, "E-mail jest już zajęty"],
    minlength: 1,
    validate: {
      validator: value => {
        return validator.isEmail(value);
      },
      message: "Email nie jest prawidłowy"
    }
  },
  password: {
    type: String,
    required: [true, "Hasło nie zostało podane"],
    minlength: [6, "Hasło musi zawierać więcej niż 6 znaków"]
  },
  registerDate: {
    type: Date,
    default: Date.now
  },
  accessTokens: [
    {
      token: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

UserSchema.pre("save", function(next) {
  const user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  return _.pick(userObject, ["_id", "email"]);
};

UserSchema.statics.findByCredentials = async function(email, password) {
  const User = this;
  const user = await User.findOne({ email });
  if (!user) {
    return Promise.reject("user.not_found");
  }

  return new Promise(async (resolve, reject) => {
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      reject("user.invalid_password");
    } else {
      resolve(user);
    }
  });
};

UserSchema.methods.generateAuthToken = async function() {
  try {
    const user = this;
    const access = "auth";
    const token = jwt
      .sign({ _id: user._id.toHexString(), access }, jwtSecret)
      .toString();
    user.accessTokens.push({ token });
    await user.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

UserSchema.statics.findByToken = function(token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, jwtSecret);
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    "accessTokens.token": token
  });
};

const User = mongoose.model("users", UserSchema);

module.exports = User;
