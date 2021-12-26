import React from "react";
import "./static/TableRow.css";

const TableRow = function({ team, index }) {
    return(
        <tr>
            <td>{index + 1}</td>
            <td>{team["full_name"]}</td>
            <td>{team["win"]}</td>
            <td>{team["loss"]}</td>
            <td>{team["winPct"]}</td>
        </tr>
    )
}

export default TableRow;
