import React from "react";
import { Team } from "../models/Team";

interface RegisterMemberFormState {
    name: string;
}

export default class RegisterMember extends React.Component<{}, RegisterMemberFormState> {

    constructor(props: React.ReactPropTypes) {
        super(props);
        this.state = {name: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(submitEvent: any) {
        let localStorageobj = localStorage.getItem('team');
        let team: Team = { members: [] }
        if (localStorageobj === null) {
            console.log('No team found, using empty team interface');
        } else {
            console.log(`local storage obj ${localStorageobj}`);
            team = JSON.parse(localStorageobj);
        }
       
        if (!this.state || !this.state.name) {
            console.log('Can\'t register a member without name!');
            return;
        }
        console.log(`Registering team member with name ${this.state.name}`);
        team.members.push(this.state.name);
        localStorage.setItem('team', JSON.stringify(team));
        submitEvent.preventDefault();
    }

    handleChange(event: any) {
        this.setState({name: event.target.value });
        // console.log(`Received change from ${JSON.stringify(event)}`);
    }

    render() {
        return (
        <div >
            <form className="grid gird-columns-auto p-2 w-1/2" onSubmit={this.handleSubmit}>
                <label>Name:</label>
                <input name="name" className="p-3 border-solid border-indigo-600" type="text" onChange={this.handleChange}/>
                <input className="p-3 form-input rounded-md" type="submit" value="Register"/>
            </form>
        </div>
    );
    }
};