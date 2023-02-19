const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  gender: { type: String, required: true },
  name: {
    title: { type: String },
    first: { type: String, required: true },
    last: { type: String },
  },
  location: {
    street: {
      number: { type: Number },
      name: { type: String },
    },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    postcode: { type: String, required: true },
    coordinates: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    timezone: {
      offset: { type: String, required: true },
      description: { type: String, required: true },
    },
  },
  email: { type: String, required: true },
  login: {
    uuid: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    md5: { type: String, required: true },
    sha1: { type: String, required: true },
    sha256: { type: String, required: true },
  },
  dob: {
    date: { type: String, required: true },
    age: { type: Number, required: true },
  },
  registered: {
    date: { type: String, required: true },
    age: { type: Number, required: true },
  },
  phone: { type: String },
  cell: { type: String },
  picture: {
    large: { type: String, required: true },
    medium: { type: String, required: true },
    thumbnail: { type: String, required: true },
  },
  nat: { type: String, required: true },
});

const UserModel = mongoose.model("user", userSchema);
module.exports = { UserModel };
