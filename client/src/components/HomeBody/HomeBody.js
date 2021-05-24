import React from "react";
import "./HomeBody.css";
import healthCheck from "../../images/healthCheck.png";

import Header from "../Header/Header";

import Button from "@material-ui/core/Button";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import { Link } from "react-router-dom";

import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function HomeBody() {
  const history = useHistory();

  const handleSearch = () => {
    history.push("/patientInfo");
  };

  const loginInfo = useSelector((state) => state.loginInfo);

  return (
    <div className="homeBody">
      <Header handleSearch={handleSearch} />
      <div className="hb__Upper">
        <div className="hb__left">
          <div className="upHeadings">
            <div className="upText">
              <h1>Community Healthcare Network</h1>
              <p>
                Our profession is the only one which works
                <br />
                unceasingly to annihilate itself.
              </p>
            </div>
          </div>

          <div className="hb__Lower">
            <div className="loButtons">
              {/* <Link to="/doctorLogin"> */}
              {/* <div className="loButton"> */}
              <Button
                variant="contained"
                color="primary"
                className="loButton"
                onClick={() => {
                  if (
                    loginInfo.isLoggedIn &&
                    loginInfo.accountType === "DOCTOR"
                  ) {
                    history.push("/display");
                  } else {
                    history.push("/doctorLogin");
                  }
                }}
              >
                DOCTOR'S LOGIN <DoubleArrowIcon />
              </Button>
              {/* </div> */}
              {/* </Link> */}

              {/* <Link to="/login"> */}
              {/* <div className="loButton"> */}
              <Button
                variant="contained"
                color="primary"
                className="loButton"
                onClick={() => {
                  if (
                    loginInfo.isLoggedIn &&
                    loginInfo.accountType === "AUTHPERSON"
                  ) {
                    history.push("/registerPatientForm");
                  } else {
                    history.push("/login");
                  }
                }}
              >
                RECEPTION LOGIN
                <DoubleArrowIcon />
              </Button>
              {/* </div> */}
              {/* </Link> */}
            </div>
          </div>
        </div>
        <div className="hb__right">
          <img src={healthCheck} />
        </div>
      </div>
    </div>
  );
}

export default HomeBody;
