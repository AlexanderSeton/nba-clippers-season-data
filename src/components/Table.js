import React from "react";
import "./static/Table.css";
import TableRow from "./TableRow";

const Table = function({ teamData }) {

    const teamItems = teamData.map((team, index) => {
        return <TableRow team={team} index={index} key={index} />
    })

    return(
        <div>
            <table className="league-table">
                <thead>
                    <tr className="league-heading-tr">
                        <th className="league-th">Rank</th>
                        <th className="league-th">Team</th>
                        <th className="league-th">Wins</th>
                        <th className="league-th">Losses</th>
                        <th className="league-th">Win %</th>
                    </tr>
                </thead>
                <tbody>
                    {teamItems}
                </tbody>
            </table>
        </div>
    )
}

export default Table;
