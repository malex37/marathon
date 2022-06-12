import React from "react";
import { Team as TeamInterface } from "../models/Team";
import RegisterMember from "./RegisterMember";


function listMembers() {
    let team: TeamInterface ;
    const storage = localStorage.getItem('team');
    if (storage === null) {
        team = {members: []};
    } else {
        team = JSON.parse(storage);
    }
    return team.members;
}

function Team() {
    return(
        <div>
            <div>
                {listMembers()}
            </div>
            <RegisterMember />
        </div>
    );
}

export default Team;