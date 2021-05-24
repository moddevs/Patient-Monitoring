import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actionTypes";

export default (patientsData = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...patientsData, action.payload];
    case UPDATE:
      return patientsData.map((pdata) =>
        pdata.id == action.payload.id ? action.payload : pdata
      );

    case "FILTER":
      const appliedFilters = action.payload;
      const updatedPatientsData = patientsData.filter((pdata) => {
        if (appliedFilters.kidneyPatient && !pdata.isKidneyPatient) {
          return false;
        }
        if (appliedFilters.cancerPatient && !pdata.isCancerPatient) {
          return false;
        }
        if (
          appliedFilters.palliativeCareNeeded &&
          !pdata.isPalliativeCareNeeded
        ) {
          return false;
        }

        return true;
      });
      return updatedPatientsData;

    default:
      return patientsData;
  }
};
