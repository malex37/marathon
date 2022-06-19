import React from "react";
import { DynamoConnector } from "../dataProviders/dbProvider";

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
        this.setState({ sprintData: JSON.stringify(await DynamoConnector.getSprints()) });
    }
};
