import React, { useEffect, useState } from "react";

import Header from "../Header/Header";
import { useHistory } from "react-router-dom";
import AssignmentIcon from "@material-ui/icons/Assignment";

import { Button } from "@material-ui/core";

import "./Form.css";
// import { useForm } from "react-hook-form";

import axios from "axios";
import ReactDOM from "react-dom";

//import { createPatientsData } from "../../api/index";

// import { setPrefix } from "react-id-generator";
// import nextId from "react-id-generator";

// setPrefix("PATIENT");
// const uniqueIda = nextId();

import { createPatientsData } from "../../actions/patientsData";
import { useDispatch, useSelector } from "react-redux";

import { defaultPatientsData } from "../../miniComponents/defaultPatientsData/defaultPatientsData";

function Form() {
  const history = useHistory();

  const [patientsData, setPatientsData] = useState(defaultPatientsData);

  // const generateId = () => {
  //
  //uniqueId = nextId();
  //   return uniqueId;
  // };

  // const [Hf, setHf] = useState([]);
  // const [hfData, setHfData] = useState("");

  // function addHf(e) {
  //   setHf((prevHf) => {
  //     return [...prevHf, hfData];
  //   });
  // }

  // const deleteHf = (did) => {
  //   setHf((prevHf) => {
  //     return prevHf.filter((HfItem, index) => {
  //       return index !== did;
  //     });
  //   });
  // };

  // useEffect(() => {
  //   setPatientsData({ ...patientsData, historyAndFindings: Hf });
  // }, [Hf]);

  const dispatch = useDispatch();
  const loginInfo = useSelector((state) => state.loginInfo);

  const handleSubmit = (e) => {
    e.preventDefault();
    // setPatientsData({ ...patientsData, id: uniqueIda });

    //axios.post("http://localhost:5000/patientsData", patientsData);

    dispatch(createPatientsData(patientsData));

    setPatientsData(defaultPatientsData);
    // setHfData("");

    // setHf([]);
    alert("Patient Registration Successfull");
    document.getElementById("myForm").reset();
  };
  if (loginInfo.isLoggedIn && loginInfo.accountType === "AUTHPERSON") {
    return (
      <div className="patientForm">
        <div className="patientForm__header">
          <Header
            handleSearch={() => {
              history.push("/patientInfo");
            }}
          />
          <div className="detailedinfo__btn">
            <Button
              className="details__btn"
              variant="contained"
              size="large"
              color="primary"
              onClick={() => history.push("/display")}
            >
              SEE all patients details
            </Button>
          </div>
        </div>
        <div className="regestration__form">
          <form id="myForm" onSubmit={handleSubmit}>
            <div className="patientForm__body">
              <div className="patientForm__bodyLeft">
                <h1 className="register__h1">
                  <span>
                    <AssignmentIcon className="assignment__icon" />
                  </span>
                  &nbsp; Register Patient Here
                </h1>

                <div className="inputfield__container">
                  <label className="input__label">Enter Patient ID</label>
                  <input
                    className="input__box"
                    type="text"
                    value={patientsData.id}
                    onChange={(e) =>
                      setPatientsData({ ...patientsData, id: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="inputfield__container">
                  <label className="input__label">Name of Patient</label>
                  <input
                    className="input__box"
                    type="text"
                    name="name"
                    value={patientsData.name}
                    onChange={(e) =>
                      setPatientsData({ ...patientsData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="inputfield__container control-group">
                  <label>Gender</label>
                  <div>
                    <label for="male" className="control control-radio">
                      <input
                        className=""
                        onClick={(e) =>
                          setPatientsData({
                            ...patientsData,
                            gender: e.target.value,
                          })
                        }
                        type="radio"
                        name="gender"
                        value="male"
                        id="male"
                        required
                      />
                      Male
                      <div className="control_indicator"></div>
                    </label>
                  </div>

                  <div>
                    <label for="female" className="control control-radio">
                      <input
                        className=""
                        onClick={(e) =>
                          setPatientsData({
                            ...patientsData,
                            gender: e.target.value,
                          })
                        }
                        type="radio"
                        name="gender"
                        value="female"
                        id="female"
                        required
                      />
                      Female
                      <div className="control_indicator"></div>
                    </label>
                  </div>
                  <div>
                    <label id="other" className="control control-radio">
                      <input
                        className=""
                        onClick={(e) =>
                          setPatientsData({
                            ...patientsData,
                            gender: e.target.value,
                          })
                        }
                        type="radio"
                        name="gender"
                        value="other"
                        id="other"
                        required
                      />
                      Other
                      <div className="control_indicator"></div>
                    </label>
                  </div>
                </div>

                <div className="inputfield__container">
                  <label className="input__label">Age</label>
                  <input
                    className="input__box"
                    type="text"
                    name="age"
                    value={patientsData.age}
                    onChange={(e) =>
                      setPatientsData({ ...patientsData, age: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="inputfield__container">
                  <label className="input__label">Mobile number</label>
                  <input
                    className="input__box"
                    type="text"
                    name="mobileNo"
                    value={patientsData.mobileNo}
                    onChange={(e) =>
                      setPatientsData({
                        ...patientsData,
                        mobileNo: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="inputfield__container">
                  <label className="input__label">Address of Patient</label>
                  <textarea
                    className="input__box"
                    type="textarea"
                    name="address"
                    rows="4"
                    value={patientsData.address}
                    onChange={(e) =>
                      setPatientsData({
                        ...patientsData,
                        address: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="inputfield__container">
                  <label className="input__label">Email</label>
                  <input
                    className="input__box"
                    type="text"
                    name="email"
                    value={patientsData.emailId}
                    onChange={(e) =>
                      setPatientsData({
                        ...patientsData,
                        emailId: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="patientForm__bodyRight">
                <div className="inputfield__container">
                  <label className="input__label">Height (in cm)</label>
                  <input
                    className="input__box"
                    type="text"
                    name="height"
                    value={patientsData.height}
                    onChange={(e) =>
                      setPatientsData({
                        ...patientsData,
                        height: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="inputfield__container">
                  <label className="input__label">Weight (in kg)</label>
                  <input
                    className="input__box"
                    type="text"
                    name="weight"
                    value={patientsData.weight}
                    onChange={(e) =>
                      setPatientsData({
                        ...patientsData,
                        weight: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="inputfield__container">
                  <label className="input__label">Treatment Needed For</label>
                  <input
                    className="input__box"
                    type="text"
                    name="treatmentNeededFor"
                    value={patientsData.treatmentNeededFor}
                    onChange={(e) =>
                      setPatientsData({
                        ...patientsData,
                        treatmentNeededFor: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="checkbox__wrapper">
                  <label>
                    <div className="check__label">
                      Does patient require special care for any of following
                      aspects?
                    </div>
                  </label>
                  {/* patient type by major diseases */}
                  <div className="control-group">
                    <div className="">
                      <label className="control control-checkbox checked__label">
                        <input
                          className=""
                          type="checkbox"
                          checked={patientsData.isKidneyPatient}
                          name="isKidneyPatient"
                          value={patientsData.isKidneyPatient}
                          onChange={(e) =>
                            setPatientsData({
                              ...patientsData,
                              isKidneyPatient: e.target.checked,
                            })
                          }
                        />
                        kidney Treatment
                        <div className="control_indicator"></div>
                      </label>
                    </div>
                    <div className="">
                      <label className="control control-checkbox checked__label">
                        <input
                          className=""
                          type="checkbox"
                          name="isCancerPatient"
                          checked={patientsData.isCancerPatient}
                          value={patientsData.isCancerPatient}
                          onClick={(e) =>
                            setPatientsData({
                              ...patientsData,
                              isCancerPatient: e.target.checked,
                            })
                          }
                        />
                        Cancer Treatment
                        <div className="control_indicator"></div>
                      </label>
                    </div>
                    <div className="">
                      <label className="control control-checkbox checked__label">
                        <input
                          className=""
                          type="checkbox"
                          name="isPalliativeCareNeeded"
                          checked={patientsData.isPalliativeCareNeeded}
                          value={patientsData.isPalliativeCareNeeded}
                          onChange={(e) =>
                            setPatientsData({
                              ...patientsData,
                              isPalliativeCareNeeded: e.target.checked,
                            })
                          }
                        />
                        Palliative Care
                        <div className="control_indicator"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="inputfield__container">
                  <label className="input__label">
                    Patient's relative Name
                  </label>
                  <input
                    className="input__box"
                    type="text"
                    name="relativeName"
                    value={patientsData.relativeName}
                    onChange={(e) =>
                      setPatientsData({
                        ...patientsData,
                        relativeName: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="inputfield__container">
                  <label className="input__label">
                    patient's relative Mobile Number
                  </label>
                  <input
                    className="input__box"
                    type="text"
                    name="relativeMobileNo"
                    value={patientsData.relativeMobileNo}
                    onChange={(e) =>
                      setPatientsData({
                        ...patientsData,
                        relativeMobileNo: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="formsubmit__btn">
                  <Button
                    className="submitbtn"
                    variant="contained"
                    size="large"
                    color="primary"
                    type="submit"
                  >
                    Submit
                  </Button>
                </div>
              </div>

              {/* <div className="">
          <label>Enter historyAndFindings</label>

          <input
            type="text"
            name="hfarray"
            value={hfData}
            onChange={(e) => setHfData(e.target.value)}
          />
          <button type="button" onClick={addHf}>
            Add new hf
          </button>
          {Hf.map((element, index) => {
            return (
              <div>
                <ListDisplay
                  element={element}
                  did={index}
                  onDelete={deleteHf}
                />
              </div>
            );
          })}
        </div> */}
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="patientForm__header">
          <Header
            handleSearch={() => {
              history.push("/patientInfo");
            }}
          />
        </div>
        <h1>Please login first to view Data</h1>
      </div>
    );
  }
}

export default Form;

//id name gender age mobile_no patientaddress  email_id height weight-- treatment_needed_for isKidney isCancer isPallaitive  relative_name relative_mobileNo

//treatement_by(doc name)  medical_history_and_findings[] patient_type(ipd/opd)  treatment_and_medicine[array] additional_suggestions - diet exercise images_related_patients treatment_reports(ct_scan, x-ray)

// id: "",
// name: "",
// gender: "",
// age: "",
// mobileNo: "",
// address: "",
// emailId: "",
// height: "",
// weight: "",
// treatmentNeededFor: "",
// relativeName: "",
// relativeMobileNo: "",
