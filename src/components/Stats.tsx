import React from "react";
import { AuthValidator } from "../tools/AuthTools";
import UserDashboard from "./display/UserDashboard";

export default class Stats extends React.Component {
    render() {
      return <div className="flex flex-col items-center">
        <UserDashboard></UserDashboard>
      </div>;
    };
    
    componentDidMount() {
      AuthValidator.checkAuth();
    }
}