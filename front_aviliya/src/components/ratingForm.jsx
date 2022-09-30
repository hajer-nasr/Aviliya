/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
import * as React from "react";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import useForm from "react-hook-form";

import { useParams } from "react-router-dom";
import { Range } from "react-range";
import Box from "@mui/material/Box";

import FormControl from "@mui/material/FormControl";

import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import FormControlLabel from "@mui/material/FormControlLabel";
import ProgressBar from "@ramonak/react-progress-bar";
import { Link } from "react-router-dom";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";

import { BsRecordCircle } from "react-icons/bs";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import CircleIcon from "@mui/icons-material/Circle";

function RatingForm(props) {
  const questions = [
    {
      id: 1,
      ques: "Agent de sécurité : L'acceuil au porte de l'hotel ",
      choix: ["Courtois", "Normal", "Froid"],
    },
    {
      id: 2,
      ques: "Agent de sécurité : Le Contrôle de sécurité  ",
      choix: ["Rapide et Fiable", "Lent et Stressant"],
    },
    {
      id: 3,
      ques: "Parking : Stationnement de la Voiture",
      choix: ["A L'intérieur", "A L'extérieur"],
    },
    {
      id: 4,
      ques: "Parking :  Le Parking est surveillé ",
      choix: [
        "Par Un Agent De Sécurité",
        "Avec Une Caméra De Surveillance ",
        "N'est Pas Surveillé",
      ],
    },
    {
      id: 5,
      ques: "Reception : L'acceuil au porte de l'hotel ",
      choix: ["Courtois", "Normal", "Froid"],
    },
    {
      id: 6,
      ques: "Reception : Temps d'attente pour recuperer la chambre ",
      choix: [
        "Moins De 10 minutes",
        "Entre 10 Et 20 minutes",
        "Plus de 20 minutes",
      ],
    },
    {
      id: 7,
      ques: "Reception : Réactivité et disponibilité en cas de besoin",
      choix: [
        "Réactif ",
        "Non Réactif ",
        "Pas D'incident Necessitant Le Recours",
      ],
    },
    {
      id: 8,
      ques: "Chambre : Etat Général de la chambre( Propreté)",
      choix: ["La Chambre n'été pas Propre ", "La Chambre été Propre"],
    },
    {
      id: 9,
      ques: "Chambre : Fonctionnent de tous les facilités dans la chambre (Tv,Climatiseur, Eau Chaude, etc…)",
      choix: ["Fonctionnel ", "Non Fonctionnel "],
    },
    {
      id: 10,
      ques: "Chambre : Réactivité et Disponibilité du Service Entretien",
      choix: [
        "Réactif ",
        "Non Réactif ",
        "Pas D'incident Necessitant Le Recours",
      ],
    },
    {
      id: 11,
      ques: "Restaurant : Hygiène",
      choix: ["Respectée ", "Non Respectée "],
    },
    {
      id: 12,
      ques: "Restaurant : Qualité de Service( les serveurs)",
      choix: ["Serviable ", "Non Serviable "],
    },
    {
      id: 13,
      ques: "Restaurant : Les plats",
      choix: ["Varié ", "Limité "],
    },
    {
      id: 14,
      ques: "Restaurant : Le Menu est",
      choix: ["Rotatif ", "Répétitif "],
    },
    {
      id: 15,
      ques: "Bar : Qualité de Service (Barman)",
      choix: ["Serviable ", "Non Serviable "],
    },
    {
      id: 16,
      ques: "Bar : Hygiène",
      choix: ["Respectée ", "Non Respectée "],
    },

    {
      id: 17,
      ques: "Piscine : Agent de Sécurité",
      choix: ["Disponible ", "Non Disponible "],
    },
    {
      id: 18,
      ques: "Piscine : Transat",
      choix: ["Disponible ", "Non Disponible "],
    },
    {
      id: 19,
      ques: "Piscine : Hygiène",
      choix: ["Respectée ", "Non Respectée "],
    },
    {
      id: 20,
      ques: "Piscine Couverte : Hygiène",
      choix: ["Respectée ", "Non Respectée "],
    },
    {
      id: 21,
      ques: "Piscine Couverte : Agent de Sécurité",
      choix: ["Disponible ", "Non Disponible "],
    },
    {
      id: 22,
      ques: "Piscine Couverte : L'Eau est",
      choix: ["Froide ", "Douce", "Chaude"],
    },

    {
      id: 23,
      ques: "Plage : Agent de Sécurité",
      choix: ["Disponible ", "Non Disponible "],
    },
    {
      id: 24,
      ques: "Plage : Accessiblité",
      choix: ["Accessible ", "Non Accessible"],
    },
    {
      id: 25,
      ques: "Plage : Transat",
      choix: ["Disponible ", "Non Disponible "],
    },
    {
      id: 26,
      ques: "Plage : Qualité de service Barman/Serveur",
      choix: ["Serviable ", "Non Serviable "],
    },

    {
      id: 27,
      ques: "Animation : Piscine",
      choix: ["Excellente ", "Bonne", "Moyenne", "Mauvaise"],
    },
    {
      id: 28,
      ques: "Animation : La Nuit ",
      choix: ["Excellente ", "Bonne", "Moyenne", "Mauvaise"],
    },
    {
      id: 29,
      ques: "Service Etage : Réactivité et Disponibilité  en cas de besoin",
      choix: [
        "Réactif ",
        "Non Réactif",
        "Pas D'incident Necessitant Le Recours",
      ],
    },
    {
      id: 30,
      ques: "Synthèse : L'Hotel est à ",
      choix: ["A Recommander ", "Correct", "A Eviter"],
    },
  ];
  const [values, setvalues] = useState([]);
  const [q, setQ] = useState(1);
  const [checkRps, setcheckRps] = useState(false);
  useEffect(() => {
    console.log(q);
    setcheckRps(false);
  }, [q]);

  const onPrevious = (id) => {
    if (q === questions.length) {
      setQ(q - 1);
      setvalues(values.filter((item) => item.id !== q - 1));
      setBtnName("Next Question");
      setProgress(progress - 100 / questions.length);
      setChoice("notselected");
    }
    if (q === questions.length + 1) {
      setQ(q - 1);
      setBtnName("Next ");
      setChoice("notselected");
      setvalues(values.filter((item) => item.id !== q - 1));
    } else {
      setQ(q - 1);
      setvalues(values.filter((item) => item.id !== q - 1));
      setProgress(progress - 100 / questions.length);
      setChoice("notselected");
    }
  };

  const onNext = (id, value) => {
    if (q === questions.length) {
      setvalues((old) => [...old, { id: id, value: value }]);
      setBtnName("Submit");
      setQ(q + 1);

      setQ(q + 1);
    } else if (q === questions.length - 1) {
      setChoice("notselected");
      setBtnName("Next");
      setProgress(progress + 100 / questions.length);
      setvalues((old) => [...old, { id: id, value: value }]);
      setQ(q + 1);
    } else if (q < questions.length - 1) {
      setChoice("notselected");

      setProgress(progress + 100 / questions.length);

      setvalues((old) => [...old, { id: id, value: value }]);
      setQ(q + 1);
    }
  };
  const onSubmit = () => {
    //http request
    console.log(values);
  };

  const { id } = useParams();

  const userId = localStorage.getItem("user.id");

  const reviewFile = props.piece;
  const [files, setFiles] = useState([]);
  const { control, handleSubmit } = useForm();
  const [checked, setChecked] = useState(false);
  const [choice, setChoice] = useState("");
  const [progress, setProgress] = useState(100 / questions.length);
  const [btnName, setBtnName] = useState("Next Question");

  const handleCheck = () => {
    setChecked(!checked);
  };

  const NavStyle = {
    color: "#A8A5A5",
    fontSize: 22,
    textDecoration: "none",
  };

  return (
    <div>
      <div className="box2" style={{ paddingBottom: 70 }}>
        <Card sx={{ maxWidth: 1500, boxShadow: 2, backgroundColor: "white" }}>
          <Grid container>
            <Grid item xs={1} lg={1}></Grid>

            <Grid item lg={10} xs={10}>
              <div>
                <div style={{ paddingTop: "2%" }}>
                  <ProgressBar
                    completed={progress}
                    bgColor="#fdb159"
                    customLabel=" "
                  />
                </div>
                <div style={{ paddingTop: "1%" }}>
                  {q > 1 ? (
                    <p
                      onClick={() => onPrevious(q)}
                      style={{
                        cursor: "pointer",
                        fontSize: 20,
                        color: "#A8A5A5",
                        fontWeight: "bold",
                      }}
                    >
                      <ArrowCircleLeftOutlinedIcon
                        style={{
                          fontSize: 38,
                          paddingRight: 10,
                          color: "#A8A5A5",
                        }}
                      />
                      Previous
                    </p>
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            </Grid>
          </Grid>
          <form className="form">
            {questions.map((ques) => {
              if (ques.id === q) {
                return (
                  <div key={ques.id}>
                    <Grid container>
                      <Grid
                        item
                        xs={11}
                        lg={12}
                        style={{ textAlign: "center" }}
                      >
                        <h4 style={{ color: "#FDB159", paddingBottom: "1%" }}>
                          Question {ques.id}/{questions.length}
                        </h4>
                        <h3
                          style={{
                            color: "#676464",
                            paddingBottom: "2%",
                            fontWeight: "bold",
                          }}
                        >
                          {ques.ques}
                        </h3>
                        <div>
                          <FormControl>
                            <RadioGroup
                              aria-labelledby="demo-radio-buttons-group-label"
                              name="radio-buttons-group"
                            >
                              {ques.choix.map((choi, index) => {
                                return (
                                  <Box
                                    key={index}
                                    style={{
                                      marginBottom: "10%",
                                      textAlign: "start",
                                    }}
                                    sx={{
                                      bgcolor:
                                        choice === choi ? "#f7cd9c" : "#EEEDED",
                                      borderRadius: 5,
                                    }}
                                  >
                                    <FormControlLabel
                                      onChange={() => setChoice(choi)}
                                      labelPlacement="end"
                                      value={choi}
                                      control={
                                        <Radio
                                          onClick={() => setcheckRps(true)}
                                          sx={{
                                            width: "3cm",
                                            height: "1.2cm",
                                          }}
                                          icon={
                                            <CircleIcon
                                              style={{
                                                color: "white",
                                                fontSize: 32,
                                              }}
                                            />
                                          }
                                          checkedIcon={
                                            <BsRecordCircle
                                              style={{
                                                color: "#fdb159",
                                                fontSize: 30,
                                                backgroundColor: "white",
                                                borderRadius: 20,
                                              }}
                                            />
                                          }
                                        />
                                      }
                                      label={
                                        <Typography
                                          style={{
                                            fontSize: 23,
                                            color: "#535151",
                                            paddingRight: "15px",
                                          }}
                                        >
                                          {choi}
                                        </Typography>
                                      }
                                    />
                                  </Box>
                                );
                              })}
                            </RadioGroup>
                          </FormControl>
                        </div>
                        <Grid item xs={12} lg={12} md={12}>
                          {checkRps === true ? (
                            <Button
                              onClick={() => onNext(ques.id, choice)}
                              style={{
                                width: "22rem",
                                fontSize: 24,
                                textTransform: "none",
                                height: 45,
                                marginBottom: 40,
                                borderRadius: 15,
                                backgroundColor: "#2B7CF6",
                              }}
                              variant="contained"
                            >
                              {btnName}
                              <ArrowCircleRightOutlinedIcon
                                style={{ paddingLeft: "1cm", fontSize: 65 }}
                              />
                            </Button>
                          ) : (
                            <div>
                              <h6
                                style={{
                                  fontSize: 22,
                                  color: "#A8A5A5",
                                  marginBottom: 40,
                                }}
                              >
                                You must provide an answer
                              </h6>
                            </div>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={4} lg={8}></Grid>
                  </div>
                );
              } else {
                return <div></div>;
              }
            })}
            {q === questions.length + 1 ? (
              <Grid item xs={11} lg={12} md={12}>
                <Button
                  onClick={onSubmit}
                  style={{
                    width: "20%",
                    fontSize: 24,
                    textTransform: "none",
                    height: 45,
                    marginBottom: 50,
                    borderRadius: 15,
                    backgroundColor: "#2B7CF6",
                  }}
                  variant="contained"
                >
                  {btnName}
                  <ArrowCircleRightOutlinedIcon
                    style={{ paddingLeft: "1cm", fontSize: 65 }}
                  />
                </Button>
              </Grid>
            ) : (
              <div></div>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
}

export default RatingForm;
