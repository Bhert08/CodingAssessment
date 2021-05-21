import { useState, useContext } from "react";
import { AppContext } from "../Context";
import Select from 'react-select';

const Form = () => {
  
  const { insertUser } = useContext(AppContext);
  const [newUser, setNewUser] = useState({});
  /*const task = [
    {label: 'Completed', value: 'Completed'},
    {label: 'Pending', value: 'Pending'},
    {label: 'No task', value: 'No task'}
  ];*/

  // Storing the Insert User Form Data.
  const addNewUser = (e, field) => {
    setNewUser({
      ...newUser,
      [field]: e.target.value,
    });
  };

  // Inserting a new user into the Database.
  const submitUser = (e) => {
    e.preventDefault();
    insertUser(newUser);
    e.target.reset();
  };

  return (
    <form className="insertForm" onSubmit={submitUser}>
      <h2>Insert User</h2>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        onChange={(e) => addNewUser(e, "name")}
        placeholder="Enter name"
        autoComplete="off"
        required
      />
      <label htmlFor="market">Market</label>
      <input
        type="text"
        id="market"
        onChange={(e) => addNewUser(e, "market")}
        placeholder="Enter market"
        autoComplete="off"
        required
      />
      <label htmlFor="flow">Flow</label>
      <input
        type="text"
        id="flow"
        onChange={(e) => addNewUser(e, "flow")}
        placeholder="Enter flow"
        autoComplete="off"
        required
      />
      <label htmlFor="location">Location</label>
      <input
        type="text"
        id="location"
        onChange={(e) => addNewUser(e, "location")}
        placeholder="Enter location"
        autoComplete="off"
        required
      />
      <input type="submit" value="Insert" />
    </form>
  );
};

export default Form;