import mongoose from "mongoose";

import LoginDataModel from "../models/loginDataModel.js";

export const fetchLoginData = (req, res) => {
  //res.send("THIS IS THE PATIENT DATA");

  LoginDataModel.find(function (err, loginData) {
    if (err) {
      console.log(err);
    } else {
      console.log(loginData);
      res.send(loginData);
    }
  });
};

export const createLoginData = async (req, res) => {
  const loginData = req.body;

  const newLoginData = new LoginDataModel(loginData);

  try {
    await newLoginData.save();
    console.log(newLoginData);
    res.status(201).json(newLoginData);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
