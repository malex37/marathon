import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DbProvider from '../serviceProviders/dbProvider';
import { AuthValidator } from '../tools/AuthTools';
import { logger } from '../tools/logger';
import TeamMember from './display/TeamMember';
import RegisterMember from './RegisterMember';

interface TeamViewModel {
  members?: (string | undefined)[];
  teamName: string;
}

const Team = () => {

  const [state, setState] = useState<TeamViewModel | undefined>();

  const init = false;
  const { team } = useParams();
  useEffect(() => {
    if (!init) {
      logger.debug(`Retrieved teamName ${team}`);
      if (team) {

        const fetchTeamMembers = async () => {
          return await DbProvider.getTeam(team);
        };
        fetchTeamMembers().then(data => {
          setState({ teamName: team, members: data.members });
        });
      }
    }
  }, []);
  return (
    <div>
      <h1 className='text-lg'>{state?.teamName}</h1>
      {state?.members?.map((member, index) => {
        if (member) {
          return <TeamMember key={index} name={member} />;
        }
      })}
      <RegisterMember />
    </div>
  );
};

export default Team;