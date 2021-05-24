import React from "react";
import "./PatientList.css";

import { Button } from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";

import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
  },
}));

function PatientList({ pdata, number }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loginInfo = useSelector((state) => state.loginInfo);

  const history = useHistory();

  const handleViewMore = () => {
    dispatch({
      type: "UPDATE_LOGIN",
      payload: { ...loginInfo, displayId: pdata.id },
    });

    history.push("/patientInfo");
  };

  return (
    <div className="pList__top">
      {number == 1 ? (
        <div className={classes.root}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <div className="plist__headings">
                <p>Sr.No</p>
                <p>Patient ID</p>
                <p>Patient Name</p>
                <p>Gender</p>
                <p>Age</p>
                <p>Mobile No</p>
                <p>Treatment for</p>
              </div>
            </Paper>
          </Grid>
        </div>
      ) : (
        <div></div>
      )}
      <div className="plist__bottom">
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <div className="plist__data">
              <p>{number}</p>
              <p>{pdata.id}</p>
              <p>{pdata.name}</p>
              <p>{pdata.gender}</p>
              <p>{pdata.age}</p>
              <p>{pdata.mobileNo}</p>
              <p>{pdata.treatmentNeededFor}</p>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleViewMore}
              >
                View More
              </Button>
            </div>
          </Paper>
        </Grid>
      </div>
    </div>
  );
}

export default PatientList;
