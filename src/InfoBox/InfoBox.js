import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";

function InfoBox({ title, cases, total, changeGraph, chartstate, selected }) {
  let choosedColor
  let borderstyle
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  if (chartstate) {
    choosedColor = ((chartstate === 'cases' && "rgb(20, 64, 185)") ||
      (chartstate === 'recovered' && "rgb(46, 212, 60)") ||
      (chartstate === 'deaths' && "rgba(255,0,0,0.5)"))
  }
  if (selected) {
    borderstyle = ` 5px solid ${choosedColor}`
  }

  return (
    <Card style={{ borderBottom: borderstyle }} className="card" onClick={() => changeGraph(title)}>
      <CardContent  >
        <Typography className="card__title" color="textSecondary">
          Today's {capitalizeFirstLetter(title)}
        </Typography>
        <h2
          style={{
            color: choosedColor
          }}
          className="card__cases"
        >
          {cases}
        </h2>
        <Typography className="card__total" color="textSecondary">
          <strong>Total: {total}</strong>
        </Typography>
      </CardContent>
    </Card >
  );
}

export default InfoBox;
