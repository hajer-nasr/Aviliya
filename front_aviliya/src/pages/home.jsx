/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
// eslint-disable-next-line no-unused-vars
import Carte from "../components/card";
import axios from "axios";
import { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../Aviliya.png";
import { useParams } from "react-router-dom";

function Home() {
  const [hotels, sethotels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterNb, setfilterNb] = useState("All");
  const FirstName = localStorage.getItem("user.name");
  const LastName = localStorage.getItem("user.lastName");
  const [logout, setlogout] = useState();
  const { idUser } = useParams();
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
                <a className="navbar-brand" href="/">
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
                    }}
                  >
                    {FirstName} {LastName}
                    {FirstName ? (
                      <LogoutIcon
                        onClick={onLogout}
                        style={{
                          paddingLeft: 15,
                          cursor: "pointer",
                          fontSize: "2.4rem",
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
            <Grid item md={3} xs={1} lg={4}></Grid>
            <Grid item xs={11} md={6} lg={4}>
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
                  <Carte
                    Image={hotel.Images}
                    idUser={idUser}
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

export default Home;
