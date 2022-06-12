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

export default class Main extends React.Component {
    render() {
        return (<div>
            <Router>
                <nav className="flex content-start">
                    {
                        // TODO: make this build dynamically
                    }
                    <Link className="p-4" to="/">Stats</Link>
                    <Link className="p-4" to="sprints">Sprints</Link>
                    <Link className="p-4" to="team">Team</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<Stats />} />
                    <Route path="/sprints" element={<Sprint />} />
                    <Route path="/team" element={<Team />} />
                </Routes>
            </Router>
        </div>
        );
    }
}