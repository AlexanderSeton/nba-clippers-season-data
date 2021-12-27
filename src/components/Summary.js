import React from "react";
import "./static/Summary.css";

const Summary = function({ games, teamAbreviation }) {

    const getLengths = function() {
        let counter = 0;
        for (let game of games) {
            if (game["home_team_score"]!==0 && game["visitor_team_score"]!==0) {
                counter ++;
            }
        }
        return counter;
    }

    const calculateWon = function() {
        if (games === []) {
            console.log("returned")
            return;
        } else {
            let won = 0;
            let lost = 0;
            let homeScore;
            let opponentScore;
            for (let i=0; i<games.length; i++) {
                if (games[i].home_team.abbreviation === teamAbreviation) {
                    homeScore = games[i].home_team_score;
                    opponentScore = games[i].visitor_team_score;
                } else {
                    homeScore = games[i].visitor_team_score;
                    opponentScore = games[i].home_team_score;
                }
                if (homeScore > opponentScore) {
                    won += 1;
                } else if (homeScore < opponentScore) {
                    lost += 1;
                }
            }
            return [won, lost];
        }
    }

    return(
        <div className="summary-div">
            <h2>Season Summary</h2>
            <table className="summary-table">
                <thead>
                    <tr className="tr-headings">
                        <th className="s-th">No. Games</th>
                        <th className="s-th">Won</th>
                        <th className="s-th">Lost</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="tr-data">
                        <td className="s-td">{getLengths()}</td>
                        <td className="s-td">{calculateWon()[0]}</td>
                        <td className="s-td">{calculateWon()[1]}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Summary;
