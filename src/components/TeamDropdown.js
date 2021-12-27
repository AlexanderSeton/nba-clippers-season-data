import React from "react";
import "./static/TeamDropdown.css";

const TeamDropdown = function({ team }) {

    return(
        <option value={team} id={team["abbreviation"]}  onSelect={(event) => {
            console.log(event.target);
        }}>
            {team["full_name"]}
        </option>
    )
}

export default TeamDropdown;
