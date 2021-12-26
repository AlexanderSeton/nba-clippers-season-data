import React, { useEffect, useState, useRef } from "react";
import GamesList from "../components/GamesList";
import Header from "../components/Header";
import Summary from "../components/Summary";
import Header2 from "../components/Header2";
import "./static/GamesContainer.css";
import TeamsContainer from "./TeamsContainer.js";

const GamesContainer = function() {

    const [date, setDate] = useState("");
    const [games, setGames] = useState([]);
    const [seasonStartDate, setSeasonStartDate] = useState("2021-10-19");

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
    }, [date])

    const getCurrentDate = async function() {
        let currentDate = new Date().toJSON().slice(0,10).replace(/-/g,'/');
        currentDate = currentDate.replace("/", "-");
        currentDate = currentDate.replace("/", "-");
        await setDate(currentDate);
    }

    const getData = async function() {
        const response = await fetch(`https://www.balldontlie.io/api/v1/games?per_page=100&seasons[]=2021&team_ids[]=13&end_date=${date}&start_date=${seasonStartDate}`);
        const data = await response.json();
        const justGames = await data.data;
        const sortedByDateGames = await justGames.sort(function(a, b) {
            return b.id - a.id;
        })
        // check for bad data (games with no points for either team)
        for await (let game of sortedByDateGames) {
            if (game["home_team_score"] === 0 || game["visitor_team_score"] === 0) {
                const indexGameToDelete = await sortedByDateGames.indexOf(game);
                await sortedByDateGames.splice(indexGameToDelete, 1);
            }
        }
        await setGames(sortedByDateGames);
    }

    return(
        <div className="games-container-div">
            <Header2 />
            <TeamsContainer />
            {games!==[] ?<Summary games={games} /> : null}
            {games!==[] ?<GamesList games={games} /> : null}
        </div>
    )   
}

export default GamesContainer;
