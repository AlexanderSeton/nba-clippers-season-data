import React from "react";
import Game from "./Game";

const GamesList = function({games}) {

    const gameItems = games.map((game, index) => {
        return <Game game={game} key={index} />
    })

    return(
        <div>
            {gameItems}
        </div>
    )
}

export default GamesList;
