import React, { useEffect } from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Header from "./components/Header/Header";
import Form from "./components/Form/Form";
import FormDoctor from "./components/FormDoctor/FormDoctor";
import DisplayPatientInfo from "./components/DisplayPatientInfo/DisplayPatientInfo";

import DoctorLogin from "./components/doctorLogin/DoctorLogin";

import { getPatientsData } from "./actions/patientsData";

import { useDispatch } from "react-redux";

import Login from "./components/Login/Login";
import HomeBody from "./components/HomeBody/HomeBody";
import PatientInfo from "./components/PatientInfo/PatientInfo";
import About from "./components/About/About";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPatientsData());
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        <Route path="/doctorForm">
          <div>
            <FormDoctor />
          </div>
        </Route>
        <Route path="/registerPatientForm">
          <Form />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/doctorLogin">
          <DoctorLogin />
        </Route>
        <Route path="/display">
          <DisplayPatientInfo />
        </Route>
        <Route path="/patientInfo">
          <PatientInfo />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <HomeBody />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
