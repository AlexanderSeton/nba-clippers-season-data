import React from "react";
import "./static/Player.css";

const Player = function({player}) {

    const getPlayerCountry = function() {
        const dataArray = player.hcc.split("/");
        return dataArray[1];
    }

    return(
        <div className="player">
            <h2>{player.fn} {player.ln} {player.num}</h2>
            <p><strong>Height: </strong>{player.ht}</p>
            <p><strong>Weight: </strong>{player.wt}lbs</p>
            <p><strong>DoB: </strong>{player.dob}</p>
            <p><strong>Country: </strong>{getPlayerCountry()}</p>
        </div>
    )
}

export default Player;
