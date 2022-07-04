import React from "react";
import DateRange from "./DateRange";

export default class UserStats extends React.Component<{}, {}> {
  render() {
    return <div className="overflow-x-auto center">
      <table className="table w-half">
        { // this should be filled with state from retrieved data from dbProvider 
        }
        <thead>
            <tr>
              <th>Folder name</th>
              <th>Sprint name</th>
              <th>Sprint date range</th>
              <th>Project?</th>
            </tr>
          </thead>
        <tbody>
          <tr className="hover">
            <td>Lorem ipsum dolor sit amet</td>
            <td>consectetur adipiscing elit</td>
            <td>
              <DateRange startDate={'2022-01-01'} endDate={'2022-01-15'} />
            </td>
            <td>{Math.random()}</td>
          </tr>
          <tr className="hover">
            <td>Sed dui nibh, vestibulum in enim sit amet</td>
            <td>Ultricies semper risus</td>
            <td>
              <DateRange startDate={'2022-01-04'} endDate={'2022-01-18'} />
            </td>
            <td>{Math.random()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  }
}