import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import { Pie } from "react-chartjs-3";

const Chart = function() {

    const [date, setDate] = useState("");
    const [games, setGames] = useState([]);

    const firstUpdate = useRef(true);
    const firstUpdate2 = useRef(true);

    useEffect(() => {
        getCurrentDate();
    }, [])

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        getData();
    }, [date])

    useEffect(() => {
        if (firstUpdate2.current) {
            firstUpdate2.current = false;
            return;
        }
        generatePieChartData();
    }, [games])

    const getCurrentDate = async function() {
        const currentDate = new Date().toJSON().slice(0,10).replace(/-/g,'/');
        await setDate(currentDate);
    }

    const getData = async function() {
        const response = await fetch("https://www.balldontlie.io/api/v1/games?per_page=100&seasons[]=2021&team_ids[]=13&end_date=2021-12-08");
        const data = await response.json();
        const justGames = await data.data;
        const sortedByDateGames = await justGames.sort(function(a, b) {
            return a.id - b.id;
        })
        await setGames(sortedByDateGames);
    }

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
                "lightred",
                "lightorange"
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
            <Header />
            <Pie data={generatePieChartData()} />
        </div>
    )
}

export default Chart;
