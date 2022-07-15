import React, { useEffect, useState } from "react";
import { Team as TeamInterface } from "../models/Team";
import DbProvider from "../serviceProviders/dbProvider";
import { logger } from "../tools/logger";
import RegisterMember from "./RegisterMember";

interface TeamViewModel {
  members?: (string | undefined)[];
  teamName: string;
}

const Team = () => {

  const [state, setState] = useState<TeamViewModel | undefined>();

  useEffect(() => {
    const url = new URLSearchParams(window.location.search);
    const teamNameString = url.get('teamName');
    logger.debug(`Retrieved teamName ${teamNameString}`);
    if (teamNameString) {
      
      const fetchTeamMembers = async () => {
        return await DbProvider.getTeam(teamNameString);
      };
      fetchTeamMembers().then(data => {
        setState({teamName: teamNameString, members: data.members});
      })
    }
  }, []);
  return (
      <div>
        <h1 className="text-lg">{state?.teamName}</h1>
        <div>
          {
            // this should also be a component that shows a preview of the team like icon and name
          }
          {state?.members?.map(member => {
            return <div>{member}</div>;
          })}
        </div>
        {
          // Should this be a different route? Maybe a modal?
        }
        <RegisterMember />
      </div>);
}

export default Team;