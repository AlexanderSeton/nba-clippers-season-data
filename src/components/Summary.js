import React from "react";
import "./static/Summary.css";

const Summary = function({ games }) {

    const calculateWon = function() {
        if (games === []) {
            console.log("returned")
            return;
        } else {
            let won = 0;
            let lost = 0;
            let drew = 0;
            let clippersScore;
            let opponentScore;
            for (let i=0; i<games.length; i++) {
                if (games[i].home_team.abbreviation === "LAC") {
                    clippersScore = games[i].home_team_score;
                    opponentScore = games[i].visitor_team_score;
                } else {
                    clippersScore = games[i].visitor_team_score;
                    opponentScore = games[i].home_team_score;
                }
                if (clippersScore === opponentScore) {
                    drew += 1;
                } else if (clippersScore > opponentScore) {
                    won += 1;
                } else if (clippersScore < opponentScore) {
                    lost += 1;
                }
            }
            return [won, lost, drew];
        }
    }

    return(
        <div className="summary-div">
            <h2>Season Summary</h2>
            <table className="summary-table">
                <thead>
                    <tr>
                        <th>No. Games</th>
                        <th>Won</th>
                        <th>Lost</th>
                        <th>Drew</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{games.length}</td>
                        <td>{calculateWon()[0]}</td>
                        <td>{calculateWon()[1]}</td>
                        <td>{calculateWon()[2]}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Summary;
