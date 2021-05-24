import mongoose from "mongoose";

import PatientsDataModel from "../models/patientsDataModel.js";

///-------- GET DATA ----------------

export const fetchPatientsData = (req, res) => {
  //res.send("THIS IS THE PATIENT DATA");

  PatientsDataModel.find(function (err, patientsData) {
    if (err) {
      console.log(err);
    } else {
      console.log(patientsData);
      res.send(patientsData);
    }
  });
};

///-------- CREATE DATA --------------

export const createPatientsData = async (req, res) => {
  const patientsData = req.body;

  const newPatientsData = new PatientsDataModel(patientsData);

  try {
    await newPatientsData.save();
    console.log(newPatientsData);
    res.status(201).json(newPatientsData);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

///--------------- UPDATE DATA------------

export const updatePatientData = async (req, res) => {
  const { id: _id } = req.params;

  const pdata = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No patient with that id");

  const updatedPatientData = await PatientsDataModel.findByIdAndUpdate(
    _id,
    { ...pdata, _id },
    {
      new: true,
    }
  );

  res.json(updatedPatientData);
};
