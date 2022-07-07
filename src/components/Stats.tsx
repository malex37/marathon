import React from "react";
import { checkAuth } from "../tools/AuthTools";
import UserDashboard from "./display/UserDashboard";

export default class Stats extends React.Component {
    render() {
      return <div className="flex flex-col">
        <UserDashboard></UserDashboard>
      </div>;
    };
    
    componentDidMount() {
      checkAuth();
    }
}