import React from "react";
import Game from "./Game";
import "./static/GameList.css";

const GamesList = function({games}) {

    const gameItems = games.map((game, index) => {
        return <Game game={game} key={index} />
    })

    return(
        <div className="games-list-component-div">
            <h2>Played Games (Oldest &#8594; Newest)</h2>
            <div className="games-div">
                {gameItems}
            </div>
        </div>
    )
}

export default GamesList;
