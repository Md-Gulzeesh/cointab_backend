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
    const { name, country, age, gender, sort,page } = filters;
    // console.log(name, country, age, gender, sort,page);
    const query = {};
    const sortQuery = {};
    if (name) {
      query["name.first"] = { $regex: name, $options: "i" };
    }
    if (country) {
      query["location.country"] = { $regex: country, $options: "i" };
    }
    if (age) {
      if (age == "b20") {
        query["$and"] = [{ "dob.age": { $gte: 0, $lte: 20 } }];
      } else if (age == "m20_b40") {
        query["$and"] = [{ "dob.age": { $gte: 20, $lte: 40 } }];
      } else if (age == "b40") {
        query["$and"] = [{ "dob.age": { $gte: 0, $lte: 40 } }];
      } else {
        query["$and"] = [{ "dob.age": { $gte: 0, $lte: 100 } }];
      }
    }
    if (gender) {
      if (gender.toLowerCase() == "male") {
        query["gender"] = gender.toLowerCase();
      } else if (gender.toLowerCase() == "female") {
        query["gender"] = gender.toLowerCase();
      }
    }
    if(sort){
      if(sort == "asc"){
          sortQuery["name.first"]= 1;
      }else if(sort == "desc"){
        sortQuery["name.first"] = -1;
      }
    }
    // console.log(query);
    let data = await UserModel.find(query).limit(10).skip(((Number(page)?Number(page):1)-1)*10).sort(sortQuery);
    let tempdata = await UserModel.find(query);
    let totalPages = Math.ceil(tempdata.length / 10);
    return { data, length: data.length, totalPages };
  } catch (error) {
    return error
  }
};
module.exports = { addUsers, deleteUsers, getUsers };
