import React from "react";
import { Line } from "react-chartjs-3";


const LineChart = function({ games }) {

    const generateLineChartData = function() {
        const data = {
            labels: [],
            datasets: [
                {
                    label: "Win Strength",
                    data: [],
                    fill: false,
                    borderColor: "black",
                    tension: 0.1
                }              
            ]
        };
        for (let game of games) {
            if (calculateWon(game) === "homewon") {
                data.labels.push(game.visitor_team.name + `(${convertDate(game)})`);
                data.datasets[0].data.push(game.home_team_score - game.visitor_team_score);
            }
            if (calculateWon(game) === "awaywon") {
                data.labels.push(game.home_team.name + `(${convertDate(game)})`);
                data.datasets[0].data.push(game.visitor_team_score - game.home_team_score);
            }
        }
        return data;
    }

    const calculateWon = function(game) {
        let clippersScore = "";
        let opponentScore = "";
        let clippersLocation = "";
        if (game.home_team.abbreviation === "LAC") {
            clippersScore = game.home_team_score;
            opponentScore = game.visitor_team_score;
            clippersLocation = "home";
        } else {
            clippersScore = game.visitor_team_score;
            opponentScore = game.home_team_score;
            clippersLocation = "away";
        }
        if (clippersScore === opponentScore) {
            return clippersLocation + "draw";
        } else if (clippersScore > opponentScore) {
            return clippersLocation + "won";
        } else if (clippersScore < opponentScore) {
            return clippersLocation + "lost";
        }
    }

    const convertDate = function(game) {
        const date = new Date(game.date);
        const localDate = date.toDateString("en-GB").substr(4, 3);
        return localDate;
    }

    return(
        <div>
            <Line
                data={generateLineChartData()}
                height={500}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                fontSize: 25,
                                fontColor: "black"
                            },
                            scaleLabel: {
                                display: true,
                                labelString: "Points Win Margin",
                                fontSize: 25,
                                fontColor: "black",
                                fontStyle: "bold"
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                fontSize: 20,
                                fontColor: "black"
                            },
                            scaleLabel: {
                                display: true,
                                labelString: "Opponent Team (month)",
                                fontSize: 25,
                                fontColor: "black",
                                fontStyle: "bold"
                            }
                        }]
                    },
                    title: {
                        display: true,
                        text: "Win Strengths",
                        fontSize: 35,
                        fontColor: "black"
                    }
                }}
            />
        </div>
    )
}

export default LineChart;
