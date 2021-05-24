import React, { useState } from "react";

import "./Header.css";
import logoImage from "../../images/logo.png";

import Button from "@material-ui/core/Button";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SearchIcon from "@material-ui/icons/Search";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { useDispatch, useSelector } from "react-redux";

import { useHistory } from "react-router-dom";

function Header(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const loginInfo = useSelector((state) => state.loginInfo);

  //--menu===//
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //=====menu---//

  const [searchId, setSearchId] = useState("");

  const handleSearchClick = () => {
    props.handleSearch(searchId);

    dispatch({
      type: "UPDATE_ID",
      payload: {
        isLoggedIn: loginInfo.isLoggedIn,
        accountType: loginInfo.accountType,
        userName: loginInfo.userName,
        displayId: searchId,
      },
    });
  };

  return (
    <div className="header">
      <div className="header__logo">
        <img
          src={logoImage}
          className="logoImage"
          onClick={() => history.push("/")}
        />
      </div>
      <div className="header__right">
        <div className="header__searchBar">
          <div className="searchIcon">
            <SearchIcon />
          </div>

          <input
            type="text"
            placeholder="Enter your Patient ID given at the time of registration"
            name="searchId"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="searchBar__input"
          ></input>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={handleSearchClick}
            className="searchBar__button"
          >
            SEARCH
            {/* <FavoriteIcon /> */}
          </Button>
        </div>
        <div className="header__links">
          <div className="linkItem" onClick={() => history.push("/")}>
            Home
          </div>
          <div className="linkItem" onClick={() => history.push("/about")}>
            About
          </div>
          <div className="linkItem">
            <AccountCircleIcon />
            {"  "}
            {loginInfo.isLoggedIn ? (
              <div
                onClick={() => {
                  if (loginInfo.accountType === "DOCTOR") {
                    history.push("/display");
                  } else {
                    history.push("/registerPatientForm");
                  }
                }}
              >
                &nbsp;{loginInfo.userName}
              </div>
            ) : (
              <div>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  LOGIN
                </Button>

                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    {" "}
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => history.push("/doctorLogin")}
                    >
                      DOCTOR'S LOGIN
                    </Button>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => history.push("/login")}
                    >
                      RECEPTION LOGIN
                    </Button>
                  </MenuItem>
                </Menu>
              </div>
            )}
          </div>
          <div className="linkItem">
            {loginInfo.isLoggedIn ? (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() =>
                  dispatch({
                    type: "UPDATE_LOGIN",
                    payload: {
                      ...loginInfo,
                      isLoggedIn: "",
                      accountType: "",
                      userName: "",
                    },
                  })
                }
              >
                Logout
              </Button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
