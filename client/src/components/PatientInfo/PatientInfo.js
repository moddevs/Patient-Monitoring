import React from "react";
import "./PatientInfo.css";

import Header from "../Header/Header";

import { useSelector } from "react-redux";

import { Button } from "@material-ui/core";
import { useHistory } from "react-router";

import ImportExportIcon from "@material-ui/icons/ImportExport";

import Paper from "@material-ui/core/Paper";

function PatientInfo() {
  const history = useHistory();
  const patientsData = useSelector((state) => state.patientsData);

  const loginInfo = useSelector((state) => state.loginInfo);
  const displayId = loginInfo.displayId;

  const pdata = patientsData.find((element) => element.id == displayId);

  const handleDoctorForm = () => {
    history.push("/doctorForm");
  };

  if (pdata) {
    return (
      <div className="pInfo">
        <Header handleSearch={() => history.push("/patientInfo")} />
        <div>
          {loginInfo.accountType === "DOCTOR" ? (
            <div className="pInfo__updateTitle">
              <Button
                variant="contained"
                color="primary"
                onClick={handleDoctorForm}
              >
                UPDATE&nbsp; <ImportExportIcon />
              </Button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="pInfo__body">
          <div className="pInfo__left">
            <div className="pInfo__element">
              <div className="pInfo__title">Patient ID</div>
              <div className="pInfo__content">{pdata.id}</div>
            </div>
            <div className="pInfo__element">
              <div className="pInfo__title">Name of Patient</div>
              <div className="pInfo__content">{pdata.name}</div>
            </div>
            <div className="pInfo__element">
              <div className="pInfo__title">Gender</div>{" "}
              <div className="pInfo__content">{pdata.gender}</div>
            </div>
            <div className="pInfo__element">
              <div className="pInfo__title">Age</div>
              <div className="pInfo__content">{pdata.age}</div>
            </div>
            <div className="pInfo__element">
              <div className="pInfo__title">Mobile Number</div>{" "}
              <div className="pInfo__content">{pdata.mobileNo}</div>
            </div>
            <div className="pInfo__element">
              <div className="pInfo__title">Address</div>
              <div className="pInfo__content">{pdata.address}</div>
            </div>
            <div className="pInfo__element">
              <div className="pInfo__title">Email ID</div>
              <div className="pInfo__content">{pdata.emailId}</div>
            </div>
            <div className="pInfo__element">
              <div className="pInfo__title">Height (in cm)</div>
              <div className="pInfo__content">{pdata.height}</div>
            </div>
            <div className="pInfo__element">
              <div className="pInfo__title">Weight (in kg)</div>
              <div className="pInfo__content">{pdata.weight}</div>
            </div>
            <div className="pInfo__element">
              <div className="pInfo__title">Treatment and Medicines</div>{" "}
              <div className="pInfo__content pInfo__list">
                {" "}
                {pdata.treatmentAndMedicines.map((element, index) => {
                  return <li>{element}</li>;
                })}
              </div>
            </div>
          </div>

          {/* ======================================= */}

          <div className="pInfo__right">
            <div className="pInfo__element">
              <div className="pInfo__title">Treatment Given For</div>
              <div className="pInfo__content">{pdata.treatmentNeededFor}</div>
            </div>
            <div className="pInfo__element">
              <div className="pInfo__title">Special attention is given for</div>
              <div className="pInfo__content">
                {pdata.isKidneyPatient ? (
                  <div>Kidney Treatment&nbsp;</div>
                ) : (
                  <div></div>
                )}{" "}
                {pdata.isCancerPatient ? (
                  <div>Cancer Treatment&nbsp;</div>
                ) : (
                  <div></div>
                )}{" "}
                {pdata.isPalliativeCareNeeded ? (
                  <div>Palliative Care</div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
            <div className="pInfo__element">
              <div className="pInfo__title">
                Patient's Relative Name (for emergency purpose)
              </div>{" "}
              <div className="pInfo__content">{pdata.relativeName}</div>
            </div>
            <div className="pInfo__element">
              <div className="pInfo__title">
                Patient's Relative Mobile Number (for emergency purpose)
              </div>{" "}
              <div className="pInfo__content">{pdata.relativeMobileNo}</div>
            </div>
            <div className="pInfo__element">
              <div className="pInfo__title">
                Name of the doctor who is giving the treatment
              </div>{" "}
              <div className="pInfo__content">{pdata.treatmentBy}</div>
            </div>

            <div className="pInfo__element">
              <div className="pInfo__title">Patient Type</div>{" "}
              <div className="pInfo__content">{pdata.patientType}</div>
            </div>
            <div className="pInfo__element">
              <div className="pInfo__title">Suggested Diet</div>{" "}
              <div className="pInfo__content">{pdata.diet}</div>
            </div>
            <div className="pInfo__element">
              <div className="pInfo__title">Suggested Exercise</div>{" "}
              <div className="pInfo__content">{pdata.exercise}</div>
            </div>
            <div className="pInfo__element">
              <div className="pInfo__title">History and Findings</div>{" "}
              <div className="pInfo__content pInfo__list">
                {pdata.historyAndFindings.map((element, index) => {
                  return <li>{element}</li>;
                })}
              </div>
            </div>
          </div>
          {/* ================================================== */}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Header handleSearch={() => history.push("/patientInfo")} />
        <h1>Id not found .Enter Valid ID in the search bar</h1>
      </div>
    );
  }
}

export default PatientInfo;
