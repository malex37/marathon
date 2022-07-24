import { Link } from 'react-router-dom';
import { DateRange as DateRangeType } from '../../models/DateRange';
import DateRange from './DateRange';

interface SprintStatsRowProps {
  projectName: string;
  sprintName: string;
  sprintDateRange: DateRangeType;
  teamName: string;
  totalPoints: number;
  completedPoints: number;
}

const SprintStatsRow = (props: SprintStatsRowProps) => {
  const completionPercentage = (props.completedPoints / props.totalPoints) * 100;
  const completionPercentageStyle = {
    '--value': completionPercentage,
  };

  return (
    <tr className="hover">
      <td>{props.projectName}</td>
      <td><Link className="link" to={`/sprints/${props.sprintName}`}>{props.sprintName}</Link></td>
      <td>
        <DateRange
          startDate={props.sprintDateRange.startDate.toDateString()}
          endDate={props.sprintDateRange.endDate.toDateString()}
        />
      </td>
      <td><Link to={`/team/${props.teamName}`}>{props.teamName}</Link></td>
      <td>
        <div
          className="radial-progress"
          style={completionPercentageStyle as React.CSSProperties}
        >
          {completionPercentage}%
        </div>
      </td>
    </tr>
  );
};

export default SprintStatsRow;
