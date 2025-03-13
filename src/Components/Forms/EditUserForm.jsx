import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import useFetch from "../../Hooks/useFetch";

export default function EditUserForm(props) {
  const { theUser, onHandleSetUser, onHandleLogout } = props;
  const [newUserName, setNewUserName] = useState(theUser.userName);
  const [newFirstName, setNewFirstName] = useState(theUser.firstName);
  const [newLastName, setNewLastName] = useState(theUser.lastName);
  const { remove, results, loading } = useFetch("http://localhost:8080");

  function handleEditSubmit(e) {
    e.preventDefault();

    // figure out how to immutably change the strings
    let {firstName, lastName, userName} = theUser;
    firstName = newFirstName;
    lastName = newLastName;
    userName = newUserName;
    let updatedUser = {...theUser, firstName, lastName, userName}
    
    onHandleSetUser(updatedUser);
    console.log("User has been updated!");
  }

  function handleDeleteUser(theUser) {
    if (
      confirm(
        "If you delete user,  All data will be lost! \n Would you like to continue?"
      )
    ) {
      if (confirm("Are you sure?")) {
        remove(`/users/${theUser._id}`);
        alert("User has been deleted!");
        onHandleLogout();
      }
    }
  }

  return (
    <>
      <Form onSubmit={handleEditSubmit}>
        <Form.Group>
          <Form.Label className="font-weight-bold" htmlFor="userName">
            UserName:
          </Form.Label>
          <Form.Control
            className="w-25"
            id="userName"
            onChange={(e) => setNewUserName(e.target.value)}
            value={newUserName}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label className="font-weight-bold" htmlFor="firstName">
            First Name:{" "}
          </Form.Label>
          <Form.Control
            className="w-25"
            id="firstName"
            onChange={(e) => setNewFirstName(e.target.value)}
            value={newFirstName}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label className="font-weight-bold" htmlFor="lastName">
            Last Name:{" "}
          </Form.Label>
          <Form.Control
            className="w-25"
            id="lastName"
            onChange={(e) => setNewLastName(e.target.value)}
            value={newLastName}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" className="mt-2">
          Submit
        </Button>
      </Form>
      <Button
        className="mt-5 btn btn-danger"
        onClick={() => handleDeleteUser(theUser)}
      >
        Delete!
      </Button>
    </>
  );
}

EditUserForm.propTypes = {
  theUser: PropTypes.object,
  onHandleSetUser: PropTypes.func,
  onHandleLogout: PropTypes.func,
};
