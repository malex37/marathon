import { useEffect, useState } from 'react';
import { SprintModel } from '../../models/SprintModel';
import DbProvider from '../../serviceProviders/dbProvider';
import { logger } from '../../tools/logger';
import Loading from '../utilities/Loading';
import SprintStatsRow from './SprintStatsRow';

/**
 * General stats for the user.
 * Sprints they belong to, project name general sprint data
 */
const UserDashboard = () => {

  let sprints: SprintModel[] | undefined;
  let initiated = false;
  const [state, setState] = useState<SprintModel[] | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      return await DbProvider.getSprints();
    };
    if (!initiated) { 
      initiated = true;
      fetchData().then(data => {
        setState(data);
      }).catch(error => {
        logger.error(`Error fetching data ${JSON.stringify(error)}`);
      });
    }
  }, []);

  const table = (
    <div className="overflow-x-auto center">
      <table className="table w-half">
        { 
          // this should be filled with state from retrieved data from dbProvider 
        }
        <thead>
          <tr>
            <th>Project name</th>
            <th>Sprint name</th>
            <th>Sprint date range</th>
            <th>Team</th>
            <th>Completion %</th>
          </tr>
        </thead>
        <tbody>
          { 
            state?.map((sprint, index) => {
              return(<SprintStatsRow
                key={index}
                projectName={sprint.projectName || 'No name'}
                sprintName={sprint.name || 'No name'}
                sprintDateRange={{startDate: new Date('2022-01-01'), endDate: new Date('2022-01-15')}}
                teamName={sprint.team || 'No team'}
                completedPoints={parseInt(sprint.completedPoints || '0', 10)}
                totalPoints={parseInt(sprint.totalPoints || '0', 10)}
              />);
            })
          } 
        </tbody>
      </table>
    </div>
  );
  const comp = !state ? <Loading />  : table;

  return comp;
};

export default UserDashboard;