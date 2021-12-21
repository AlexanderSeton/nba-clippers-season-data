import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import "./static/Chart.css";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";
import BarChart2 from "../components/BarChart2";
import Summary from "../components/Summary";
import LineChart from "../components/LineChart";
import Header2 from "../components/Header2";

const Chart = function() {

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
        <div className="charts-container-div">
            <Header2 />
            {games!==[] ?<Summary games={games} /> : null}
            <div className="charts-div">
                <div className="pie-chart-div">
                    {games!==[] ? <PieChart games={games} /> : null}
                </div>
                <div className="bar-chart-div">
                    {games!==[] ? <BarChart games={games} /> : null}
                </div>
            </div>
            <div className="line-chart-div">
                    {games!==[] ? <LineChart games={games} /> : null}
            </div>
            <div className="bar-chart-2-div">
                {games!==[] ? <BarChart2 games={games} /> : null}
            </div>
        </div>
    )
}

export default Chart;
