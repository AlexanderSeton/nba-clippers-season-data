import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Header2 from "../components/Header2";
import RosterList from "../components/RosterList";
import "./static/Roster.css";
import TeamsContainer from "./TeamsContainer";

const Roster = function() {

    const [roster, setRoster] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState({});
    
    const firstRender = useRef(true);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            console.log("returned")
            return;
        }
        getData();
    }, [selectedTeam])

    const getData = async function() {
        const year = "2021";
        let team = await selectedTeam["name"].toLowerCase();
        team = await team.replace(" ", "_");
        const response = await fetch(`https://data.nba.net/v2015/json/mobile_teams/nba/${year}/teams/${team}_roster.json`);
        const data = await response.json();
        const justRoster = await data.t.pl;
        await setRoster(justRoster);
    }

    const handleTeamInput = (selectedTeam) => {
        setSelectedTeam(selectedTeam);
    }

    return(
        <div>
            <Header2 />
            <TeamsContainer handleTeamInput={handleTeamInput} />
            <RosterList roster={roster} />
        </div>
    )
}

export default Roster;
