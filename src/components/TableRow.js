import React from "react";
import "./static/TableRow.css";

const TableRow = function({ team, index }) {
    return(
        <tr className="league-data-tr">
            <td className="league-td">{index + 1}</td>
            <td className="league-td">{team["full_name"]}</td>
            <td className="league-td">{team["win"]}</td>
            <td className="league-td">{team["loss"]}</td>
            <td className="league-td">{team["winPct"]}</td>
        </tr>
    )
}

export default TableRow;
