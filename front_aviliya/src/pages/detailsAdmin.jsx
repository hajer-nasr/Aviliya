import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import CardDet from "../components/cardDet";
import * as React from "react";
import { Grid } from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "../components/nav";
function DetailsAdm() {
  const { id } = useParams();
  const [hotel, setHotel] = useState([]);
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

  const onEdit = () => {
    localStorage.setItem("hotel.id", id);
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
            <Link style={NavStyle} to="/admin">
              <p className="flesh">
                <ArrowCircleLeftOutlinedIcon
                  style={{ fontSize: "45", paddingRight: 10 }}
                />
                Home
              </p>
            </Link>
          </Grid>

          <Grid item xs={4} md={5} lg={4} style={{ paddingTop: "2.5rem" }}>
            <h1 className="titreDet">Hotel Details</h1>
          </Grid>

          <Grid item xs={4} md={2} lg={2} style={{ paddingTop: 45 }}>
            <Link
              onClick={onEdit}
              style={NavStyle}
              to={{ pathname: `/admin/EditHotel/${id}` }}
            >
              <p className="flesh">
                Edit
                <ArrowCircleRightOutlinedIcon
                  style={{ fontSize: "45", color: "#98652A", paddingLeft: 10 }}
                />
              </p>
            </Link>
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

export default DetailsAdm;
