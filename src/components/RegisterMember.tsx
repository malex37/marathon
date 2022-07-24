import React, { useRef, useState } from 'react';
import { Team } from '../models/Team';

const RegisterMember = () => {

  const [name, setName] = useState('');

  const handleSubmit = (submitEvent: React.FormEvent<HTMLFormElement>) => {
    const localStorageObj = localStorage.getItem('team');
    let team: Team = { members: [] };
    if (localStorageObj === null) {
      console.log('No team found, using empty team interface');
    } else {
      console.log(`local storage obj ${localStorageObj}`);
      team = JSON.parse(localStorageObj);
    }

    if (!name) {
      console.log('Can\'t register a member without name!');
      return;
    }
    console.log(`Registering team member with name ${name}`);
    team.members?.push(name);
    localStorage.setItem('team', JSON.stringify(team));
    submitEvent.preventDefault();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <div>
      <label htmlFor="register-member-form" className="btn modal-button">Register new member</label>
      <input type="checkbox" id="register-member-form" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor="register-member-form" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <form className="grid grid-columns-auto p-2 w-1/2" onSubmit={handleSubmit}>
            <label>Name:</label>
            <input name="name" className="p-3 border-solid border-indigo-600" type="text" onChange={handleChange} />
            <input className="p-3 form-input rounded-md" type="submit" value="Register" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterMember;