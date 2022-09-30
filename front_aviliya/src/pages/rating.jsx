/* eslint-disable no-unused-vars */
import * as React from "react";
import { useParams } from "react-router-dom";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import RatingForm from "../components/ratingForm";
import axios from "axios";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import BeenhereOutlinedIcon from "@mui/icons-material/BeenhereOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import NavBar from "../components/nav";
import { useState, useEffect } from "react";
import { makeStyles, Grid } from "@material-ui/core";
import { Card } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import LockIcon from "@mui/icons-material/Lock";
import Try from "./jareb";
function RateJust() {
  //  const idUser = localStorage.getItem("user.id");
  const { id } = useParams();
  const { control, handleSubmit } = useForm();
  const [piece, setPiece] = useState(false);
  const [value, setValue] = useState("");
  const [hotel, setHotel] = useState([]);
  const [fileName, setfileName] = useState("");

  const [label, setlabel] = useState("Upload A Justificatif To Continue");
  useEffect(() => {
    const getHotel = async (id) => {
      try {
        const response = await axios.get("http://localhost:3001/hotel/" + id);
        if (response.status === 200) {
          await setHotel(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getHotel(id);
  }, [id]);
  //console.log(piece);
  const handleChange = (event) => {
    console.log(event.target.files[0].name);
    setfileName(event.target.files[0].name);
    setPiece(true);
    setlabel("Your stay is justified");

    setValue(event.target.files[0].name);
  };
  const useStyles = makeStyles(() => ({
    container: {
      // border: "01px solid purple",
      // padding: "10px",
    },
    item: {
      // padding: "10px",
      // border: "0.1px solid  green",
    },
  }));
  const classes = useStyles();

  // const onSubmit = async (data) => {
  //   const res = await axios.post(
  //     ("http://localhost:3001/review/", +idUser + idHotel, data)
  //       .then((response) => {
  //         if (response.status === 200) {
  //           console.log("Review added");
  //           setPiece(true);
  //         }
  //       })
  //       .catch((error) => {
  //         if (error.response) {
  //           console.log("error.response");
  //         } else if (error.request) {
  //           console.log(error.request);
  //         } else if (error.message) {
  //           console.log(error.message);
  //         }
  //       })
  //   );
  // };
  const NavStyle = {
    color: "#98652A",
    fontSize: 34,
    textDecoration: "none",
  };
  return (
    <div style={{ paddingTop: 20 }}>
      <NavBar />
      <Grid container className={classes.container}>
        <Grid item className={classes.item} md={1} lg={2}></Grid>
        <Grid
          item
          className={classes.item}
          xs={4}
          md={4}
          lg={3}
          style={{ paddingTop: "4rem" }}
        >
          <Link style={NavStyle} to="/">
            <p className="flesh">
              <ArrowCircleLeftOutlinedIcon
                style={{ fontSize: "2.5rem", paddingRight: 10 }}
              />
              Home
            </p>
          </Link>
        </Grid>

        <Grid
          item
          className={classes.item}
          xs={7}
          md={5}
          lg={3}
          style={{ paddingTop: "3.5rem" }}
        >
          <h1
            style={{
              color: "#98652A",
              fontSize: 33,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {hotel.Name}
          </h1>
          <h3
            style={{
              color: "#919191",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            Rating Survay
          </h3>
        </Grid>
      </Grid>
      <Grid container className={classes.container}>
        <Grid item className={classes.item} md={1} lg={1}></Grid>
        <Grid
          style={{ paddingTop: "1%" }}
          className={classes.item}
          item
          md={8}
          lg={10}
          xs={12}
        >
          <div className="box1" style={{ paddingBottom: "2%" }}>
            <Card sx={{ maxWidth: 1500, boxShadow: 6, minHeight: 80 }}>
              <Grid container className={classes.container}>
                <Grid
                  style={{
                    paddingLeft: 30,
                    paddingTop: 20,
                    paddingBottom: 15,
                    fontSize: 24,
                    color: "#98652A",
                    fontWeight: "bold",
                  }}
                  item
                  xs={12}
                  lg={5}
                  md={5}
                  sm={5}
                  className={classes.item}
                >
                  {label}
                </Grid>
                <Grid
                  style={{
                    paddingLeft: 30,
                    paddingTop: 20,
                    paddingBottom: 15,
                    fontSize: 24,
                    color: "#a4a2a2",
                    fontWeight: "bold",
                  }}
                  item
                  xs={10}
                  lg={5}
                  md={5}
                  sm={5}
                  className={classes.item}
                >
                  {fileName}
                </Grid>
                <Grid
                  style={{
                    // paddingLeft: 180,
                    paddingTop: 20,
                    paddingBottom: 15,
                  }}
                  item
                  lg={2}
                  xs={3}
                  sm={2}
                  className={classes.item}
                >
                  <div className="image-upload" style={{ paddingLeft: 30 }}>
                    <label htmlFor="file-input">
                      {piece ? (
                        <BeenhereOutlinedIcon
                          style={{ color: "#98652A", fontSize: 45 }}
                        ></BeenhereOutlinedIcon>
                      ) : (
                        <CloudUploadOutlinedIcon
                          style={{ color: "#98652A", fontSize: 50 }}
                        />
                      )}
                    </label>
                    <input
                      id="file-input"
                      type="file"
                      disabled={piece}
                      onChange={handleChange}
                      accept=".pdf"
                    />
                  </div>
                </Grid>
              </Grid>
            </Card>
          </div>
          {piece ? (
            <RatingForm
              piece={value}
              name={hotel.Name}
              location={hotel.Localisation}
            />
          ) : (
            <div>
              <div className="box2" style={{ paddingBottom: 70 }}>
                <Card
                  sx={{
                    maxWidth: 1500,
                    boxShadow: 2,
                    backgroundColor: "#F6CD9C",
                  }}
                >
                  <Grid container className={classes.container}>
                    <Grid item className={classes.item} xs={3}></Grid>
                    <Grid
                      style={{ textAlign: "center" }}
                      item
                      className={classes.item}
                      xs={12}
                    >
                      <LockIcon
                        style={{
                          color: "#9F6F38",
                          fontSize: "350",
                          paddingTop: 40,
                        }}
                      />
                      <h1
                        style={{
                          paddingBottom: 50,
                          paddingTop: 10,
                          fontSize: 32,
                          color: "#98652A",
                        }}
                      >
                        The Form Will remain Locked Until You Confirm Your Stay
                      </h1>
                    </Grid>
                    <Grid item className={classes.item} xs={4}></Grid>
                  </Grid>
                </Card>
              </div>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default RateJust;
