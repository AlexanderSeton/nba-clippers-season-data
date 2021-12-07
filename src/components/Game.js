import React from "react";
import "./static/Game.css";

const Game = function({game}) {

    const convertData = function() {
        const date = new Date(game.date);
        const localDate = date.toLocaleDateString("en-GB");
        return localDate;
    }

    return(
        <div className="game-div">
            <p>{convertData()}</p>
            <hr />
            <p><strong>Home Team: </strong>{game.home_team.name} - {game.home_team_score}</p>
            <p><strong>Away Team: </strong>{game.visitor_team.name} - {game.visitor_team_score}</p>

        </div>
    )
}

export default Game;
