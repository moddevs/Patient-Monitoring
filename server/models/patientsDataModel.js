import mongoose from "mongoose";

const patientsDataSchema = mongoose.Schema({
  id: Number,
  name: String,
  gender: String,

  age: Number,
  mobileNo: String,

  address: String,
  emailId: String,
  height: Number,
  weight: Number,
  treatmentNeededFor: String,

  isKidneyPatient: Boolean,
  isCancerPatient: Boolean,
  isPalliativeCareNeeded: Boolean,

  relativeName: String,
  relativeMobileNo: String,

  treatmentBy: String,
  historyAndFindings: [String],

  patientType: String,
  treatmentAndMedicines: [String],
  // relatedImage: String,
  diet: String,
  exercise: String,
});

const PatientsDataModel = mongoose.model(
  "PatientsDataModel",
  patientsDataSchema
);

export default PatientsDataModel;
