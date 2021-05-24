import React, { useState, useCallback } from "react";

import "./Filters.css";

import { useDispatch, useSelector } from "react-redux";

import Switch from "@material-ui/core/Switch";
import { Button } from "@material-ui/core";

function Filters({ setFilterData }) {
  const dispatch = useDispatch();

  const patientsData = useSelector((state) => state.patientsData);

  const [isKidenyPatient, setIsKidneyPatient] = useState(false);
  const [isCancerPatient, setIsCancerPatient] = useState(false);
  const [isPalliativeCareNeeded, setIsPalliativeCareNeeded] = useState(false);

  console.log(
    `oyy ${isKidenyPatient} toyy ${isCancerPatient} pyy ${isPalliativeCareNeeded}`
  );

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      kidneyPatient: isKidenyPatient,
      cancerPatient: isCancerPatient,
      palliativeCareNeeded: isPalliativeCareNeeded,
    };

    // dispatch({ type: "FILTER", payload: appliedFilters });

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

    setFilterData(updatedPatientsData);

    console.log(appliedFilters);
  }, [isKidenyPatient, isCancerPatient, isPalliativeCareNeeded]);

  return (
    <div>
      <div className="filtersElement">
        <label for="isKidenyPatient">Kideny Patients</label>
        <Switch
          color="primary"
          name="isKidneyPatient"
          inputProps={{ "aria-label": "isKidneyPatient" }}
          value={isKidenyPatient}
          onChange={() => setIsKidneyPatient(!isKidenyPatient)}
        />
      </div>
      <div className="filtersElement">
        <label for="isCancerPatient">Cancer Patients</label>
        <Switch
          color="primary"
          name="isCancerPatient"
          inputProps={{ "aria-label": "isCancerPatient" }}
          value={isCancerPatient}
          onChange={() => setIsCancerPatient(!isCancerPatient)}
        />
      </div>
      <div className="filtersElement">
        <label for="isPalliativeCareNeeded">Palliative care Patients</label>
        <Switch
          color="primary"
          name="isPalliativeCareNeeded"
          inputProps={{ "aria-label": "isPalliativeCareNeeded" }}
          value={isPalliativeCareNeeded}
          onChange={() => setIsPalliativeCareNeeded(!isPalliativeCareNeeded)}
        />
      </div>
      {/* <div>
        <label for="isKidenyPatient">Kideny Patients</label>
        <Switch
          color="primary"
          name="isKidneyPatient"
          inputProps={{ "aria-label": "isKidneyPatient" }}
        />
      </div> */}

      <Button
        variant="outlined"
        color="primary"
        onClick={saveFilters}
        className="filters__saveButton"
      >
        Save Filters
      </Button>
    </div>
  );
}

export default Filters;
