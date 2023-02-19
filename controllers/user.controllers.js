const { UserModel } = require("../models/User.model");

const addUsers = async () => {
  try {
    let response = await fetch("https://randomuser.me/api/?results=50");
    response = await response.json();
    let data = await UserModel.insertMany(response.results);
    return { data: data, Length: data.length, message: "Success" };
  } catch (error) {
    return { message: "Error", description: error };
  }
};

const deleteUsers = async () => {
  try {
    let response = await UserModel.deleteMany();
    return response;
  } catch (error) {
    return error;
  }
};

const getUsers = async (filters) => {
  try {
    let page = Number(filters.page) || 1;
    let pageLimit = Number(filters.limit) || 10;
    let name = filters.name || "";
    let age = filters.age;
    let lowerAgeLimit = 100;
    let greaterAgeLimit = 0;
    let country = filters.country || "";
    let sort = filters.sort || "";
    let sortObject = { "name.first": "" };
    let gender = filters.gender || "";
    if (age == "b20") {
      lowerAgeLimit = 20;
      greaterAgeLimit = 0;
    } else if (age == "m20_b40") {
      lowerAgeLimit = 40;
      greaterAgeLimit = 20;
    } else if (age == "m40") {
      lowerAgeLimit = 100;
      greaterAgeLimit = 40;
    } else if (sort == "asc") {
      sortObject = { ...sortObject, "name.first": 1 };
    } else if (sort == "desc") {
      sortObject = { ...sortObject, "name.first": -1 };
    } else {
      sortObject = { "name.first": "" };
      lowerAgeLimit = 100;
      greaterAgeLimit = 0;
    }
    console.log(filters);
    let data = await UserModel.find({
      "name.first": { $regex: name, $options: "i" },
      "location.country": { $regex: country, $options: "i" },
      gender: { $regex: gender, $options: "i" },
      $and: [{ "dob.age": { $gte: greaterAgeLimit, $lte: lowerAgeLimit } }],
    })
      .limit(10)
      .skip((page - 1) * pageLimit)
      .sort(sortObject);
    let tempdata = await UserModel.find({
      "name.first": { $regex: name, $options: "i" },
      "location.country": { $regex: country, $options: "i" },
      gender: { $regex: gender, $options: "i" },
      $and: [{ "dob.age": { $gte: greaterAgeLimit, $lte: lowerAgeLimit } }],
    });
    let totalPages = Math.ceil(tempdata.length / pageLimit);
    return { data, length: data.length, totalPages };
  } catch (error) {
    return error;
  }
};
module.exports = { addUsers, deleteUsers, getUsers };
