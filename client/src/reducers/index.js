import { combineReducers } from "redux";

import patientsData from "./patientsData";
import loginInfo from "./loginInfo";

export default combineReducers({
  patientsData,
  loginInfo,
});
