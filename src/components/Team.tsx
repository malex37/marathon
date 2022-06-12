import React from "react";
import RegisterMember from "./RegisterMember";


function listMembers() {
    return window.localStorage.getItem('sprint-tracker-members');
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