import React from "react";
import { checkAuth } from "../tools/AuthTools";
import UserStats from "./display/userStats";

export default class Stats extends React.Component {
    render() {
      return <div className="flex flex-col">
        <UserStats></UserStats>
      </div>;
    };
    
    componentDidMount() {
      checkAuth();
    }
}