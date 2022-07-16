import { useEffect, useState } from "react";
import DbProvider from "../serviceProviders/dbProvider";
import { logger } from "../tools/logger";
import TeamMember from "./display/TeamMember";
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
      });
    }
  }, []);
  return (
    <div>
      <h1 className="text-lg">{state?.teamName}</h1>
          {state?.members?.map(member => {
            if (member)
            return <TeamMember name={member} />
          })}
      <RegisterMember />
    </div>
   );
};

export default Team;