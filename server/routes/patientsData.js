import express from "express";

import { getPatientsData } from "../controllers/patientsData.js";

const router = express.Router();

// http://localhost:5000/patientsData

router.get("/", getPatientsData);

export default router;
