/* eslint-disable no-unused-vars */
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../Aviliya.png";
import { useState } from "react";
import { makeStyles, Grid } from "@material-ui/core";

function NavBar(props) {
  const FirstName = localStorage.getItem("user.name");
  const LastName = localStorage.getItem("user.lastName");
  const [logout, setlogout] = useState();

  const onLogout = () => {
    localStorage.clear();
    setlogout(true);
  };

  return (
    <div>
      <nav className="navbar fixed-top ">
        <div className="container-fluid">
          <Grid container>
            <Grid item xs={4}>
              <a className="navbar-brand" href="/">
                <img src={logo} alt="logo" width="80" height="64"></img>
              </a>
            </Grid>
            <Grid item xs={6}>
              <div className="search">
                <form className=" d-flex">
                  <input
                    className="form-control me-2 mainLoginInput"
                    type="search"
                    color="blue"
                    placeholder="&#xf002;     Search Hotel ..."
                    aria-label="Search"
                  ></input>
                </form>
              </div>
            </Grid>
            <Grid item xs={2}>
              <div className="navbar-right myAccount">
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
                        fontSize: 40,
                        cursor: "pointer",
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
      </nav>
    </div>
  );
}

export default NavBar;
