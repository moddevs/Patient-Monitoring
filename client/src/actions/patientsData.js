import * as api from "../api";
import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actionTypes";

// export const createPatientsData = (patientsData) => async () => {
//   try {
//     console.log("hello");
//     console.log(patientsData);
//     const { data } = await api.createPatientsData(patientsData);
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getPatientsData = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPatientsData();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPatientsData = (patientsData) => async (dispatch) => {
  try {
    const { data } = await api.createPatientsData(patientsData);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePatientData = (id, pdata) => async (dispatch) => {
  try {
    const { data } = await api.updatePatientData(id, pdata);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
