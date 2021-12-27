import React, { useEffect, useState, useRef } from "react";
import "./static/TeamsContainer.css";
import Header2 from "../components/Header2.js";

const TeamsContainer = function({ handleTeamInput }) {

    const [team, setTeam] = useState();
    const [allTeams, setAllTeams] = useState([]);

    const firstRender = useRef(true);

    useEffect(() => {
        getTeamsList();
    }, [])

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        handleTeamInput(team);
    }, [team])

    const getTeamsList = async function() {
        const response = await fetch("https://www.balldontlie.io/api/v1/teams");
        const data = await response.json();
        const teamsData = await data["data"];
        setTeam(teamsData[0]);
        setAllTeams(teamsData);
    }

    const handleDropdownChange = function(event) {
        const teamAbbreviatiom = event.target.value;
        const indexOfTeam = allTeams.findIndex((team) => team["abbreviation"] === teamAbbreviatiom);
        setTeam(allTeams[indexOfTeam]);
    }

    return(
        <div className="team-select-form-div">
            <form className="team-select-form">
                <label><h2>Choose A Team: </h2></label>
                {allTeams.length === 30 ? 
                <select name="team-select-dropdown" className="team-select-dropdown" onChange={handleDropdownChange}>
                    <option value={allTeams[0]["abbreviation"]}>{allTeams[0]["full_name"]}</option>
                    <option value={allTeams[1]["abbreviation"]}>{allTeams[1]["full_name"]}</option>
                    <option value={allTeams[2]["abbreviation"]}>{allTeams[2]["full_name"]}</option>
                    <option value={allTeams[3]["abbreviation"]}>{allTeams[3]["full_name"]}</option>
                    <option value={allTeams[4]["abbreviation"]}>{allTeams[4]["full_name"]}</option>
                    <option value={allTeams[5]["abbreviation"]}>{allTeams[5]["full_name"]}</option>
                    <option value={allTeams[6]["abbreviation"]}>{allTeams[6]["full_name"]}</option>
                    <option value={allTeams[7]["abbreviation"]}>{allTeams[7]["full_name"]}</option>
                    <option value={allTeams[8]["abbreviation"]}>{allTeams[8]["full_name"]}</option>
                    <option value={allTeams[9]["abbreviation"]}>{allTeams[9]["full_name"]}</option>
                    <option value={allTeams[10]["abbreviation"]}>{allTeams[10]["full_name"]}</option>
                    <option value={allTeams[11]["abbreviation"]}>{allTeams[11]["full_name"]}</option>
                    <option value={allTeams[12]["abbreviation"]}>{allTeams[12]["full_name"]}</option>
                    <option value={allTeams[13]["abbreviation"]}>{allTeams[13]["full_name"]}</option>
                    <option value={allTeams[14]["abbreviation"]}>{allTeams[14]["full_name"]}</option>
                    <option value={allTeams[15]["abbreviation"]}>{allTeams[15]["full_name"]}</option>
                    <option value={allTeams[16]["abbreviation"]}>{allTeams[16]["full_name"]}</option>
                    <option value={allTeams[17]["abbreviation"]}>{allTeams[17]["full_name"]}</option>
                    <option value={allTeams[18]["abbreviation"]}>{allTeams[18]["full_name"]}</option>
                    <option value={allTeams[19]["abbreviation"]}>{allTeams[19]["full_name"]}</option>
                    <option value={allTeams[20]["abbreviation"]}>{allTeams[20]["full_name"]}</option>
                    <option value={allTeams[21]["abbreviation"]}>{allTeams[21]["full_name"]}</option>
                    <option value={allTeams[22]["abbreviation"]}>{allTeams[22]["full_name"]}</option>
                    <option value={allTeams[23]["abbreviation"]}>{allTeams[23]["full_name"]}</option>
                    <option value={allTeams[24]["abbreviation"]}>{allTeams[24]["full_name"]}</option>
                    <option value={allTeams[25]["abbreviation"]}>{allTeams[25]["full_name"]}</option>
                    <option value={allTeams[26]["abbreviation"]}>{allTeams[26]["full_name"]}</option>
                    <option value={allTeams[27]["abbreviation"]}>{allTeams[27]["full_name"]}</option>
                    <option value={allTeams[28]["abbreviation"]}>{allTeams[28]["full_name"]}</option>
                    <option value={allTeams[29]["abbreviation"]}>{allTeams[29]["full_name"]}</option>
                </select> 
                : null}
            </form>
        </div>
    )
}

export default TeamsContainer;
