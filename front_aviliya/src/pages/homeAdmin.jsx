/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
// eslint-disable-next-line no-unused-vars
import CarteAdmin from "../components/cardAdmin";

import axios from "axios";
import { useState, useEffect } from "react";
import { makeStyles, Grid } from "@material-ui/core";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../Aviliya.png";
import { useParams } from "react-router-dom";
import { borderBottom } from "@mui/system";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function HomeAdmin() {
  const [hotels, sethotels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterNb, setfilterNb] = useState("All");

  const FirstName = localStorage.getItem("user.name");
  const LastName = localStorage.getItem("user.lastName");
  const [logout, setlogout] = useState();
  console.log(filterNb);
  const onLogout = () => {
    localStorage.clear();
    setlogout(true);
  };

  useEffect(() => {
    const getHotels = async () => {
      try {
        const response = await axios.get("http://localhost:3001/hotel/");

        if (response.status === 200) {
          await sethotels(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getHotels();
  }, []);

  return (
    <div style={{ paddingTop: "6.5rem", paddingLeft: 100 }}>
      <div>
        <nav className="navbar fixed-top ">
          <div className="container-fluid">
            <Grid container>
              <Grid item xs={4}>
                <a className="navbar-brand" href="/admin">
                  <img src={logo} alt="logo" width="70" height="50"></img>
                </a>
              </Grid>
              <Grid item xs={6}>
                <div className="search">
                  <form>
                    <input
                      className="form-control me-2 mainLoginInput"
                      type="search"
                      color="blue"
                      placeholder="&#xf002;     Search Hotel ..."
                      aria-label="Search"
                      onChange={(event) => {
                        setSearchTerm(event.target.value);
                      }}
                    ></input>
                  </form>
                </div>
              </Grid>
              <Grid item xs={2}>
                <div>
                  <h4
                    className="ka"
                    style={{
                      color: "white",
                      // fontFamily: "sans-serif",
                    }}
                  >
                    {FirstName} {LastName}
                    {FirstName ? (
                      <LogoutIcon
                        onClick={onLogout}
                        style={{
                          paddingLeft: 15,
                          cursor: "pointer",
                          fontSize: "2.3rem",
                        }}
                      />
                    ) : (
                      <a
                        className="ka"
                        href="/Login"
                        style={{
                          color: "white",
                          textDecoration: "none",
                        }}
                      >
                        Login
                      </a>
                    )}
                  </h4>
                </div>
              </Grid>
            </Grid>
          </div>

          <Grid container>
            <Grid item md={3} lg={4}></Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Grid container>
                <Grid item xs={2}>
                  <button
                    onClick={() => {
                      setfilterNb("All");
                    }}
                    className="button-solid filterStars"
                  >
                    All
                  </button>
                </Grid>
                <Grid item xs={2}>
                  <button
                    onClick={() => {
                      setfilterNb("5");
                    }}
                    className="button-solid filterStars"
                  >
                    5 Stars
                  </button>
                </Grid>
                <Grid item xs={2}>
                  <button
                    onClick={() => {
                      setfilterNb("4");
                    }}
                    className="button-solid filterStars"
                  >
                    4 Stars
                  </button>
                </Grid>
                <Grid item xs={2}>
                  <button
                    onClick={() => {
                      setfilterNb("3");
                    }}
                    className="button-solid filterStars"
                  >
                    3 Stars
                  </button>
                </Grid>
                <Grid item xs={2}>
                  <button
                    onClick={() => {
                      setfilterNb("2");
                    }}
                    className="button-solid filterStars"
                  >
                    Bad
                  </button>
                </Grid>
                <Grid item xs={2}>
                  <button
                    onClick={() => {
                      setfilterNb("1");
                    }}
                    className="button-solid filterStars"
                  >
                    Terrible
                  </button>
                </Grid>
              </Grid>
            </Grid>

            <Grid item md={4} lg={4}></Grid>
          </Grid>
        </nav>
      </div>

      <Grid container>
        <Grid item xs={6} md={8} lg={10}>
          <h1 style={{ fontSize: 27, color: "#98652A" }}>All Hotels</h1>
        </Grid>

        <Grid item xs={6} sm={6} md={4} lg={2}>
          <Link style={{ textDecoration: "none" }} to="/admin/NewHotel">
            <Button
              style={{
                backgroundColor: "rgba(253, 177, 89, 1)",
                width: "90%",
                borderRadius: 15,
                color: "white",
                textTransform: "initial",
                height: 45,
                textAlign: "center",
              }}
            >
              <div
                className="addNewHotelBtn"
                style={{
                  paddingLeft: 20,
                }}
              >
                Add New Hotel
              </div>
              <div
                className="addNewHotelBtn"
                style={{
                  paddingLeft: "20%",
                }}
              >
                +
              </div>
            </Button>
          </Link>
        </Grid>
      </Grid>

      <div>
        <Grid container>
          {hotels
            .filter((hotel) => {
              if (searchTerm === "" && hotel.Stars === filterNb) {
                return hotel;
              } else if (searchTerm === "" && filterNb === "All") {
                return hotel;
              } else if (
                hotel.Name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                filterNb === "All"
              ) {
                return hotel;
              } else if (
                hotel.Name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                hotel.Stars === filterNb
              ) {
                return hotel;
              }
            })
            .map((hotel) => {
              return (
                <Grid
                  key={hotel._id}
                  item
                  xs={12}
                  md={4}
                  lg={3}
                  sm={6}
                  style={{ paddingTop: 40 }}
                >
                  <CarteAdmin
                    Image={hotel.Images}
                    id={hotel._id}
                    title={hotel.Name}
                    location={hotel.Localisation}
                  />
                </Grid>
              );
            })}
        </Grid>
      </div>
    </div>
  );
}

export default HomeAdmin;
