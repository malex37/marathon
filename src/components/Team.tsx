import React from "react";
import { Team as TeamInterface } from "../models/Team";
import { logger } from "../tools/logger";
import RegisterMember from "./RegisterMember";


interface TeamViewProps {
  teamName?: string;
}

function listMembers() {
  // TODO: make this a request to DB with property passed on mount
  let team: TeamInterface;
  const storage = localStorage.getItem('team');
  if (storage === null) {
    team = { members: [] };
  } else {
    team = JSON.parse(storage);
  }
  return team.members;
}

export default class Team extends React.Component<TeamViewProps, TeamViewProps> {
  constructor(props: TeamViewProps) {
    super(props);
    this.state = { teamName: '' };
  }

  componentDidMount() {
    const url = new URLSearchParams(window.location.search);
    const teamNameString = url.get('teamName');
    logger.debug(`Retrieved teamName ${teamNameString}`);
    if (teamNameString) {
      this.setState({ teamName: teamNameString });
    }
  }

  teamName(): string | undefined {
    if (this.state.teamName) {
      return this.state.teamName;
    }
    return this.props.teamName;
  }

  render() {
    return (
      <div>
        <h1 className="text-lg">{this.teamName()}</h1>
        <div>
          {
            // this should also be a component that shows a preview of the team like icon and name
          }
          {listMembers()}
        </div>
        {
          // Should this be a different route? Maybe a modal?
        }
        <RegisterMember />
      </div>
    );
  }
}