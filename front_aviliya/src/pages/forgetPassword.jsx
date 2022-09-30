/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import React from "react";
import { Box } from "rebass";
import reg from "../register.png";
import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";
import { Button } from "@mui/material";
import Input from "../components/enter";
import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router";
import Alert from "@mui/material/Alert";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import { Controller, useForm } from "react-hook-form";
import emailjs from "emailjs-com";
import { Grid } from "@material-ui/core";

function Forget() {
  const { control, handleSubmit } = useForm();
  const [success, setSuccess] = useState(false);
  const [focused, setFocused] = useState(false);
  const [notFd, setNotFd] = useState(false);

  const onSubmit = async (data) => {
    setNotFd(false);
    //console.log(data.email);

    const res = await axios
      .post("http://localhost:3001/user/searchEmail", data)
      .then((response) => {
        if (response.status === 200) {
          var templateParams = {
            email: data.email,
            to_id: response.data._id,
            to_Fname: response.data.FirstName,
            to_name: response.data.LastName,
          };
          setSuccess(true);
          console.log(response.data._id);
          emailjs
            .send(
              "service_tyj2n0s",
              "template_vmnhhwn",
              templateParams,
              "QwXfTh3exjxFbebxf"
            )
            .then(
              function (response) {
                console.log("SUCCESS!", response.status, response.text);
              },
              function (error) {
                console.log("FAILED...", error);
              }
            );
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log("error.response");
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
    <div style={{ paddingTop: 50 }}>
      {success && <Navigate to={{ pathname: `/login` }} replace={true} />}

      <Grid container>
        <Grid item md={5} lg={1}></Grid>

        <Grid item xs={12} md={10} lg={10}>
          <Grid container>
            <Grid item xs={12} md={12} lg={12}></Grid>
            <Card
              style={{
                width: "90%",
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
                  px: 0,
                  backgroundImage: `url(${reg})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "80%",
                  borderRadius: 8,
                  width: 1550,
                }}
              >
                <CardContent
                  style={{
                    width: 500,
                    height: "30rem",
                    borderRadius: 20,
                    borderStyle: "solid",
                    borderWidth: 3,
                    borderColor: "rgba(253, 177, 89, 1)",
                    backgroundColor: "white",
                  }}
                >
                  <Grid item lg={12} sm={10} xs={7} md={11}>
                    <h1
                      style={{
                        paddingTop: 10,
                        paddingBottom: 20,
                        width: "90%",
                        height: 130,
                        fontWeight: "550",
                        lineHeight: "130%",
                        textAlign: "center",
                        color: "rgba(54, 54, 54, 1)",
                      }}
                    >
                      Recover Your Password
                    </h1>
                  </Grid>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="form"
                    style={{ paddingLeft: 10 }}
                  >
                    <Controller
                      control={control}
                      name="email"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <div>
                          <label
                            style={{
                              color: focused ? "rgba(253, 177, 89, 1)" : "",
                              paddingBottom: 20,
                              fontSize: 20,
                            }}
                            className="labeel"
                          >
                            Your E-mail <span style={{ color: "red" }}>*</span>
                          </label>

                          <input
                            className="input-group inpFr"
                            autoComplete="current-password"
                            type="text"
                            required
                            name="email"
                            value={value}
                            onChange={onChange}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                          ></input>
                        </div>
                      )}
                    ></Controller>

                    <div
                      className="bouton"
                      style={{ paddingTop: 40, paddingBottom: 20 }}
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
                            style={{
                              fontWeight: "normal",
                              fontSize: 18,
                              textTransform: "none",
                            }}
                          >
                            Submit
                          </div>
                        </Button>
                      </Grid>
                    </div>
                  </form>
                  {notFd && (
                    <Alert
                      style={{
                        width: "75%",
                        marginLeft: "4cm",
                        marginTop: "1cm",
                        fontSize: 16,
                      }}
                      severity="error"
                    >
                      This user is not found,
                      <strong>
                        please verify your Email ! Or{" "}
                        <a
                          style={{
                            color: "black",
                            textDecoration: "none",
                          }}
                          href="/register"
                        >
                          Create an Account
                        </a>
                      </strong>
                    </Alert>
                  )}
                </CardContent>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Forget;
