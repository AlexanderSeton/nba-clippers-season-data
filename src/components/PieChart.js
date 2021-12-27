import React from "react";
import { Pie } from "react-chartjs-3";

const PieChart = function({ games, teamAbreviation }) {

    const generatePieChartData = function() {
        const data = {
            labels: [
                "Won",
                "Lost"
            ],
            datasets: [{
                data: [],
                backgroundColor: [
                "green",
                "red"
                ],
                hoverBackgroundColor: [
                "lightgreen",
                "#F56776"
                ]
            }]
        };
        let won = 0;
        let lost = 0;
        for (let i=0; i<games.length; i++) {
            if (calculateWon(games[i]) === "won") {
                won +=1
            } else if (calculateWon(games[i]) === "lost") {
                lost += 1;
            }
        }
        const tempData = [won, lost];
        data.datasets[0].data = tempData;
        return data;
    }

    const calculateWon = function(game) {
        let homeScore = "";
        let opponentScore = "";
        if (game.home_team.abbreviation === teamAbreviation) {
            homeScore = game.home_team_score;
            opponentScore = game.visitor_team_score;
        } else {
            homeScore = game.visitor_team_score;
            opponentScore = game.home_team_score;
        }
        if (homeScore > opponentScore) {
            return "won";
        } else if (homeScore < opponentScore) {
            return "lost";
        }
    }

    return(
        <div>
            <Pie
                data={generatePieChartData()}
                height={400}
                options={{
                    maintainAspectRatio: false,
                    responsive: true,
                    title: {
                        display: true,
                        text: "Wins vs Losses",
                        fontSize: 35,
                        fontColor: "black"
                    }
                }}
            />
        </div>
    )
}

export default PieChart;
