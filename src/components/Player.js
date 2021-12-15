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
            <p>Height: {player.ht}</p>
            <p>Weight: {player.wt}lbs</p>
            <p>DoB: {player.dob}</p>
            <p>Country: {getPlayerCountry()}</p>
        </div>
    )
}

export default Player;
