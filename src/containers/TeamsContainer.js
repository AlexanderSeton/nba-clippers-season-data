import React, { useEffect, useRef, useState } from "react";
import Header2 from "../components/Header2";
import "./static/TeamsContainer.css";

const TeamsContainer = function() {

    const [currentDate, setCurrentDate] = useState("");
    const [seasonStartDate, setSeasonStartDate] = useState("2021-10-19");
    const [allGames, setAllGames] = useState([]);

    const firstUpdate = useRef(0);

    useEffect(() => {
        getCurrentDate();
    }, [])

    useEffect(() => {
        if (firstUpdate.current === 0) {
            firstUpdate.current += 1;
            return;
        }
        getSeasonData();
    }, [currentDate])

    const getCurrentDate = async function() {
        let currentDate = new Date().toJSON().slice(0,10).replace(/-/g,'/');
        let day = parseInt(currentDate.substring(8, 9));
        day -= 1;
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
        const tempAllGames = await allGames.concat(pageGames)
        await setAllGames(tempAllGames)
        const numberPages = await data["meta"]["total_pages"]
        if (numberPages > 1) {
            let tempOtherPageGames = [];
            for (let i=2; i<=numberPages; i++) {
                const response = await fetch(`https://www.balldontlie.io/api/v1/games?seasons[]=2021&per_page=100&start_date=${seasonStartDate}&end_date=${currentDate}&page=${i}`);
                const data = await response.json();
                const pageGames = await data["data"];
                tempOtherPageGames = await tempOtherPageGames.concat(pageGames);
            }
            const tempAllGames2 = await allGames.concat(tempOtherPageGames);
            await setAllGames(tempAllGames2);
        }
        const sortedByDateGames = await allGames.sort(function(a, b) {
            return b["id"] - a["id"];
        })
        console.log(sortedByDateGames)
        // await setAllGames(sortedByDateGames);
    }

    return(
        <div>
            <Header2 />
        </div>
    )
}

export default TeamsContainer;
