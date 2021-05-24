import React, { useEffect, useState } from "react";
import "./FormDoctor.css";
import "../Form/Form.css";
import { defaultPatientsData } from "../../miniComponents/defaultPatientsData/defaultPatientsData";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import AssignmentIcon from "@material-ui/icons/Assignment";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListDisplay from "../../miniComponents/ListDisplay/ListDisplay";

import Header from "../Header/Header";

import { updatePatientData } from "../../actions/patientsData";
import { Button } from "@material-ui/core";
// import Icon from "@material-ui/core/Icon";
import AddIcon from "@material-ui/icons/Add";

function FormDoctor() {
  const dispatch = useDispatch();
  const patientsData = useSelector((state) => state.patientsData);
  const loginInfo = useSelector((state) => state.loginInfo);

  const [hight, setHight] = useState(180);

  const history = useHistory();

  const checkData = () => {
    if (
      patientsData.find((element) => element.id == loginInfo.displayId) ==
      undefined
    ) {
      return defaultPatientsData;
    } else {
      return patientsData.find((element) => element.id == loginInfo.displayId);
    }
  };

  const pdata = checkData();
  // if (pdata == undefined) {
  //   pdata = defaultPatientsData;
  // }
  console.log(`pdata ====>>${pdata}`);

  const [currentPatientData, setCurrentPatientData] = useState(pdata);

  //** historyAndFindings **

  const [Hf, setHf] = useState(pdata.historyAndFindings);

  const [hfData, setHfData] = useState("");

  function addHf(e) {
    addHeight();
    setHf((prevHf) => {
      return [...prevHf, hfData];
    });
    setHfData("");
  }

  const deleteHf = (did) => {
    setHf((prevHf) => {
      return prevHf.filter((HfItem, index) => {
        return index !== did;
      });
    });
  };

  useEffect(() => {
    setCurrentPatientData({ ...currentPatientData, historyAndFindings: Hf });
  }, [Hf]);

  // * treatmentAndMedicines ***
  const [Tm, setTm] = useState(pdata.treatmentAndMedicines);
  const [tmData, setTmData] = useState("");

  const addHeight = () => {
    setHight(hight + 4);
    // console.log(`hhhhhhhhhight ==============> ${hight}`);
    document.getElementById("height__id").style.height = `${hight}vh`;
  };

  function addTm(e) {
    addHeight();
    setTm((prevTm) => {
      return [...prevTm, tmData];
    });

    setTmData("");
  }

  const deleteTm = (did) => {
    setTm((prevTm) => {
      return prevTm.filter((TmItem, index) => {
        return index !== did;
      });
    });
  };

  useEffect(() => {
    setCurrentPatientData({ ...currentPatientData, treatmentAndMedicines: Tm });
  }, [Tm]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // axios.post("http://localhost:5000/patientsData", patientsData);
    console.log(`apla current data ${currentPatientData.treatmentBy}`);
    console.log(`apla id ${pdata._id}`);

    // dispatch(updatePost(currentId, postData));
    dispatch(updatePatientData(pdata._id, currentPatientData));
    // dispatch({
    //   type: "UPDATE",
    //   payload: currentPatientData,
    // });
    // updatePatientData(pdata._id, currentPatientData);

    setCurrentPatientData(pdata);

    setHfData("");
    setTmData("");

    setHf(pdata.historyAndFindings);
    setTm(pdata.treatmentAndMedicines);

    alert("Patient Information Updated Successfully");
    document.getElementById("myFormDoctor").reset();
  };

  if (pdata && loginInfo.isLoggedIn) {
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
        <div id="height__id" className="regestration__form">
          <form id="myFormDoctor" onSubmit={handleSubmit}>
            <div className="patientForm__body">
              <div className="patientForm__bodyLeft">
                <h1 className="register__h1">
                  <span>
                    <AssignmentIcon className="assignment__icon" />
                  </span>
                  &nbsp; Patient Information
                </h1>
                <div className="inputfield__container ">
                  <label className="input__label">Patient ID</label>
                  <input
                    className="input__box disabled__input"
                    type="text"
                    name="id"
                    disabled
                    value={currentPatientData.id}
                    // placeholder={uniqueIda}
                    onChange={(e) =>
                      setCurrentPatientData({
                        ...currentPatientData,
                        id: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="inputfield__container">
                  <label className="input__label">Name of Patient</label>
                  <input
                    className="input__box disabled__input"
                    type="text"
                    name="name"
                    disabled
                    value={currentPatientData.name}
                    onChange={(e) =>
                      setCurrentPatientData({
                        ...currentPatientData,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="inputfield__container">
                  <label className="input__label">Gender</label>
                  <input
                    className="input__box disabled__input"
                    type="text"
                    name="gender"
                    disabled
                    value={currentPatientData.gender}
                    onChange={(e) =>
                      setCurrentPatientData({
                        ...currentPatientData,
                        gender: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="inputfield__container">
                  <label className="input__label ">Age</label>
                  <input
                    className="input__box disabled__input"
                    type="text"
                    name="age"
                    disabled
                    value={currentPatientData.age}
                    onChange={(e) =>
                      setCurrentPatientData({
                        ...currentPatientData,
                        age: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="inputfield__container">
                  <label className="input__label">Mobile Number</label>
                  <input
                    className="input__box disabled__input"
                    type="text"
                    name="mobileNo"
                    disabled
                    value={currentPatientData.mobileNo}
                    onChange={(e) =>
                      setCurrentPatientData({
                        ...currentPatientData,
                        mobileNo: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="inputfield__container">
                  <label className="input__label">Patient Address</label>
                  <input
                    className="input__box disabled__input"
                    type="text"
                    name="address"
                    disabled
                    value={currentPatientData.address}
                    onChange={(e) =>
                      setCurrentPatientData({
                        ...currentPatientData,
                        address: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="inputfield__container">
                  <label className="input__label">Patient Email Id</label>
                  <input
                    className="input__box disabled__input"
                    type="text"
                    name="email"
                    disabled
                    value={currentPatientData.emailId}
                    onChange={(e) =>
                      setCurrentPatientData({
                        ...currentPatientData,
                        emailId: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="inputfield__container">
                  <label className="input__label">Treatment Needed For</label>
                  <input
                    className="input__box disabled__input"
                    type="text"
                    name="treatmentNeededFor"
                    disabled
                    value={currentPatientData.treatmentNeededFor}
                    onChange={(e) =>
                      setCurrentPatientData({
                        ...currentPatientData,
                        treatmentNeededFor: e.target.value,
                      })
                    }
                  />
                </div>
                {/* ================================================================================================ */}

                {/* PATIENT TYPE is CANCER is KIDNEY */}
                <h2>Special Attention Is Given For</h2>
                <div className="inputfield__container">
                  <label className="input__label">Kidney Treatment</label>
                  <input
                    className="input__box disabled__input"
                    type="text"
                    name="treatmentNeededFor"
                    disabled
                    value={currentPatientData.isKidneyPatient}
                    onChange={(e) =>
                      setCurrentPatientData({
                        ...currentPatientData,
                        isKidneyPatient: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="inputfield__container">
                  <label className="input__label">Cancer Treatment</label>
                  <input
                    className="input__box disabled__input"
                    type="text"
                    name="isCancerPatient"
                    disabled
                    value={currentPatientData.isCancerPatient}
                    onChange={(e) =>
                      setCurrentPatientData({
                        ...currentPatientData,
                        isCancerPatient: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="inputfield__container">
                  <label className="input__label">Palliative Care</label>
                  <input
                    className="input__box disabled__input"
                    type="text"
                    name="isPalliativeCareNeeded"
                    disabled
                    value={currentPatientData.isPalliativeCareNeeded}
                    onChange={(e) =>
                      setCurrentPatientData({
                        ...currentPatientData,
                        isPalliativeCareNeeded: e.target.value,
                      })
                    }
                  />
                </div>
                {/* PATIENT TYPE is CANCER is KIDNEY */}
                {/* ================================================================================================ */}

                {/* id: "", name: "", gender: "", age: "", mobileNo: "", address:
                "", emailId: "", height: "", weight: "", treatmentNeededFor: "",
                isKidneyPatient: 0, isCancerPatient: 0, isPalliativeCareNeeded:
                0, relativeName: "", relativeMobileNo: "", treatmentBy: "",
                historyAndFindings: [], patientType: "", treatmentAndMedicines:
                [], // relatedImage: "", diet: "", exercise: "", */}
              </div>

              {/* Doctor name */}
              <div className="patientForm__bodyRight">
                <div className="inputfield__container">
                  <label className="input__label">Relative Name</label>
                  <input
                    className="input__box disabled__input"
                    type="text"
                    name="relativeName"
                    disabled
                    value={currentPatientData.relativeName}
                    onChange={(e) =>
                      setCurrentPatientData({
                        ...currentPatientData,
                        relativeName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="inputfield__container">
                  <label className="input__label">Relative Mobile number</label>
                  <input
                    className="input__box disabled__input"
                    type="text"
                    name="relativeMobileNo"
                    disabled
                    value={currentPatientData.relativeMobileNo}
                    onChange={(e) =>
                      setCurrentPatientData({
                        ...currentPatientData,
                        relativeMobileNo: e.target.value,
                      })
                    }
                  />
                </div>

                <h1 className="register__h1">
                  <span>
                    <ImportExportIcon className="assignment__icon" />
                  </span>
                  &nbsp;Update Patient Information Here
                </h1>
                <div className="inputfield__container">
                  <label className="input__label">
                    Name of the Doctor who is giving treatement
                  </label>
                  <input
                    className="input__box"
                    type="text"
                    name="name"
                    value={currentPatientData.treatmentBy}
                    onChange={(e) =>
                      setCurrentPatientData({
                        ...currentPatientData,
                        treatmentBy: e.target.value,
                      })
                    }
                  />
                </div>

                {/* History and findings */}
                <div className="history__treatment">
                  <div className="inputfield__container forAdd__btn">
                    <label className="input__label">
                      Enter History And Findings
                    </label>
                    <input
                      className="input__box"
                      type="text"
                      name="hfarray"
                      value={hfData}
                      onChange={(e) => setHfData(e.target.value)}
                    />
                    {/* <button type="button" onClick={addHf}>
                    <span>
                      <Icon color="secondary">add_circle</Icon>
                    </span>
                  </button> */}
                    <AddIcon
                      fontSize="large"
                      className="icon"
                      onClick={addHf}
                    ></AddIcon>
                  </div>
                  <div className="list__container">
                    {Hf.map((element, index) => {
                      return (
                        <div className="listdisplay__delete">
                          <ListDisplay
                            element={element}
                            did={index}
                            onDelete={deleteHf}
                            length={Hf.length}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Treatment And Medicines */}
                <div className="history__treatment">
                  <div className="inputfield__container forAdd__btn">
                    <label className="input__label">
                      Treatment And Medicine
                    </label>
                    <input
                      className="input__box"
                      type="text"
                      name="tmarray"
                      value={tmData}
                      onChange={(e) => setTmData(e.target.value)}
                    />
                    <AddIcon
                      fontSize="large"
                      className="icon"
                      onClick={addTm}
                    ></AddIcon>
                  </div>
                  {/* <button type="button" onClick={addTm}>
                    Add to Treatment And Medicines
                  </button> */}

                  <div className="list__container">
                    {Tm.map((element, index) => {
                      return (
                        <div className="listdisplay__delete">
                          <ListDisplay
                            element={element}
                            did={index}
                            onDelete={deleteTm}
                            length={Tm.length}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="inputfield__container">
                  <label className="input__label">Height (in cm)</label>
                  <input
                    className="input__box"
                    type="text"
                    name="height"
                    value={currentPatientData.height}
                    onChange={(e) =>
                      setCurrentPatientData({
                        ...currentPatientData,
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
                    value={currentPatientData.weight}
                    onChange={(e) =>
                      setCurrentPatientData({
                        ...currentPatientData,
                        weight: e.target.value,
                      })
                    }
                  />
                </div>
                {/* PatientType */}

                <div className="inputfield__container control-group">
                  <label className="input__label">Select Patient Type</label>

                  <div className="inputField__PatientType">
                    <div className="inputField__patientType__container">
                      <label for="OPD" className="control control-radio">
                        <input
                          onClick={(e) =>
                            setCurrentPatientData({
                              ...currentPatientData,
                              patientType: e.target.value,
                            })
                          }
                          type="radio"
                          name="patientType"
                          value={
                            currentPatientData.patientType === "opd"
                              ? currentPatientData.patientType
                              : "opd"
                          }
                          id="OPD"
                          checked={currentPatientData.patientType === "opd"}
                        />
                        OPD
                        <div className="control_indicator"></div>
                      </label>
                    </div>
                    <div className="">
                      <label for="IPD" className="control control-radio">
                        <input
                          onClick={(e) =>
                            setCurrentPatientData({
                              ...currentPatientData,
                              patientType: e.target.value,
                            })
                          }
                          type="radio"
                          name="patientType"
                          value={
                            currentPatientData.patientType === "ipd"
                              ? currentPatientData.patientType
                              : "ipd"
                          }
                          checked={currentPatientData.patientType === "ipd"}
                          id="IPD"
                        />
                        IPD
                        <div className="control_indicator"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* relatedImage
          <div>
            <label>Patient Report Related Image</label>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setCurrentPatientData({ ...currentPatientData, relatedImage: base64 })
              }
            />
          </div> */}

                {/* diet */}
                <div className="inputfield__container">
                  <label className="input__label">Suggest a Diet</label>
                  <input
                    className="input__box"
                    type="text"
                    name="diet"
                    value={currentPatientData.diet}
                    onChange={(e) =>
                      setCurrentPatientData({
                        ...currentPatientData,
                        diet: e.target.value,
                      })
                    }
                  />
                </div>

                {/* exercise */}
                <div className="inputfield__container">
                  <label className="input__label">Suggest a Exercise</label>
                  <input
                    className="input__box"
                    type="text"
                    name="exercise"
                    value={currentPatientData.exercise}
                    onChange={(e) =>
                      setCurrentPatientData({
                        ...currentPatientData,
                        exercise: e.target.value,
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
                    Update
                  </Button>
                </div>
              </div>
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
        <h1>Login as Doctor to update</h1>
      </div>
    );
  }
}

export default FormDoctor;
