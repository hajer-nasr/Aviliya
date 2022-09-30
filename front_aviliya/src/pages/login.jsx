/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import React from "react";
import { Box } from "rebass";
import reg from "../register.png";
import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";
import { Button } from "@mui/material";
import Input from "../components/enter";
import Checkbox from "@mui/material/Checkbox";
import { useState, createContext, useContext } from "react";
import axios from "axios";
import { Navigate } from "react-router";
import Alert from "@mui/material/Alert";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import { Controller, useForm } from "react-hook-form";
import { green, yellow } from "@mui/material/colors";
import FacebookIcon from "@mui/icons-material/Facebook";
import FacebookLogin from "react-facebook-login";
import { FcGoogle } from "react-icons/fc";
import GoogleLogin from "react-google-login";
import { Grid } from "@material-ui/core";

export var LoginContext = createContext("");

function Login() {
  const { control, handleSubmit } = useForm();
  const [admin, setAdmin] = useState(false);
  const [success, setSuccess] = useState(false);
  const [notFd, setNotFd] = useState(false);
  const [wrong, setWrong] = useState(false);

  const [clicked, setClicked] = useState(false);
  const [values, setValues] = useState({
    pwd: "",
    showPassword: false,
  });

  const FacebookCallback = (response) => {
    console.log("Get Profile Success!");
    setSuccess(true);
    localStorage.setItem("user.id", response.id);
    localStorage.setItem("user.name", response.name.split(" ")[0]);
    localStorage.setItem("user.lastName", response.name.split(" ")[1]);
    localStorage.setItem("token", response.accessToken);
  };
  const responseGoogle = (response) => {
    console.log("Get Profile Success!");
    setSuccess(true);
    localStorage.setItem("user.id", response.profileObj.googleId);
    localStorage.setItem("user.name", response.profileObj.givenName);
    localStorage.setItem("user.lastName", response.profileObj.familyName);
    localStorage.setItem("token", response.tokenId);
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
    setClicked(!clicked);
  };
  const onSubmit = async (data) => {
    setWrong(false);
    setNotFd(false);
    const res = await axios
      .post("http://localhost:3001/user/login", data)
      .then((response) => {
        if (response.data.token) {
          if (response.data.userCheck.Role === "Admin") {
            setAdmin(true);
            localStorage.setItem("user.name", "Admin");
          } else {
            localStorage.setItem("user.id", response.data.userCheck._id);
            localStorage.setItem(
              "user.name",
              response.data.userCheck.FirstName
            );
            localStorage.setItem(
              "user.lastName",
              response.data.userCheck.LastName
            );
            localStorage.setItem("token", response.data.token);
            setSuccess(true);
          }
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log("error.response");
          if (error.response.status === 400) {
            setWrong(true);
          }
          if (error.response.status === 404) {
            setNotFd(true);
          }
        } else if (error.request) {
          console.log(error.request);
        } else if (error.message) {
          console.log(error.message);
        }
      });
  };

  return (
    <div style={{ paddingTop: 20 }}>
      {success && <Navigate to={{ pathname: `/` }} replace={true} />}
      {admin && <Navigate to="/admin" replace={true} />}

      <Grid container>
        <Grid item md={5} lg={1}></Grid>

        <Grid item xs={12} md={10} lg={10}>
          <Grid container>
            <Grid item xs={12} md={12} lg={12}>
              <Card
                style={{
                  width: "95%",
                  height: "100%",
                  borderRadius: 10,
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderColor: "rgba(253, 177, 89, 1)",
                }}
              >
                <Box
                  className="boxLogin"
                  sx={{
                    backgroundImage: `url(${reg})`,
                    backgroundRepeat: "no-repeat",

                    backgroundSize: "80%",
                    borderRadius: 8,
                    width: 1700,
                  }}
                >
                  <CardContent
                    style={{
                      width: 530,
                      height: "auto",
                      borderRadius: 20,
                      borderStyle: "solid",
                      borderWidth: 3,
                      borderColor: "rgba(253, 177, 89, 1)",
                      backgroundColor: "white",
                    }}
                  >
                    <p
                      className="titreLog"
                      style={{
                        paddingBottom: 50,
                        width: 0,
                        height: 0,
                        fontWeight: "500",
                        lineHeight: "100%",
                        textAlign: "center",
                        color: "rgba(54, 54, 54, 1)",
                      }}
                    >
                      Login
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="form">
                      <Controller
                        control={control}
                        name="username"
                        render={({
                          field: { onChange, onBlur, value, ref },
                        }) => (
                          <Input
                            id="email"
                            name="username"
                            onChange={onChange}
                            value={value}
                            label=" Email / Phone Number"
                            type="text"
                            autoComplete="email"
                          />
                        )}
                      ></Controller>
                      <Controller
                        control={control}
                        name="pwd"
                        render={({
                          field: { onChange, onBlur, value, ref },
                        }) => (
                          <Input
                            id="password"
                            name="pwd"
                            onChange={onChange}
                            value={value}
                            label="Password"
                            type={values.showPassword ? "text" : "password"}
                            autoComplete="current-password"
                          />
                        )}
                      ></Controller>

                      <Grid container>
                        <Grid item lg={6} xs={12}>
                          <p>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onClick={handleClickShowPassword}
                                  sx={{
                                    color: "black"[800],
                                    "&.Mui-checked": {
                                      color: yellow[800],
                                    },
                                  }}
                                />
                              }
                              style={{
                                color: clicked
                                  ? "rgba(253, 177, 89, 1)"
                                  : "black",
                              }}
                              label="Show Password"
                            />
                          </p>
                        </Grid>
                        <Grid item lg={4} xs={12}>
                          <a
                            href="/forget_password"
                            style={{
                              color: "rgba(253, 177, 89, 1)",
                              textDecoration: "none",
                            }}
                          >
                            Forgot your password ?
                          </a>
                        </Grid>
                      </Grid>

                      <div
                        style={{
                          paddingTop: 20,
                          paddingBottom: 20,
                        }}
                      >
                        <Grid item lg={12} sm={12} xs={8} md={11}>
                          <Button
                            variant="contained"
                            type="submit"
                            size="large"
                            style={{
                              backgroundColor: "rgba(253, 177, 89, 1)",
                              paddingLeft: "70px",
                              paddingRight: "70px",
                              textAlign: "center",
                              width: "75%",
                            }}
                          >
                            <div
                              className="text"
                              style={{ fontWeight: "normal", fontSize: 18 }}
                            >
                              Confirm
                            </div>
                          </Button>
                        </Grid>
                      </div>

                      <Grid item lg={12} xs={8} sm={12}>
                        <Stack
                          className="newWithUs"
                          direction="row"
                          spacing={1}
                        >
                          <p> If you're new with us</p>

                          <Link
                            style={{
                              textDecoration: "none",
                              color: "rgba(253, 177, 89, 1)",
                            }}
                            to="/Register"
                          >
                            Try this way
                          </Link>
                        </Stack>
                      </Grid>

                      <Grid container>
                        <Grid item lg={12} sm={12} xs={8} md={11}>
                          {notFd && (
                            <Alert style={{ width: "75%" }} severity="error">
                              This user is not found,
                              <strong>check your Email!</strong>
                            </Alert>
                          )}
                          {wrong && (
                            <Alert style={{ width: "75%" }} severity="warning">
                              <strong>Your password is incorrect !</strong>
                            </Alert>
                          )}
                        </Grid>
                      </Grid>
                    </form>
                    <br></br>
                    <Grid container>
                      <Grid item md={2} sm={2} lg={2}></Grid>
                      <Grid item md={8} lg={9} sm={9} xs={7}>
                        <FacebookLogin
                          cssClass="fcGoogle"
                          textButton={"Continue With Facebook"}
                          buttonStyle={{
                            backgroundColor: "white",
                            color: "#1877F2",
                            width: "84%",
                            height: 53,
                            borderRadius: 7,
                            // paddingBottom: 1,
                            // paddingTop: 2,
                            textTransform: "none",
                            borderRightColor: "#1877F2",
                            borderLeftColor: "#1877F2",
                            borderTopColor: "#1877F2",
                            borderBottomColor: "#1877F2",
                            border: "2.62px solid  #1877F2 ",
                            fontWeight: "bold",
                          }}
                          icon={
                            <FacebookIcon
                              style={{ marginRight: 20, fontSize: "2.8rem" }}
                            />
                          }
                          appId="1207048846500017"
                          callback={FacebookCallback}
                          onSuccess={(response) => {
                            console.log("Login Success!", response);
                          }}
                          onFail={(error) => {
                            console.log("Login Failed!", error);
                          }}
                        />
                      </Grid>
                      <Grid container>
                        <Grid item md={2} sm={2} xs={10} lg={2}></Grid>

                        <Grid
                          style={{ marginTop: 25, marginBottom: 50 }}
                          item
                          md={8}
                          lg={9}
                          xs={7}
                          sm={9}
                        >
                          <GoogleLogin
                            render={(renderProps) => (
                              <button
                                style={{
                                  backgroundColor: "white",
                                  color: "#757575",
                                  width: "84%",
                                  height: 53,
                                  borderRadius: 7,
                                  textTransform: "none",
                                  //   fontFamily: "sans-serif",
                                  fontWeight: "bold",
                                  border: "2.62px solid  #757575 ",
                                }}
                                onClick={renderProps.onClick}
                              >
                                <div className="fcGoogle">
                                  <FcGoogle
                                    style={{
                                      marginRight: 15,
                                      fontSize: "2.8rem",
                                    }}
                                  />
                                  Sign in With Google
                                </div>
                              </button>
                            )}
                            clientId="201301668147-g1s73p8ht69cssl3tqkshfubovj6n3bc.apps.googleusercontent.com"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={"single_host_origin"}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Login;
