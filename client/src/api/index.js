import axios from "axios";

const url = "http://localhost:5000/patientsData";

export const fetchPatientsData = () => axios.get(url);

export const createPatientsData = (newPatientsData) =>
  axios.post(url, newPatientsData);

export const updatePatientData = (id, updatedPatientData) =>
  axios.patch(`${url}/${id}`, updatedPatientData);
