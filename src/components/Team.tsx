import React from "react";
import { Team as TeamInterface } from "../models/Team";
import RegisterMember from "./RegisterMember";
import { DynamoDBClient, BatchGetItemCommand } from '@aws-sdk/client-dynamodb';

const dynamoClient = new DynamoDBClient({ endpoint: 'http://localhost:7777/', region: 'us-west-2' });

function listMembers() {
    let team: TeamInterface ;
    // const getTeams = new BatchGetItemCommand({
    //     RequestItems: {
    //         "team": { Keys: []}
    //     }
    // });  
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