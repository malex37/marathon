import React from "react";
import { Link } from "react-router-dom";
import { DateRange as DateRangeType } from "../../models/DateRange";
import DateRange from "./DateRange";

interface SprintStatsRowProps {
  projectName: string;
  sprintName: string;
  sprintDateRange: DateRangeType;
  teamName: string;
  totalPoints: number;
  completedPoints: number;
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
    const completionPercentage = (this.props.completedPoints / this.props.totalPoints) * 100;
    return(
    <tr className="hover">
      <td>{ this.props.projectName }</td>
      <td><Link className="link" to={`/sprints/${this.props.sprintName}`}>{ this.props.sprintName }</Link></td>
      <td>
      <DateRange
        startDate={ this.props.sprintDateRange.startDate.toDateString() }
        endDate={ this.props.sprintDateRange.endDate.toDateString() }
      />
      </td>
      <td><Link to={`/team?teamName=${this.props.teamName}`}>{this.props.teamName}</Link></td>
      <td>
        <div className="radial-progress" style={({['--value']: completionPercentage}) as any}>{completionPercentage}%</div>
      </td>
    </tr>
    );
  }
}