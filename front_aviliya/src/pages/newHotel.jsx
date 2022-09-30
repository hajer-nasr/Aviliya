/* eslint-disable no-unused-vars */
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import * as React from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "../components/nav";
import { Card, CardHeader, CardContent, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { Controller, useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import InpNew from "../components/inpNew";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PushPinIcon from "@mui/icons-material/PushPin";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import { Alert } from "@mui/material";
import { Grid } from "@material-ui/core";
import { BsCloudUpload } from "react-icons/bs";
import MapIcon from "@mui/icons-material/Map";
function NewHotel() {
  const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
  };

  const thumb = {
    display: "inline-flex",
    borderRadius: 16,
    border: "1px solid #eaeaea",
    marginLeft: 40,
    marginRight: 8,
    width: 420,
    height: 50,
    padding: 5,
    boxSizing: "border-box",
    backgroundColor: "white",
  };

  const thumbInner = {
    display: "flex",
    overflow: "hidden",
  };

  const img = {
    display: "block",
    width: "auto",
    height: "auto",
  };
  const [pic, setPic] = useState([]);
  const [files, setFiles] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  //var pictures;
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img alt="preview" src={file.preview} style={img} />
        <p style={{ paddingTop: 10, paddingLeft: 15, fontSize: 18 }}>
          {file.name}
        </p>
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const [success, setSuccess] = useState(false);
  const { control, handleSubmit } = useForm();
  const [focused, setFocused] = useState(false);

  const onSubmit = async (data) => {
    let form = new FormData();
    form.append("data", JSON.stringify(data));
    form.append("Images", files[0]);
    const res = await axios
      .post("http://localhost:3001/hotel/add", form)
      .then((response) => {
        if (response.status === 200) {
          console.log("hotel added");
          console.log(response);
          setSuccess(true);
          window.location.reload(true);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        } else if (error.request) {
          console.log(error.request);
        } else if (error.message) {
          console.log(error.message);
        }
      });
  };
  const NavStyle = {
    color: "#98652A",

    fontSize: 34,
    textDecoration: "none",
  };
  return (
    <div style={{ paddingTop: 20 }}>
      <NavBar />
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div>
          <Grid container>
            <Grid item md={1} lg={1}></Grid>
            <Grid item xs={5} md={4} lg={4} style={{ paddingTop: 45 }}>
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
              <h1 className="titreDet">New Hotel </h1>
            </Grid>
            <Grid item xs={3} md={2} lg={2} style={{ paddingTop: 45 }}>
              <button className="button-confirm" type="submit">
                <p
                  style={{ color: "#98652A", textTransform: "none" }}
                  className="flesh"
                >
                  Confirm
                  <ArrowCircleRightOutlinedIcon
                    style={{
                      fontSize: "45",
                      color: "#98652A",
                      paddingLeft: 10,
                    }}
                  />
                </p>
              </button>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item lg={1}></Grid>
            <Grid style={{ paddingTop: "1.5%" }} item md={10} lg={10} xs={12}>
              <Card sx={{ maxWidth: 1700, boxShadow: 4, borderRadius: 5 }}>
                <Box
                  sx={{
                    bgcolor: "white",
                  }}
                >
                  <Grid container>
                    <Grid item lg={7} xs={11} md={7}>
                      <CardHeader
                        style={{
                          textAlign: "center",
                          paddingTop: 20,
                        }}
                        title="Hotel Info"
                        titleTypographyProps={{
                          fontSize: 50,
                          fontWeight: "bold",
                          color: "#98652A",
                        }}
                      />

                      <CardContent
                        style={{
                          paddingLeft: "2vw",
                          paddingRight: "20%",
                        }}
                      >
                        <div>
                          <Controller
                            control={control}
                            name="Name"
                            render={({
                              field: { onChange, onBlur, value, ref },
                            }) => (
                              <Stack direction="row" spacing={2}>
                                <ApartmentIcon
                                  style={{
                                    fontSize: 50,
                                    color: "#98652A",
                                    marginTop: 30,
                                  }}
                                />
                                <InpNew
                                  onFocus={() => setFocused(true)}
                                  onBlur={() => setFocused(false)}
                                  id="Name"
                                  name="Name"
                                  place="Hotel's Name"
                                  onChange={onChange}
                                  value={value}
                                  type="text"
                                  autoComplete="name"
                                />
                              </Stack>
                            )}
                          ></Controller>
                          <Controller
                            control={control}
                            name="Localisation"
                            render={({
                              field: { onChange, onBlur, value, ref },
                            }) => (
                              <Stack direction="row" spacing={2}>
                                <PushPinIcon
                                  style={{
                                    fontSize: 50,
                                    color: "#98652A",
                                    marginTop: 30,
                                  }}
                                />
                                <InpNew
                                  place="Location"
                                  id="Localisation"
                                  name="Localisation"
                                  onChange={onChange}
                                  value={value}
                                  type={"text"}
                                  autoComplete="current-password"
                                />
                              </Stack>
                            )}
                          ></Controller>

                          <Controller
                            control={control}
                            name="Latitude"
                            render={({
                              field: { onChange, onBlur, value, ref },
                            }) => (
                              <Stack direction="row" spacing={2}>
                                <MapIcon
                                  style={{
                                    fontSize: 50,
                                    color: "#98652A",
                                    marginTop: 30,
                                  }}
                                />
                                <InpNew
                                  place="Latitude"
                                  id="Latitude"
                                  name="Latitude"
                                  onChange={onChange}
                                  value={value}
                                  type={"text"}
                                  autoComplete="current-password"
                                />
                              </Stack>
                            )}
                          ></Controller>
                          <Controller
                            control={control}
                            name="Longitude"
                            render={({
                              field: { onChange, onBlur, value, ref },
                            }) => (
                              <Stack direction="row" spacing={2}>
                                <MapIcon
                                  style={{
                                    fontSize: 50,
                                    color: "#98652A",
                                    marginTop: 30,
                                  }}
                                />
                                <InpNew
                                  place="Longitude"
                                  id="Longitude"
                                  name="Longitude"
                                  onChange={onChange}
                                  value={value}
                                  type={"text"}
                                  autoComplete="current-password"
                                />
                              </Stack>
                            )}
                          ></Controller>

                          <Controller
                            control={control}
                            name="Description"
                            render={({
                              field: { onChange, onBlur, value, ref },
                            }) => (
                              <Stack direction="row" spacing={2}>
                                <BadgeOutlinedIcon
                                  style={{
                                    fontSize: 50,
                                    color: "#98652A",
                                    marginTop: 30,
                                  }}
                                />
                                <textarea
                                  style={{ marginBottom: 10, marginTop: 10 }}
                                  required={true}
                                  className="input-groupAd textarea formNew"
                                  autoComplete="current-password"
                                  onFocus={() => setFocused(true)}
                                  onBlur={() => setFocused(false)}
                                  placeholder="Description"
                                  id="Description"
                                  name="Description"
                                  onChange={onChange}
                                  value={value}
                                ></textarea>
                              </Stack>
                            )}
                          ></Controller>
                        </div>
                      </CardContent>
                    </Grid>
                    <Grid item md={5} lg={5} xs={12}>
                      <Card
                        sx={{
                          height: "100%",
                          width: "100%",
                          boxShadow: 2,
                          backgroundColor: "#F6CD9C",
                        }}
                      >
                        <h1
                          style={{
                            fontSize: "1.8rem",
                            color: "#98652A",
                            textAlign: "center",
                            paddingTop: 40,
                            paddingBottom: 40,
                          }}
                        >
                          Upload Cover Image
                        </h1>

                        <div style={{ marginLeft: "5%", paddingBottom: 50 }}>
                          <div {...getRootProps({ className: "dropzone" })}>
                            <Controller
                              control={control}
                              name="Images"
                              render={({
                                field: { onChange, onBlur, value, ref },
                              }) => (
                                <div>
                                  <input
                                    onChange={(e) => {
                                      onChange(e.target.files[0]);
                                    }}
                                    selected={value}
                                    id="Images"
                                    name="Images"
                                    {...getInputProps()}
                                  />

                                  <BsCloudUpload className="iconCloud" />
                                </div>
                              )}
                            ></Controller>
                          </div>
                          <aside style={thumbsContainer}>{thumbs}</aside>
                        </div>
                      </Card>
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </div>
      </form>
      {success && (
        <Alert style={{ width: "15cm" }} severity="success">
          The hotel has been successfully added.
        </Alert>
      )}
    </div>
  );
}

export default NewHotel;
