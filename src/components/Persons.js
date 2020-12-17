import React from "react";
const Persons = ({ person, handleDelete }) => {
  return (
    <li>
      <div className="text">
        {person.name} {person.number}
      </div>
      <div className="btn">
        <button onClick={() => handleDelete(person.id)}>
          <i className="fa fa-trash"> Delete</i>
        </button>
      </div>
    </li>
  );
};

export default Persons;
