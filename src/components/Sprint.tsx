import React from "react";
import { useParams } from "react-router-dom";
import { DynamoConnector } from "../serviceProviders/dbProvider";
import { checkAuth } from "../tools/AuthTools";


interface SprintViewState {
  sprintName?: string;
}
export default class Sprint extends React.Component<SprintViewState, SprintViewState> {

    constructor(props: SprintViewState) {
        super(props);
        this.state = props;
    }

    render() {
        return (
            <div>
                {this.state.sprintName}
            </div>
        );
    }

    async componentDidMount() {
      checkAuth();
      // this.setState({ sprintData: JSON.stringify(await DynamoConnector.getSprints()) });
    }
};
