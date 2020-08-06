import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";
import CountUp from "react-countup";

function InfoBox({ title, cases, total, changeGraph, selected }) {

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  console.log(selected)
  return (
    <Card className={`card ${selected && 'selected'}`} onClick={() => changeGraph(title)}>
      <CardContent>
        <Typography className="card__title" color="textSecondary">
          Today's {capitalizeFirstLetter(title)}
        </Typography>
        <h2 className="card__cases">
          {cases !== undefined && (
            <CountUp start={0} end={cases} duration={2.5} separator=","
            />
          )}
        </h2>
        <Typography className="card__total" color="textSecondary">
          <strong>Total: </strong>
          {total && (
            <CountUp
              start={0}
              end={total}
              duration={2.5}
              separator=","

            ></CountUp>
          )}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
