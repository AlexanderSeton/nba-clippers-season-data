import React from "react";
import Game from "./Game";
import "./static/GameList.css";

const GamesList = function({games}) {

    const gameItems = games.map((game, index) => {
        return <Game game={game} key={index} />
    })

    return(
        <div className="games-div">
            {gameItems}
        </div>
    )
}

export default GamesList;
