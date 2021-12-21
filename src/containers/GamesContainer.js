import React, { useEffect, useState, useRef } from "react";
import GamesList from "../components/GamesList";
import Header from "../components/Header";
import Summary from "../components/Summary";
import Header2 from "../components/Header2";
import "./static/GamesContainer.css";

const GamesContainer = function() {

    const [date, setDate] = useState("");
    const [games, setGames] = useState([]);

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
        const response = await fetch(`https://www.balldontlie.io/api/v1/games?per_page=100&seasons[]=2021&team_ids[]=13&end_date=${date}`);
        const data = await response.json();
        const justGames = await data.data;
        const sortedByDateGames = await justGames.sort(function(a, b) {
            return a.id - b.id;
        })
        await setGames(sortedByDateGames);
    }

    return(
        <div className="games-container-div">
            <Header2 />
            {games!==[] ?<Summary games={games} /> : null}
            {games!==[] ?<GamesList games={games} /> : null}
        </div>
    )   
}

export default GamesContainer;
