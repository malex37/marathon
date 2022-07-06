import React from "react";
import { DateRange as DateRangeType } from "../../models/DateRange";
import DateRange from "./DateRange";

interface SprintStatsRowProps {
  projectName: string;
  sprintName: string;
  sprintDateRange: DateRangeType;
  teamName: string;
}

export default class SprintStatsRow extends React.Component<SprintStatsRowProps, {}> {
  constructor(props: SprintStatsRowProps) {
    super(props);
    this.state = { 
      projectName: props.projectName,
      sprintName: props.sprintName,
      sprintDateRange: props.sprintDateRange,
    }
  }
  render() {
    return(
    <tr className="hover">
      <td>{ this.props.projectName }</td>
      <td>{ this.props.sprintName }</td>
      <td>
      <DateRange
        startDate={ this.props.sprintDateRange.startDate.toDateString() }
        endDate={ this.props.sprintDateRange.endDate.toDateString() }
      />
      </td>
      <td>{this.props.teamName}</td>
    </tr>
    );
  }
}