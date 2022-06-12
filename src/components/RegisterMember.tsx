import React, { ChangeEvent } from "react";

export default class RegisterMember extends React.Component {

    constructor(props: React.ReactPropTypes) {
        super(props);
        this.state = { name: '', }
    }

    handleSubmit(submitEvent: any) {
        const members: string[] = JSON.parse(localStorage.getItem('team') || '');
        localStorage.setItem('team', JSON.stringify(members.push(submitEvent.)))
    }

    handleChange(event: ChangeEvent) {
        console.log(`Received change from ${JSON.stringify(event)}`);
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