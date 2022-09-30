/* eslint-disable jsx-a11y/iframe-has-title */
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import SubDetails from "../components/subheaderDetails";
import { Box } from "@mui/system";
import { Grid } from "@material-ui/core";
import { Rating } from "react-simple-star-rating";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { red } from "@mui/material/colors";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => (
  <div>
    <h1
      style={{
        color: "#b70b0b",
        fontSize: "0.8rem",
        fontWeight: "bold",
        textAlign: "center",
      }}
    >
      {text}
    </h1>
    <LocationOnIcon
      style={{
        color: "#b70b0b",
        fontSize: 40,
      }}
    />
  </div>
);

function CardDet(props) {
  const rates = props.stars;
  const lat = props.lat;
  const lng = props.lng;
  return (
    <Grid container style={{ paddingTop: 10 }}>
      <Grid item md={1} lg={1}></Grid>

      <Card sx={{ maxWidth: 1350, boxShadow: 10 }}>
        <Box
          sx={{
            bgcolor: "#fffff",
          }}
        >
          <Grid container>
            <Grid item xs={11} lg={7}>
              <CardMedia
                component="img"
                height="350"
                style={{
                  borderRadius: "3%",
                  paddingBottom: 8,
                  paddingLeft: 30,
                  paddingTop: 20,
                }}
                image={props.Image}
                alt="Hotel's Pictures"
              />
              <CardHeader
                style={{ textAlign: "center" }}
                title={props.title}
                subheader={<SubDetails name={props.location} />}
                titleTypographyProps={{
                  fontWeight: "bold",
                  color: "#98652A",
                  fontSize: 32,
                }}
                subheaderTypographyProps={{
                  fontSize: "0.5vw",
                  color: "rgba(107, 114, 128, 1)",
                  paddingTop: 0.2,
                }}
              />
              <hr
                style={{
                  margin: "auto",
                  backgroundColor: "#FDB159",
                  height: 5,
                  width: "50%",
                }}
              />
              <CardContent
                style={{
                  paddingLeft: "15%",
                  paddingRight: "15%",
                  textAlign: "center",
                }}
              >
                <p className="desc">{props.desc}</p>

                <div style={{ paddingLeft: "20%" }} className="star">
                  <Grid item xs={12} lg={5}>
                    <Rating
                      readonly="true"
                      fillColor="#FDB159"
                      emptyColor="#FDB159"
                      initialValue={rates}
                      showTooltip
                      tooltipArray={[
                        "Terrible",
                        "Bad",
                        "Average",
                        "Great",
                        "Perfect",
                      ]}
                      tooltipStyle={{
                        marginLeft: "10%",
                        marginRight: "10%",
                        marginTop: "5%",
                        color: "#AF7F46",
                        backgroundColor: "#FBECDB",
                        fontSize: "1.3rem",
                        fontWeight: "bold",
                        paddingLeft: 25,
                        paddingRight: 25,
                      }}
                      fullIcon={<AiFillStar size={"2.5vw"} />}
                      emptyIcon={
                        <AiOutlineStar size={"2.5vw"} fontcolor={red} />
                      }
                    />
                  </Grid>
                </div>
              </CardContent>
            </Grid>
            <Grid style={{ paddingLeft: "1%" }} item xs={12} lg={5}>
              <CardContent style={{ borderRadius: "1%" }}>
                <div style={{ height: "44rem", width: "102%" }}>
                  <GoogleMapReact
                    bootstrapURLKeys={{
                      key: "AIzaSyBB_mOQRt39K8-4Xv_-uiBKa7ZcEHtIK_g",
                      id: "63bb966808af2b22",
                    }}
                    defaultZoom={20}
                    center={{ lat, lng }}
                    options={{ mapId: "63bb966808af2b22" }}
                  >
                    <AnyReactComponent
                      lat={props.lat}
                      lng={props.lng}
                      text={props.title}
                    />
                  </GoogleMapReact>
                </div>
              </CardContent>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Grid>
  );
}

export default CardDet;
