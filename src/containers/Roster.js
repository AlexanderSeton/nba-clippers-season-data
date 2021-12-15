import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import RosterList from "../components/RosterList";
import "./static/Roster.css";

const Roster = function() {

    const [roster, setRoster] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    const getData = async function() {
        const year = "2021";
        const team = "clippers"
        const response = await fetch(`http://data.nba.net/v2015/json/mobile_teams/nba/${year}/teams/${team}_roster.json`);
        const data = await response.json();
        const justRoster = await data.t.pl;
        await setRoster(justRoster);
    }

    return(
        <div>
            <Header />
            <RosterList roster={roster} />
        </div>
    )
}

export default Roster;
