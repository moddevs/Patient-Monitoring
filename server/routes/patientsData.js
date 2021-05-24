import express from "express";

import {
  fetchPatientsData,
  createPatientsData,
  updatePatientData,
} from "../controllers/patientsData.js";

import { createLoginData, fetchLoginData } from "../controllers/loginData.js";

const router = express.Router();

// http://localhost:5000/patientsData

router.get("/", fetchPatientsData);

router.post("/", createPatientsData);

router.patch("/:id", updatePatientData);

router.get("/loginData", fetchLoginData);

router.post("/loginData", createLoginData);

export default router;
