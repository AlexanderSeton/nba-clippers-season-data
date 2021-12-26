import React from "react";
import "./static/Table.css";
import TableRow from "./TableRow";

const Table = function({ teamData }) {

    const teamItems = teamData.map((team, index) => {
        return <TableRow team={team} index={index} key={index} />
    })

    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Team</th>
                        <th>Wins</th>
                        <th>Losses</th>
                        <th>Win %</th>
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
