import React from "react";
import { DynamoConnector } from "../serviceProviders/dbProvider";
import { checkAuth } from "../tools/AuthTools";

export default class Sprint extends React.Component<{}, {sprintData: string}> {

    constructor(props: React.ReactPropTypes) {
        super(props);
        this.state = {sprintData: ''};
    }

    render() {
        return (
            <div>
                {this.state.sprintData}
            </div>
        );
    }

    async componentDidMount() {
      checkAuth();
      // this.setState({ sprintData: JSON.stringify(await DynamoConnector.getSprints()) });
    }
};
