import React, { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";
import firebase, { auth } from "../firebase/firebase";
import logoImg from "../../images/logo.png";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useDispatch } from "react-redux";
import Header from "../Header/Header";

import validator from "validator";

function DoctorLogin() {
  const history = useHistory();
  const dispatch = useDispatch();

  const doctorSecretCode = "4444";

  const [activeUser, setActiveUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(true);

  const [isStrongPassword, setIsStrongPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [secretCode, setSecretCode] = useState("");

  // const loginData = axios.get("http://localhost:5000/patientsData/loginData");
  // console.log(`login data ${loginData}`);

  const [loginInfo, setLoginInfo] = useState({
    isLoggedIn: "",
    accountType: "",
    userName: "",
  });

  const [loginData, setLoginData] = useState([
    {
      docUsername: "",
      authPersonUsername: "",
    },
  ]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/patientsData/loginData")
      .then((response) => {
        setLoginData(response.data);
      });
    // console.log(`loginData ${loginData}`);
  }, []);

  console.log(`loginData ${loginData}`);

  const clearInput = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const validate = (value) => {
    setPassword(value);
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErrorMessage("Your Password is now strong. Ready to battle Diseases");
      setIsStrongPassword(true);
    } else {
      setErrorMessage(
        `Set a Strong Password to create Account minLength: 8, minLowercase: 1,minUppercase: 1, minNumbers: 1,minSymbols 1.`
      );
      setIsStrongPassword(false);
    }
  };

  let found = false;
  const handleLogin = (e) => {
    e.preventDefault();
    // clearErrors();

    loginData.map((ldata) => {
      if (ldata.docUsername === email) {
        found = true;
      }
      return "";
    });

    if (found === true) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((auth) => {
          pushFunction(email);
        })
        .catch((err) => {
          switch (err.code) {
            case "auth/invalid-email":
            case "auth/user-disabled":
            case "auth/user-not-found":
              setEmailError(err.message);
              break;

            case "auth/wrong-password":
              setPasswordError(err.message);
              break;
          }
        });
    } else {
      alert("Invalid Email");
    }
  };

  const pushFunction = (email) => {
    console.log(`loginInfo from login screen ${email}`);

    dispatch({
      type: "UPDATE_LOGIN",
      payload: { isLoggedIn: "true", accountType: "DOCTOR", userName: email },
    });

    history.push("/display");
  };

  //CREATING DOCTOR ACCOUNT IN SYSTEM
  const handleSignUp = () => {
    clearErrors();

    if (secretCode === doctorSecretCode) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((auth) => {
          // it successfully created a new user with email and password
          if (auth) {
            axios.post("http://localhost:5000/patientsData/loginData", {
              docUsername: email,
              authPersonUsername: "",
            });
            alert(`Dr. ${email} Your Account has been created Successfully `);
            history.push("/doctorLogin");
          }
        })
        .catch((err) => {
          switch (err.code) {
            case "auth/email-already-in-use":
            case "auth/invalid-email":
              setEmailError(err.message);
              break;

            case "auth/weak-password":
              setPasswordError(err.message);
              break;
          }
        });
      clearInput();
    } else {
      alert("Secret Code Doesn't Match. Please Contact Your Higher Authority");
    }
  };

  const authListner = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setLoginInfo({
          ...loginInfo,
          isLoggedIn: "true",
          accountType: "doctor",
          userName: email,
        });
        clearInput();
        setActiveUser(user);
      } else {
        dispatch({
          type: "UPDATE_LOGIN",
          payload: {
            ...loginInfo,
            isLoggedIn: false,
            accountType: "",
            userName: "",
          },
        });
        setActiveUser("");
      }
    });
  };

  useEffect(() => {
    authListner();
  }, []);

  return (
    <div className="login__component">
      <Header handleSearch={() => history.push("/patientInfo")} />
      <div className="login__body">
        <h1>Doctor Login</h1>
        <div className="login__formComponent">
          <form>
            <div>
              <lable>Username</lable>

              <input
                className="loginform__input"
                type="text"
                autoFocus
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p>{emailError}</p>
            </div>

            <div>
              <lable>Password</lable>

              <input
                className="loginform__input"
                type="password"
                required
                value={password}
                onChange={(e) => validate(e.target.value)}
              />
              <br />
              {hasAccount ? (
                <div></div>
              ) : (
                <span
                  style={{
                    color: "red",
                  }}
                >
                  {errorMessage}
                </span>
              )}
              <p>{passwordError}</p>
            </div>

            {/* <div> */}
            {hasAccount ? (
              <div>
                <Button
                  className="btn__login"
                  variant="contained"
                  color="primary"
                  onClick={handleLogin}
                >
                  Sign in
                </Button>
                <p>
                  Don't have an account ?{" "}
                  <Button
                    variant="contained"
                    onClick={() => setHasAccount(false)}
                  >
                    Create an Account
                  </Button>
                </p>
              </div>
            ) : (
              <div>
                <div>
                  <lable>Secret code</lable>

                  <input
                    className="loginform_input secret_code"
                    type="password"
                    name="secretCode"
                    value={secretCode}
                    onChange={(e) => setSecretCode(e.target.value)}
                  />
                </div>
                <br />
                <Button
                  className="btn__login"
                  variant="contained"
                  color="primary"
                  onClick={handleSignUp}
                  disabled={!isStrongPassword}
                >
                  Create an Account
                </Button>
                <p>
                  have an Account ?{" "}
                  <Button
                    variant="contained"
                    onClick={() => setHasAccount(true)}
                  >
                    Sign in
                  </Button>
                </p>
              </div>
            )}
            {/* </div> */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default DoctorLogin;
