import React from "react";
const AddPerson = (props) => {
  return (
    <form onSubmit={props.AddItem}>
      <div>
        <p>Insert name: </p>
        <input
          value={props.newName}
          onChange={props.handleNameChange}
          type="text"
        />

        <p> Insert number:</p>
        <input
          value={props.newNumber}
          onChange={props.handleNumberChange}
          type="text"
        />
      </div>

      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};
export default AddPerson;
