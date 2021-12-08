import React from "react";
import reactDom from "react-dom";
import "./static/Game.css";

const Game = function({game}) {

    const convertDate = function() {
        const date = new Date(game.date);
        const localDate = date.toDateString("en-GB").substr(4);
        return localDate;
    }

    const checkHomeResult = function() {
        const homeScore = game.home_team_score;
        const awayScore = game.visitor_team_score;
        if (homeScore === awayScore) {
            return "orange";
        } else if (homeScore > awayScore) {
            return "green";
        } else if (homeScore < awayScore) {
            return "red";
        }
    }

    const checkAwayResult = function() {
        const homeScore = game.home_team_score;
        const awayScore = game.visitor_team_score;
        if (homeScore === awayScore) {
            return "orange";
        } else if (awayScore > homeScore) {
            return "green";
        } else if (awayScore < homeScore) {
            return "red";
        }
    }

    return(
        <div className="game-div">
            <p>{convertDate()}</p>
            <hr />
            <p style={{ color: checkHomeResult() }}>
                <strong>Home: </strong>{game.home_team.name} - {game.home_team_score}
            </p>
            <p style={{ color: checkAwayResult() }}>
                <strong>Away: </strong>{game.visitor_team.name} - {game.visitor_team_score}
            </p>
        </div>
    )
}

export default Game;
