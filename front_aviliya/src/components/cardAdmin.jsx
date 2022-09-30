import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { Button } from "@mui/material";
import Sub from "./subheader";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";

function CarteAdmin(props) {
  return (
    <Card
      sx={{
        maxWidth: "88%",
        backgroundColor: "white",
        boxShadow: "0px 1px 30px rgba(34, 34, 34, 0.15)",
        borderRadius: 5,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "white",
      }}
    >
      <CardHeader
        titleTypographyProps={{
          fontSize: 18,
          fontWeight: "bold",
          color: " rgba(31, 41, 55, 1)",
        }}
        subheaderTypographyProps={{
          fontSize: 10,
          color: "rgba(107, 114, 128, 1)",
        }}
        style={{ textAlign: "center" }}
        title={props.title}
        subheader={<Sub name={props.location} />}
      />
      <CardMedia
        component="img"
        height="130"
        style={{ paddingLeft: 13, paddingRight: 13, borderRadius: "5%" }}
        image={props.Image}
        alt="Hotel's Pictures"
      />
      <CardContent style={{ textAlign: "center" }}>
        <Link
          to={{ pathname: `/admin/details/${props.id}` }}
          style={{ textDecoration: "none" }}
        >
          <Grid container>
            <Grid item xs={4} lg={2} md={2}></Grid>
            <Grid item xs={4} lg={8} md={8}>
              <Button
                variant="contained"
                size="large"
                style={{
                  backgroundColor: "#F2D991",
                  paddingLeft: "14px",
                  paddingRight: "14px",
                  width: "100%",
                  height: 33,
                }}
              >
                <div
                  className="text"
                  style={{
                    color: "#1926BB",
                    fontWeight: "bold",
                    textTransform: "none",
                    fontSize: 21,
                  }}
                >
                  More
                </div>
              </Button>
              <Grid item xs={4} lg={2} md={2}></Grid>
            </Grid>
          </Grid>
        </Link>
      </CardContent>
    </Card>
  );
}

export default CarteAdmin;
