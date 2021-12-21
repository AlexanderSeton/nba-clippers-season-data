import React from "react";
import { Bar } from "react-chartjs-3";

const BarChart2 = function({ games }) {

    const generateBarChartData = function() {
        const data = {
            labels: [],
            datasets: [
                {
                    label: "Wins",
                    backgroundColor: ["green", "green", "green"],
                    borderColor: "",
                    borderWidth: 2,
                    hoverBorderColor: "black",
                    data: []
                },
                {
                    label: "Losses",
                    backgroundColor: ["rgba(255, 0, 0, 0.3)", "rgba(255, 0, 0, 0.3)", "rgba(255, 0, 0, 0.3)"],
                    borderColor: "",
                    borderWidth: 2,
                    hoverBorderColor: "black",
                    data: []
                },
                {
                    label: "Draws",
                    backgroundColor: ["#ffe4b2", "#ffe4b2", "#ffe4b2"],
                    borderColor: "#ffd27f",
                    borderWidth: 2,
                    hoverBorderColor: "black",
                    data: []
                }
            ]
        };
        if (games.length !== 0) {
            // opponentTeamName: [clipperWins, opponentWins, draws, clippersWinPercentage]
            const dataDict = {};
            for (let i=0; i<games.length; i++) {
                if (calculateWon(games[i]) === "homewon") {
                    dataDict[games[i].visitor_team.abbreviation] ? dataDict[games[i].visitor_team.abbreviation][0] += 1 : dataDict[games[i].visitor_team.abbreviation] = [1, 0, 0, 0];
                } else if (calculateWon(games[i]) === "awaywon") {
                    dataDict[games[i].home_team.abbreviation] ? dataDict[games[i].home_team.abbreviation][0] += 1 : dataDict[games[i].home_team.abbreviation] = [1, 0, 0, 0];
                } else if (calculateWon(games[i]) === "homelost") {
                    dataDict[games[i].visitor_team.abbreviation] ? dataDict[games[i].visitor_team.abbreviation][1] += 1 : dataDict[games[i].visitor_team.abbreviation] = [0, 1, 0, 0];
                } else if (calculateWon(games[i]) === "awaylost") {
                    dataDict[games[i].home_team.abbreviation] ? dataDict[games[i].home_team.abbreviation][1] += 1 : dataDict[games[i].home_team.abbreviation] = [0, 1, 0, 0];
                } else if (calculateWon(games[i]) === "homedraw") {
                    dataDict[games[i].visitor_team.abbreviation] ? dataDict[games[i].visitor_team.abbreviation][2] += 1 : dataDict[games[i].visitor_team.abbreviation] = [0, 0, 1, 0];
                } else if (calculateWon(games[i]) === "awaydraw") {
                    dataDict[games[i].home_team.abbreviation] ? dataDict[games[i].home_team.abbreviation][2] += 1 : dataDict[games[i].home_team.abbreviation] = [0, 0, 1, 0];
                }
            }

            // calc win percentage
            for (const [key, value] of Object.entries(dataDict)) {
                let totalNumberGames = value[0] + value[1] + value[2];
                let wonGames = value[0];
                let winPercentage = (wonGames / totalNumberGames) * 100;
                // console.log(winPercentage.toFixed(0));
                dataDict[key][3] = winPercentage;
            }
            
            // sort object and take only top 3
            const arrayAllTeamData = [];
            for (const [key, value] of Object.entries(dataDict)) {
                arrayAllTeamData.push([key, value]);
            }
            arrayAllTeamData.sort(function(a, b) {
                return b[1][3] - a[1][3];
            })

            // console.log(arrayAllTeamData);


            // order 100% win rate teams by number of games played
            const tempNewDataArray = [];
            for (let i=0; i<arrayAllTeamData.length-1; i++) {
                if (arrayAllTeamData[i][1][3] === 100) {
                    tempNewDataArray.push(arrayAllTeamData[i])
                }
            }
            tempNewDataArray.sort(function(a, b) {
                return b[1][0] - a[1][0];
            })

            // console.log(tempNewDataArray)

            const topData = tempNewDataArray.splice(0, 5);

            // assign to graph data
            for (let dataItem of topData) {
                data.datasets[0].backgroundColor.push("green");
                data.datasets[1].backgroundColor.push("rgba(255, 0, 0, 0.3)");
                data.datasets[2].backgroundColor.push("#ffe4b2");
                data.labels.push(`${dataItem[0]} (${dataItem[1][3]}%)`);
                data.datasets[0].data.push(dataItem[1][0]);
                data.datasets[1].data.push(dataItem[1][1]);
                data.datasets[2].data.push(dataItem[1][2]);
            }
            return data;
        }
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
                                fontColor: "black",
                                precision: 0
                            },
                            scaleLabel: {
                                display: true,
                                labelString: "Number Of Games",
                                fontSize: 25,
                                fontColor: "black",
                                fontStyle: "bold"
                            },
                            stacked: true
                        }],
                        xAxes: [{
                            ticks: {
                                fontSize: 22.5,
                                fontColor: "black"
                            },
                            scaleLabel: {
                                display: true,
                                labelString: "Opponent Teams",
                                fontSize: 25,
                                fontColor: "black",
                                fontStyle: "bold"
                            },
                            stacked: true
                        }]
                    },
                    title: {
                        display: true,
                        text: "Top 5 Win Percentages Against Teams",
                        fontSize: 35,
                        fontColor: "black"
                    }
                }}
            />
        </div>
    )
}

export default BarChart2;
