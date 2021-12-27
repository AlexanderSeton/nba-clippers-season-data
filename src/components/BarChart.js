import React from "react";
import { Bar } from "react-chartjs-3";

const BarChart = function({ games, teamAbreviation }) {

    const generateBarChartData = function() {
        const data = {
            labels: ["Home Wins", "Away Wins", "Home Losses", "Away Losses"],
            datasets: [
                {
                    backgroundColor: ["green", "green", "red", "red"],
                    borderColor: "",
                    borderWidth: 2,
                    hoverBackgroundColor: ["lightgreen", "lightgreen", "#F56776", "#F56776"],
                    hoverBorderColor: "black",
                    data: []
                }
            ]
        };
        let homeWins = 0;
        let awayWins = 0;
        let homeLosses = 0;
        let awayLosses = 0;

        for (let i=0; i<games.length; i++) {
            if (calculateWon(games[i]) === "homewon") {
                homeWins += 1;
            } else if (calculateWon(games[i]) === "awaywon") {
                awayWins += 1;
            } else if (calculateWon(games[i]) === "homelost") {
                homeLosses += 1;
            } else if (calculateWon(games[i]) === "awaylost") {
                awayLosses += 1;
            }
        }
        const tempData = [homeWins, awayWins, homeLosses, awayLosses];
        data.datasets[0].data = tempData;
        return data;
    }

    const calculateWon = function(game) {
        let clippersScore = "";
        let opponentScore = "";
        let clippersLocation = "";
        if (game.home_team.abbreviation === teamAbreviation) {
            clippersScore = game.home_team_score;
            opponentScore = game.visitor_team_score;
            clippersLocation = "home";
        } else {
            clippersScore = game.visitor_team_score;
            opponentScore = game.home_team_score;
            clippersLocation = "away";
        }
        if (clippersScore > opponentScore) {
            return clippersLocation + "won";
        } else if (clippersScore < opponentScore) {
            return clippersLocation + "lost";
        }
    }

    return(
        <div>
            <Bar
                data={generateBarChartData()}
                // width={100}
                height={400}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                fontSize: 25,
                                fontColor: "black"
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                fontSize: 25,
                                fontColor: "black"
                            }
                        }]
                    },
                    title: {
                        display: true,
                        text: "Home vs Away Results",
                        fontSize: 35,
                        fontColor: "black"
                    }
                }}
            />
        </div>
    )
}

export default BarChart;
