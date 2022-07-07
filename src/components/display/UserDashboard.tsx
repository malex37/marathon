import React from "react";
import SprintStatsRow from "./SprintStatsRow";

/**
 * General stats for the user.
 * Sprints they belong to, project name general sprint data
 */
export default class UserDashboard extends React.Component<{}, {}> {
  render() {
    return <div className="overflow-x-auto center">
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
            </tr>
          </thead>
        <tbody>

          <SprintStatsRow
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
          />
        </tbody>
      </table>
    </div>
  }
}