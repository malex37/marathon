import React from "react";
import { checkAuth } from "../tools/AuthTools";
import UserStats from "./display/userStats";

export default class Stats extends React.Component {
    render() {
      return <div className="center">
        <UserStats></UserStats>
      </div>;
    };
    
    componentDidMount() {
      checkAuth();
    }
}