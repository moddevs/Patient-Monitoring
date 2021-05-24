import React, { useEffect, useState } from "react";
import "./Login.css";
import { useHistory } from "react-router-dom";
import firebase, { auth } from "../firebase/firebase";
// import DisplayPatientInfo from "../DisplayPatientInfo/DisplayPatientInfo";
import logoImg from "../../images/logo.png";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useDispatch } from "react-redux";

import validator from "validator";

import Header from "../../components/Header/Header";

function Login() {
  const history = useHistory();
  const dispatch = useDispatch();

  const authPersonSecretCode = "55555";

  const [activeUser, setActiveUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(true);

  const [isStrongPassword, setIsStrongPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [secretCode, setSecretCode] = useState("");

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
      setIsStrongPassword(true);
      setErrorMessage("Your Password is now strong. Ready to battle Diseases");
    } else {
      setErrorMessage(
        `Set a Strong Password to create Account minLength: 8, minLowercase: 1,minUppercase: 1, minNumbers: 1,minSymbols 1.`
      );
      setIsStrongPassword(false);
    }
  };

  let found = false;

  //////---------HANDLE LOGIN ----------------------------------------------////////////////////////
  const handleLogin = (e) => {
    e.preventDefault();
    // clearErrors();

    loginData.map((ldata) => {
      if (ldata.authPersonUsername === email) {
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
      payload: {
        isLoggedIn: "true",
        accountType: "AUTHPERSON",
        userName: email,
      },
    });

    history.push("/registerPatientForm");
  };

  //CREATING AUTHINTICATED PERSON ACCOUNT IN SYSTEM
  const handleSignUp = () => {
    clearErrors();
    setHasAccount(true);

    if (secretCode === authPersonSecretCode) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((auth) => {
          // it successfully created a new user with email and password
          if (auth) {
            axios.post("http://localhost:5000/patientsData/loginData", {
              docUsername: "",
              authPersonUsername: email,
            });
            alert("Account Created Successfully...");
            history.push("/login");
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
      {/* <div className="login__header">
        <img className="hospital__logo" src={logoImg} alt="logo" />
        <h1>Community Healthcare Network</h1>
      </div> */}
      <Header handleSearch={() => history.push("/patientInfo")} />

      {/* <DisplayPatientInfo handleLogout={handleLogout}/> */}
      <div className="login__body">
        <h1>Reception Login</h1>
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

            <div>
              {hasAccount ? (
                <>
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
                </>
              ) : (
                <>
                  <lable>Secret Code</lable>
                  <input
                    className="loginform_input secret_code"
                    type="password"
                    name="secretCode"
                    value={secretCode}
                    onChange={(e) => setSecretCode(e.target.value)}
                  />
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
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
