import React from "react";
import Game from "./Game";
import "./static/GameList.css";

const GamesList = function({ games, teamAbreviation }) {

    const gameItems = games.map((game, index) => {
        if (game["home_team_score"]===0 || game["visitor_team_score"]===0) {
            return;
        }
        return <Game game={game} key={index} teamAbreviation={teamAbreviation} />
    })

    return(
        <div className="games-list-component-div">
            <h2>Played Games (New &#8594; Old)</h2>
            <div className="games-div">
                {gameItems}
            </div>
        </div>
    )
}

export default GamesList;
