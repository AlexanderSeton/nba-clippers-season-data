import React, { useEffect, useRef, useState } from "react";
import Header2 from "../components/Header2";
import Table from "../components/Table";
import "./static/TableContainer.css";

const TableContainer = function() {

    const [currentDate, setCurrentDate] = useState("");
    const [seasonStartDate, setSeasonStartDate] = useState("2021-10-19");
    const [allGames, setAllGames] = useState([]);
    const [teamsList, setTeamsList] = useState({});
    const [dataPrepared, setDataPrepared] = useState(false);

    const firstUpdate = useRef(0);
    const firstUpdate2 = useRef(0);

    useEffect(() => {
        getCurrentDate();
        getTeamsList();
    }, [])

    useEffect(() => {
        if (firstUpdate.current === 0) {
            firstUpdate.current += 1;
            return;
        }
        getSeasonData();
    }, [currentDate])

    useEffect(() => {
        if (firstUpdate2.current === 0) {
            firstUpdate2.current += 1;
            return;
        }
        rankTeams();
    }, [allGames])

    const getCurrentDate = async function() {
        let currentDate = new Date().toJSON().slice(0,10).replace(/-/g,'/');
        let day = parseInt(currentDate.substring(8, 10));
        if (day !== 1) {
            day -= 1;
        }
        const singleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        if (singleNumbers.includes(day)) {
            day = "0" + day;
        }
        currentDate = currentDate.substring(0, 8) + day;
        currentDate = currentDate.replace("/", "-");
        currentDate = currentDate.replace("/", "-");
        await setCurrentDate(currentDate);
    }

    const getSeasonData = async function() {
        const response = await fetch(`https://www.balldontlie.io/api/v1/games?seasons[]=2021&per_page=100&start_date=${seasonStartDate}&end_date=${currentDate}&page=1`);
        const data = await response.json();
        const pageGames = await data["data"]
        const firstPageGames = await [...allGames, ...pageGames];
        let tempAllGames = [];
        const numberPages = await data["meta"]["total_pages"]
        if (numberPages > 1) {
            let otherPageGames = [];
            for (let i=2; i<=numberPages; i++) {
                const response = await fetch(`https://www.balldontlie.io/api/v1/games?seasons[]=2021&per_page=100&start_date=${seasonStartDate}&end_date=${currentDate}&page=${i}`);
                const data = await response.json();
                const pageGames = await data["data"];
                otherPageGames = await [...otherPageGames, ...pageGames];
            }
            tempAllGames = [...firstPageGames, ...otherPageGames];
        } else {
            tempAllGames = firstPageGames;
        }
        const sortedByDateGames = await tempAllGames.sort(function(a, b) {
            return a["id"] - b["id"];
        })
        // check for bad data (games with no points for either team)
        for (let game of sortedByDateGames) {
            if (game["home_team_score"] === 0 || game["visitor_team_score"] === 0) {
                const indexGameToDelete = sortedByDateGames.indexOf(game);
                sortedByDateGames.splice(indexGameToDelete, 1);
            }
        }
        await setAllGames(sortedByDateGames);
    }

    const getTeamsList = async function() {
        const response = await fetch("https://www.balldontlie.io/api/v1/teams");
        const formatResponse = await response.json();
        const data = await formatResponse["data"];
        const tempTeamsList = {"East": [], "West": []};
        for (let team of data) {
            team["win"] = 0;
            team["loss"] = 0;
            team["winPct"] = 0;
            if (team["conference"] === "East") {
                tempTeamsList["East"].push(team);
            } else {
                tempTeamsList["West"].push(team);
            }
        }
        await setTeamsList(tempTeamsList);
    }

    const rankTeams = async function() {
        for await (let game of allGames) {
            if (game["home_team_score"] > game["visitor_team_score"]) {
                const homeTeamIndex = await teamsList[game["home_team"]["conference"]].findIndex((team) => team["id"] === game["home_team"]["id"]);
                const awayTeamIndex = await teamsList[game["visitor_team"]["conference"]].findIndex((team) => team["id"] === game["visitor_team"]["id"]);
                teamsList[game["home_team"]["conference"]][homeTeamIndex]["win"] += 1;
                teamsList[game["visitor_team"]["conference"]][awayTeamIndex]["loss"] += 1;
            } else if (game["home_team_score"] < game["visitor_team_score"]) {
                const homeTeamIndex = await teamsList[game["home_team"]["conference"]].findIndex((team) => team["id"] === game["home_team"]["id"]);
                const awayTeamIndex = await teamsList[game["visitor_team"]["conference"]].findIndex((team) => team["id"] === game["visitor_team"]["id"]);
                teamsList[game["home_team"]["conference"]][homeTeamIndex]["loss"] += 1;
                teamsList[game["visitor_team"]["conference"]][awayTeamIndex]["win"] += 1;
            }
        }
        // calculate winPct
        for (let conference in teamsList) {
            for (let team of teamsList[conference]) {
                let winPercentage = (team["win"] / (team["win"] + team["loss"])) * 100;
                winPercentage = winPercentage.toFixed(1);
                team["winPct"] = winPercentage;
            }
        }
        for (let conference in teamsList) {
            const sortByWinPctTeams = await teamsList[conference].sort(function(a, b) {
                return b["winPct"] - a["winPct"];
            })
            teamsList[conference] = await sortByWinPctTeams;
        }
        setDataPrepared(true);
    }

    return(
        <div className="table-container-div">
            <Header2 />
            <div className="tables-div">
                <div className="table-div">
                    <h1>Eastern Conference</h1>
                    {dataPrepared ? <Table teamData={teamsList["East"]}  /> : null}
                </div>
                <div className="table-div">
                    <h1>Western Conference</h1>
                    {dataPrepared ? <Table teamData={teamsList["West"]} /> : null}
                </div>
            </div>
        </div>
    )
}

export default TableContainer;
