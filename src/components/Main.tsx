import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import Sprint from "./Sprint";
import Team from "./Team";
import Stats from "./Stats"
import Login from "./Login";
import { checkAuth } from "../tools/AuthTools";

export default class Main extends React.Component {
  
  // Initial setup
  componentDidMount() {
    checkAuth();
  }

  // In case an update is triggered. I'm expecting this to work for all child components so there's no need to add it to all mounts
  componentDidUpdate() {
    checkAuth();
  }
    render() {
        return (<div>
            <Router>
                <div className="navbar bg-base-100">
                    {
                        // TODO: make this build dynamically
                    }
                    <div className="navbar-start"></div>
                    <div className="navbar-center">
                      <Link className="btn btn-ghost normal-case text-xl" to="/">Stats</Link>
                      <Link className="btn btn-ghost normal-case text-xl" to="sprints">Sprints</Link>
                      <Link className="btn btn-ghost normal-case text-xl" to="team">Team</Link>
                    </div>
                    <div className="navbar-end"></div>
                </div>
                {
                  // All of the components that make up a navigation route should have a checkAuth() call
                  // in componentWillMount() so we check authorization token and credentials before we display information on the screen
                }
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Stats />} />
                    <Route path="/sprints" element={<Sprint />} />
                    <Route path="/team" element={<Team />} />
                </Routes>
            </Router>
        </div>
        );
    }
}