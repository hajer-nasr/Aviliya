/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import React from "react";
import { Box } from "rebass";
import reg from "../register.png";
import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";
import { Button } from "@mui/material";
import Input from "../components/enter";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { yellow } from "@mui/material/colors";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { Grid } from "@material-ui/core";

function Register() {
  const [success, setSuccess] = useState(false);
  const { control, handleSubmit } = useForm();
  const [exist, setExist] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [values, setValues] = useState({
    pwd: "",
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
    setClicked(!clicked);
  };
  const onSubmit = async (data) => {
    setExist(false);
    const res = await axios
      .post("http://localhost:3001/user/register", data)
      .then((response) => {
        if (response.status === 200) {
          setSuccess(true);
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 400) {
            setExist(true);
          }
          if (error.response.status === 500) {
            console.log(error);
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
      {success && <Navigate to="/Login" replace={true} />}

      <Grid container>
        <Grid item md={5} lg={1}></Grid>

        <Grid item xs={12} md={10} lg={10}>
          <Grid container>
            <Grid item xs={12} md={12} lg={12}></Grid>
            <Card
              style={{
                width: "95%",
                height: "100%",
                borderRadius: 10,
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "rgba(253, 177, 89, 1)",
                backgroundColor: "white",
              }}
            >
              <Box
                className="boxLogin"
                sx={{
                  px: 0,
                  backgroundImage: `url(${reg})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "80%",
                  borderRadius: 8,
                  width: 1700,
                }}
              >
                <CardContent
                  style={{
                    width: 550,
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
                      width: 21,
                      height: 0,
                      fontWeight: "500",
                      lineHeight: "100%",
                      textAlign: "center",
                      color: "rgba(54, 54, 54, 1)",
                    }}
                  >
                    Register
                  </p>
                  <Snackbar open={success} autoHideDuration={6000}>
                    <Alert severity="success" sx={{ width: "100%" }}>
                      Your account has been successfully created.
                    </Alert>
                  </Snackbar>
                  <form onSubmit={handleSubmit(onSubmit)} className="form">
                    <Controller
                      control={control}
                      name="FirstName"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Input
                          id="FirstName"
                          name="FirstName"
                          onChange={onChange}
                          value={value}
                          label="First Name"
                          type="text"
                          autoComplete="FirstName"
                        />
                      )}
                    ></Controller>

                    <Controller
                      control={control}
                      name="LastName"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Input
                          id="LastName"
                          name="LastName"
                          onChange={onChange}
                          value={value}
                          label="Last Name"
                          type="text"
                          autoComplete="LastName"
                        />
                      )}
                    ></Controller>

                    <Controller
                      control={control}
                      name="Email"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Input
                          id="Email"
                          name="Email"
                          onChange={onChange}
                          value={value}
                          label="Email"
                          type="text"
                          autoComplete="Email"
                        />
                      )}
                    ></Controller>
                    <Controller
                      control={control}
                      name="pwd"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Input
                          id="password"
                          name="pwd"
                          onChange={onChange}
                          value={value}
                          label="Password"
                          type={values.showPassword ? "text" : "password"}
                          autoComplete="email"
                        />
                      )}
                    ></Controller>
                    <Grid container>
                      <Grid item lg={7} xs={9}>
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
                    </Grid>
                    <Grid container>
                      <Grid item lg={12} xs={8} md={11}>
                        {exist && (
                          <Alert style={{ width: "75%" }} severity="error">
                            There is already an account registred,
                            <strong>with this Email !</strong>
                          </Alert>
                        )}
                      </Grid>
                    </Grid>
                    <div
                      className="bouton"
                      style={{ paddingTop: 20, paddingBottom: 5 }}
                    >
                      <Grid item lg={12} sm={12} xs={7} md={11}>
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
                    <div
                      style={{
                        fontSize: 20,
                        paddingTop: 20,
                      }}
                    >
                      <Grid item lg={12} xs={6} sm={12}>
                        <Stack
                          direction="row"
                          spacing={1}
                          className="newWithUs"
                        >
                          <p> Already have an account ?</p>
                          <Link
                            style={{
                              textDecoration: "none",
                              color: "rgba(253, 177, 89, 1)",
                            }}
                            to="/Login"
                          >
                            Login here
                          </Link>
                        </Stack>
                      </Grid>
                    </div>
                  </form>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
export default Register;
