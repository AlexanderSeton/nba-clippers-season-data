import React from "react";
import Player from "./Player";
import "./static/RosterList.css";

const RosterList = function({roster}) {

    const rosterItems = roster.map((player) => {
        return <Player player={player} />
    })

    return(
        <div>
            <div className="roster-list-div">
                {rosterItems}
            </div>
        </div>
    )
}

export default RosterList;
