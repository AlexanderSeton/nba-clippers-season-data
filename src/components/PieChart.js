import React from "react";
import { Pie } from "react-chartjs-3";

const PieChart = function({ games }) {

    const generatePieChartData = function() {
        const data = {
            labels: [
                "Won",
                "Lost",
                "Draw"
            ],
            datasets: [{
                data: [],
                backgroundColor: [
                "green",
                "red",
                "orange"
                ],
                hoverBackgroundColor: [
                "lightgreen",
                "#F56776",
                "#FFD580"
                ]
            }]
        };
        let won = 0;
        let lost = 0;
        let draw = 0;
        for (let i=0; i<games.length; i++) {
            if (calculateWon(games[i]) === "won") {
                won +=1
            } else if (calculateWon(games[i]) === "lost") {
                lost += 1;
            } else if (calculateWon(games[i]) === "draw") {
                draw += 1;
            }
        }
        const tempData = [won, lost, draw];
        data.datasets[0].data = tempData;
        return data;
    }

    const calculateWon = function(game) {
        let clippersScore = "";
        let opponentScore = "";
        if (game.home_team.abbreviation === "LAC") {
            clippersScore = game.home_team_score;
            opponentScore = game.visitor_team_score;
        } else {
            clippersScore = game.visitor_team_score;
            opponentScore = game.home_team_score;
        }
        if (clippersScore === opponentScore) {
            return "draw";
        } else if (clippersScore > opponentScore) {
            return "won";
        } else if (clippersScore < opponentScore) {
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
                        text: "Wins vs Losses vs Draws",
                        fontSize: 35,
                        fontColor: "black"
                    }
                }}
            />
        </div>
    )
}

export default PieChart;
