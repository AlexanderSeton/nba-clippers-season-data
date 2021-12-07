import React, { useEffect, useState, useRef } from "react";
import GamesList from "../components/GamesList";
import Header from "../components/Header";

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

    return(
        <div>
            <Header />
            <GamesList games={games} />
        </div>
    )   
}

export default GamesContainer;
