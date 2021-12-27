import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import "./static/Chart.css";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";
import BarChart2 from "../components/BarChart2";
import Summary from "../components/Summary";
import LineChart from "../components/LineChart";
import Header2 from "../components/Header2";
import TeamsContainer from "./TeamsContainer";

const Chart = function() {

    const [date, setDate] = useState("");
    const [games, setGames] = useState([]);
    const [seasonStartDate, setSeasonStartDate] = useState("2021-10-19");
    const [selectedTeam, setSelectedTeam] = useState({});

    const firstUpdate = useRef(true);

    useEffect(() => {
        getCurrentDate();
    }, [])

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        getData();
    }, [selectedTeam])

    const getCurrentDate = async function() {
        let currentDate = new Date().toJSON().slice(0,10).replace(/-/g,'/');
        let day = parseInt(currentDate.substr(8, 9));
        day -= 1;
        const singleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        if (singleNumbers.includes(day)) {
            day = "0" + day;
        }
        currentDate = currentDate.substr(0, 8) + day;
        currentDate = currentDate.replace("/", "-");
        currentDate = currentDate.replace("/", "-");
        await setDate(currentDate);
    }

     const getData = async function() {
        const teamId = await parseInt(selectedTeam["id"]);
        const response = await fetch(`https://www.balldontlie.io/api/v1/games?per_page=100&seasons[]=2021&team_ids[]=${teamId}&end_date=${date}&start_date=${seasonStartDate}`);
        const data = await response.json();
        const justGames = await data["data"];
        const sortedByDateGames = await justGames.sort(function(a, b) {
            return a.id - b.id;
        })
        // check for bad data (games with no points for either team)
        for (let game of sortedByDateGames) {
            if (game["home_team_score"] === 0 || game["visitor_team_score"] === 0) {
                let indexGameToDelete = sortedByDateGames.indexOf(game);
                sortedByDateGames.splice(indexGameToDelete, 1);
            }
        }
        setGames(sortedByDateGames);
    }

    const handleTeamInput = (selectedTeam) => {
        setSelectedTeam(selectedTeam);
    }

    return(
        <div className="charts-container-div">
            <Header2 />
            <TeamsContainer handleTeamInput={handleTeamInput} />
            {games!==[] && selectedTeam!=={} ?<Summary games={games} teamAbreviation={selectedTeam["abbreviation"]} /> : null}
            <div className="charts-div">
                <div className="pie-chart-div">
                    {games!==[] && selectedTeam!=={} ? <PieChart games={games} teamAbreviation={selectedTeam["abbreviation"]} /> : null}
                </div>
                <div className="bar-chart-div">
                    {games!==[] && selectedTeam!=={} ? <BarChart games={games} teamAbreviation={selectedTeam["abbreviation"]} /> : null}
                </div>
            </div>
            <div className="line-chart-div">
                    {games!==[] && selectedTeam!=={} ? <LineChart games={games} teamAbreviation={selectedTeam["abbreviation"]} /> : null}
            </div>
            <div className="bar-chart-2-div">
                {games!==[] && selectedTeam!=={} ? <BarChart2 games={games} teamAbreviation={selectedTeam["abbreviation"]} /> : null}
            </div>
        </div>
    )
}

export default Chart;
