import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Line } from "react-chartjs-2";

let start = 0
let end = 1000

function Chart({ country, chartstate }) {
    const [data, setData] = useState({})


    // "https://disease.sh/v3/covid-19/historical/all?lastdays=120"

    useEffect(() => {
        const fetchData = async () => {
            axios.get(`https://disease.sh/v3/covid-19/historical/${country}?lastdays="120"`)
                .then(res => {
                    (country === 'all' ? setData(res.data) : setData(res.data.timeline))
                })
        }
        fetchData()


    }, [country])

    console.log(chartstate)
    return (
        <div>
            {data?.cases && chartstate !== undefined &&
                (<Line
                    className="chart"
                    data={{
                        labels: Object.keys(data[chartstate]).map((key, index) => key),
                        datasets: [
                            {
                                data: Object.keys(data[chartstate]).map((key, index) => {
                                    if (index === 0) {
                                        start = data[chartstate][key]
                                    }
                                    end = data[chartstate][key]
                                    return data[chartstate][key]
                                }),
                                label: chartstate,
                                pointRadius: 0,
                                backgroundColor: (chartstate === 'cases' && "rgb(20, 64, 185)") ||
                                    (chartstate === 'recovered' && "rgb(46, 212, 60)") ||
                                    (chartstate === 'deaths' && "rgba(255,0,0,0.5)")
                                ,


                            },
                        ]
                    }}
                    options={{
                        legend: { display: false },
                        title: { display: true, text: `Current ${chartstate} ${(country === "all") ? "Over The World" : `in ${country}`}` },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    min: start,
                                    max: end,
                                    stepSize: Math.floor((end - start) / 3),
                                }
                            }]
                        }
                    }}
                />)
            }

        </div>
    )
}

export default Chart
