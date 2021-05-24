import React, { useEffect, useState } from "react";
import "./DisplayPatientInfo.css";
// import axios from "axios";
import { Link, useHistory } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import firebase, { auth } from "../firebase/firebase";

import { Button } from "@material-ui/core";
import Popover from "@material-ui/core/Popover";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Header from "../Header/Header";
import PatientInfo from "../PatientInfo/PatientInfo";

import PatientList from "../../miniComponents/PatientList/PatientList";
import Filters from "../../miniComponents/Filters/Filters";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

function DisplayPatientInfo({ handleLogout }) {
  const history = useHistory();
  // const dispatch = useDispatch();

  const patientsData = useSelector((state) => state.patientsData);

  const loginInfo = useSelector((state) => state.loginInfo);

  // console.log(`this is login info ${loginInfo} ${loginInfo.accountType}`);

  console.log(patientsData);

  ///======FOR FILTERING============//

  const [filterPatients, setFilterPatiens] = useState(patientsData);

  const setFilterData = (updatedPatientsData) => {
    setFilterPatiens(updatedPatientsData);
  };

  ////---------------pop code ---------------------------------//

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  //======================================================================//

  const handleLogOut = () => {
    firebase.auth().signOut();
    history.push("/");
  };

  const [displayId, setDisplayId] = useState("");

  const handleSearch = (searchId) => {
    console.log(`this is dis ${searchId}`);
    setDisplayId(searchId);
    // dispatch({
    //   type: "UPDATE_ID",
    //   payload: {
    //     isLoggedIn: loginInfo.isLoggedIn,
    //     accountType: loginInfo.accountType,
    //     userName: loginInfo.userName,
    //     displayId: searchId,
    //   },
    // });
  };

  const DisplaySearchData = () => {
    console.log(patientsData);
    const pdata = patientsData.find((element) => element.id == displayId);
    console.log(`pall ll ${pdata}`);
    if (pdata) {
      return (
        <div>
          <Header handleSearch={handleSearch} />
          <PatientList pdata={pdata} number={1} />
        </div>
      );
    } else {
      return (
        <div>
          <Header handleSearch={handleSearch} />
          <h1>PATIENT NOT FOUND</h1>
        </div>
      );
    }
  };

  if (loginInfo.isLoggedIn) {
    if (!displayId) {
      return (
        <div className="displayPatientInfo">
          <Header handleSearch={handleSearch} />
          {/* {patientsData.map((pdata) => {
            return (
              <div>
                <li>{pdata.name}</li>
                <li>{pdata.id}</li>
              </div>
            );
          })} */}
          <div className="filterHeader">
            <div className="filterTitle">
              <Button
                aria-describedby={id}
                variant="contained"
                color="primary"
                onClick={handleClick}
              >
                FILTERS
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <Typography className={classes.typography}>
                  <Filters setFilterData={setFilterData} />
                </Typography>
              </Popover>
            </div>
          </div>

          {filterPatients.map((pdata, index) => {
            return (
              <div>
                <PatientList pdata={pdata} number={index + 1} />
              </div>
            );
          })}

          {/* <button onClick={handleLogOut}>logout</button> */}
          {/* {patientsData.map((pdatas) => {
          return pdatas.map((pdata) => {
            return <li>{pdata.name}</li>;
          });
        })} */}
        </div>
      );
    } else {
      return (
        <div>
          <DisplaySearchData />
        </div>
      );
    }
  } else {
    return (
      <div>
        <Header handleSearch={() => history.push("/patientInfo")} />

        <h1>Please login first to view Data</h1>
      </div>
    );
  }
}

export default DisplayPatientInfo;

{
  /* {patientsData.map((pdata) => {
          if (pdata.id === displayId) {
            return (
              <div>
                <li>h</li>
                <li>{pdata.name}</li>
                <li>{pdata.gender}</li>
              </div>
            );
          } else {
            return "hello";
          }
        })} */
}

// const [patientsData, setPatientsData] = useState([
//   {
//     id: "",
//     name: "",
//     address: "",
//     age: "",
//     isKidneyPatient: 0,
//     isCancerPatient: 0,
//     isPalliativeCareNeeded: 0,
//     historyAndFindings: [],
//   },
// ]);

// useEffect(() => {
//   axios.get("http://localhost:5000/patientsData").then((response) => {
//     setPatientsData(response.data);
//   });
// }, []);

// console.log(`THISSS ${patientsData}`);

//   let pdata = [];

//   axios.get("http://localhost:5000/patientsData").then(
//     (response) => {
//       console.log(response);
//       pdata = response.data;
//     },
//     (error) => {
//       console.log(error);
//     }
//   );
