import React, { useEffect, useState } from "react";
import { SprintModel } from "../../models/SprintModel";
import DbProvider from "../../serviceProviders/dbProvider";
import SprintStatsRow from "./SprintStatsRow";

/**
 * General stats for the user.
 * Sprints they belong to, project name general sprint data
 */
const UserDashboard = () => {

  let sprints: SprintModel[] | undefined;

  const [state, setState] = useState<SprintModel[] | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      return await DbProvider.getSprints();
    } 
    fetchData().then(data => {
      setState(data)
    });
  }, [sprints]);


  return(
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
                      projectName={sprint.projectName || "No name"}
                      sprintName={sprint.name || "No name"}
                      sprintDateRange={{startDate: new Date('2022-01-01'), endDate: new Date('2022-01-15')}}
                      teamName={sprint.team || "No team"}
                      completedPoints={parseInt(sprint.completedPoints || '0', 10)}
                      totalPoints={parseInt(sprint.totalPoints || '0', 10)}
                    />);
            })
          } 
          {/* <SprintStatsRow
            projectName="Lorem ipsum dolorh"
            sprintName="Consectetur adipiscings"
            sprintDateRange={{startDate: new Date('2022-01-01'), endDate: new Date('2022-01-15')}}
            teamName="Elit"
          />
          
          <SprintStatsRow
            projectName="Sed dui nibh"
            sprintName="Ultricies semper risus"
            sprintDateRange={{startDate: new Date('2022-01-04'), endDate: new Date('2022-01-18')}}
            teamName="Donec"
          />
          
          <SprintStatsRow
            projectName="Suspendisse pretium"
            sprintName="Nunc tincidunt velit est"
            sprintDateRange={{startDate: new Date('2022-02-01'), endDate: new Date('2022-02-08')}}
            teamName="Mauris"
          /> */}
        </tbody>
      </table>
    </div>
  );
}

export default UserDashboard;