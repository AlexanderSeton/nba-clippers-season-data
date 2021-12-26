import React from "react";
import "./static/TableRow.css";

const TableRow = function({ team, index }) {

    const rankOneTextStyle = function() {
        if (index === 0) {
            return ["gold", "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"];
        } else {
            return ["black", "none"];
        }
    }

    return(
        <tr className="league-data-tr">
            <td className="league-td" style={{ color: `${rankOneTextStyle()[0]}`, textShadow: `${rankOneTextStyle()[1]}` }}>{index + 1}</td>
            <td className="league-td" style={{ color: `${rankOneTextStyle()[0]}`, textShadow: `${rankOneTextStyle()[1]}` }}>{team["full_name"]}</td>
            <td className="league-td" style={{ color: `${rankOneTextStyle()[0]}`, textShadow: `${rankOneTextStyle()[1]}` }}>{team["win"]}</td>
            <td className="league-td" style={{ color: `${rankOneTextStyle()[0]}`, textShadow: `${rankOneTextStyle()[1]}` }}>{team["loss"]}</td>
            <td className="league-td" style={{ color: `${rankOneTextStyle()[0]}`, textShadow: `${rankOneTextStyle()[1]}` }}>{team["winPct"]}</td>
        </tr>
    )
}

export default TableRow;
