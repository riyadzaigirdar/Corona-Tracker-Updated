import React, { useState, useEffect } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
  Button
} from "@material-ui/core";
import GitHubIcon from '@material-ui/icons/GitHub';
import { prettyPrintStat } from './utils'

import "./App.css";
import axios from "axios";
import InfoBox from "./InfoBox/InfoBox";
import Table from "./Table/Table";
import Chart from "./Chart/Chart"
import Map from "./Map/Map";
// need this below import for the map working 
import "leaflet/dist/leaflet.css"
import numeral from 'numeral'

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("all");
  const [info, setInfo] = useState({});
  const [chartstate, setChartState] = useState('cases')
  const [mapcenter, setMapCenter] = useState([51.505, -0.09])
  const [mapzoom, setMapZoom] = useState(2)

  useEffect(() => {
    axios.get("https://disease.sh/v3/covid-19/countries").then((res) => {
      setCountries(res.data.sort((a, b) => b.cases - a.cases));
    });
  }, []);

  useEffect(() => {
    const url = country === "all" ? `https://disease.sh/v3/covid-19/${country}` : `https://disease.sh/v3/covid-19/countries/${country}`;

    const fetchData = async () => {
      const response = await axios.get(url);
      setInfo(response.data);
    };
    fetchData();
  }, [country]);


  return (
    <div className="app">
      <div className="app__left">
        <div className="app__left__header">
          <h2>Covid-19 Tracker</h2>
          <div className="app__left__header__right">
            <Button href="https://github.com/riyadzaigirdar/Corona-Tracker-Updated" color="secondary" >
              <GitHubIcon /><strong style={{ marginLeft: '5px' }}> Github Code</strong></Button>
            <FormControl>
              <Select
                variant="outlined"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value)
                  countries.forEach((country) => {
                    if (country.country === e.target.value) {
                      setMapZoom(3)
                      return setMapCenter([country.countryInfo.lat, country.countryInfo.long])
                    }
                    if (e.target.value === 'all') {
                      setMapZoom(3)
                    }
                  })
                }}
              >
                <MenuItem value="all">Worldwide</MenuItem>
                {countries.length !== 0 &&
                  countries.map(({ country }, index) => (
                    <MenuItem key={index} value={country}>
                      {country}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="app__left__stats">
          {info.cases &&
            <>

              <InfoBox
                title="cases"
                chartstate={chartstate}
                cases={prettyPrintStat(info.todayCases)}
                total={numeral(info.cases).format("0.0a")}
                selected={chartstate === 'cases'}
                changeGraph={setChartState}
              />
              <InfoBox
                title="recovered"
                chartstate={chartstate}
                cases={prettyPrintStat(info.todayRecovered)}
                total={numeral(info.recovered).format("0.0a")}
                selected={chartstate === 'recovered'}
                changeGraph={setChartState}
              />
              <InfoBox
                title="deaths"
                chartstate={chartstate}
                cases={prettyPrintStat(info.todayDeaths)}
                total={numeral(info.deaths).format("0.0a")}
                selected={chartstate === 'deaths'}
                changeGraph={setChartState}
              />
            </>
          }
        </div>
        <Map cases={chartstate} countries={countries} center={mapcenter} zoom={mapzoom} />
      </div>
      <Card className="app__right">
        <CardContent>
          <h1>Cases By Country</h1>
          {countries.length !== 0 && <Table countries={countries} />}

          <h1>Chart</h1>
          <Chart chartstate={chartstate} country={country} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;

// 11bc0fd59be66e3e5a72b215adda62b6

// https://medium.com/python-in-plain-english/bypassing-captchas-using-python-45d96b248522
