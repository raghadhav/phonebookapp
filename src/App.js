import React, { useState, useEffect } from "react";
import Persons from "./components/Persons.js";
import AddPerson from "./components/AddPerson";
import FilterName from "./components/FilterName";
import noteService from "./services/backend";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [Filter, setFilter] = useState(persons);
  const [Msg, setMsge] = useState("");
  const [notificationStatus, setNotificationStatus] = useState("");
  useEffect(() => {
    noteService.getAll().then((intialResponse) => {
      setPersons(intialResponse);
      console.log(`here is the initial res ${intialResponse}`);
      setFilter(intialResponse);
    });
  }, []);

  const AddItem = (event) => {
    event.preventDefault();

    const newObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    // const found = persons.some((person) => person.name === newName);
    // console.log("found here is " + found);
    
    // const differentNo = persons.some(
    //   (person) => person.name === newName && person.number !== newNumber
    // );

    //if (!found && newName !== "" && newNumber !== "") {
      
    
      noteService.create(newObject).then((intialResponse) => {
        const newpersons = persons.concat(newObject);
        setPersons(newpersons);
        setFilter(newpersons);
        setMsge(`${newName} Added Successfully`);
        setNotificationStatus("success");
        setNewName("");
        setNewNumber("");
      }).catch((error)=>{
        console.log(error.response)
        setMsge(`${error.response.data.error}`);
        setNotificationStatus("fail");
      });

  };
  const handleNameChange = (event) => {
    event.preventDefault();
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    event.preventDefault();
    setNewNumber(event.target.value);
  };
  const handleFilter = (event) => {
    setMsge("");
   const filteredPerson = persons.filter(person => 
     person.name && person.name.includes(event.target.value));
   console.log(filteredPerson);
    setFilter(filteredPerson);
  };
  const handleDelete = (id) => {
    const matchedPersons = persons.filter(person => 
      person.id === id
      );
      const name = matchedPersons[0].name; 
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      noteService.deleteItem(id).then((intialResponse) => {
        const newperson= persons.filter(person =>
           person.id !== id
        );
        setFilter(newperson);
      });
    }
   
  };
  const Notification = ({ msg }) => {
    if (msg === "") return null;
    
    else return <div className={notificationStatus}>{msg}</div>;
  };
  return (
    <div>
      <h2 className="main-title">Phonebook</h2>
      <Notification msg={Msg} />

      <FilterName handleFilter={handleFilter} />
      <h3>Add New Contact</h3>
      <AddPerson
        AddItem={AddItem}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>All Added Contacts</h3>
    
      <div>
        <ul>
          {Filter.map((person) => (
            <Persons
              key={person.id}
              person={person}
              handleDelete={handleDelete}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
