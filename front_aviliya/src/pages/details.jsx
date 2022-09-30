/* eslint-disable no-unused-vars */
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import CardDet from "../components/cardDet";
import * as React from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "../components/nav";
import { Grid } from "@material-ui/core";

function Details() {
  let login = false;
  const { id } = useParams();
  const [hotel, setHotel] = useState([]);
  if (localStorage.getItem("user.name") !== null) {
    login = true;
  }

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

  const onRate = () => {
    if (!login) {
      alert("You must Sign In to be able to submit a review.");
    }
  };
  const NavStyle = {
    color: "#98652A",
    fontSize: 34,
    textDecoration: "none",
  };

  return (
    <div style={{ paddingTop: 30 }}>
      <NavBar />

      <div>
        <Grid container>
          <Grid item md={1} lg={2}></Grid>
          <Grid item xs={4} md={4} lg={3} style={{ paddingTop: 45 }}>
            <Link style={NavStyle} to="/home">
              <p className="flesh">
                <ArrowCircleLeftOutlinedIcon
                  style={{
                    fontSize: "40",
                    paddingRight: 10,
                  }}
                />
                Home
              </p>
            </Link>
          </Grid>
          <Grid item xs={4} md={5} lg={4} style={{ paddingTop: "2.5rem" }}>
            <h1 className="titreDet">Hotel Details</h1>
          </Grid>
          <Grid item xs={4} md={2} lg={2} style={{ paddingTop: 45 }}>
            {login ? (
              <Link
                onClick={onRate}
                style={NavStyle}
                to={{ pathname: `/Rating/${id}` }}
              >
                <p className="flesh">
                  Rate
                  <ArrowCircleRightOutlinedIcon
                    style={{
                      fontSize: "45",
                      paddingLeft: 10,
                    }}
                  />
                </p>
              </Link>
            ) : (
              <Link onClick={onRate} style={NavStyle} to="/Login">
                <p className="flesh">
                  Rate
                  <ArrowCircleRightOutlinedIcon
                    style={{
                      fontSize: 40,
                      color: "#98652A",
                      paddingLeft: 10,
                    }}
                  />
                </p>
              </Link>
            )}
          </Grid>
        </Grid>
        <CardDet
          lat={hotel.Latitude}
          lng={hotel.Longitude}
          Image={hotel.Images}
          stars={hotel.Stars}
          title={hotel.Name}
          location={hotel.Localisation}
          desc={hotel.Description}
        />
      </div>
    </div>
  );
}

export default Details;
