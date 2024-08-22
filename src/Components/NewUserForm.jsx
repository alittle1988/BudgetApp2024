import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import PropTypes from 'prop-types';

function NewUserForm(props) {
  const {  onSetTheUser, onLoginSwitch } = props;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [validation, setValidation] = useState(false);
  const [validateUserName, setValidateUserName] = useState(false);
  const [validateEmail, setValidateEmail] = useState(false);

  function formSubmit2(e) {
    e.preventDefault();
    
    const body = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      userName: userName,
      password: password,
      dateJoined: new Date().toDateString(),
      incTransactions: [],
      expTransactions: [],
      incCategories: [],
      expCategories: [],
    }
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      userName === ""
    ) {
      setValidation(true);
      return;
    }
    fetch("http://localhost:8080/users", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      }
        ,
      body: JSON.stringify(body)
    }).then((response) => response.json()).then((data) => {
      if(data.error === 'UserName already Exist') {
        setValidateUserName(true);
        setDisabled(true)
      } else if(data.error === 'Email already in use!') {
        setValidateEmail(true)
        setDisabled(true)
      } else {
        onSetTheUser(data)
        onLoginSwitch(true)
      }
      
    }).catch(error => {
      console.log(error)
      
    });
  }

function handleEmailChange(e) {
  setValidateEmail(false)
  setEmail(e)
  setDisabled(false)
}

function handleUserNameChange(e) {
  setValidateUserName(false)
  setUserName(e)
  setDisabled(false)
}
 

  

  return (
    <Container>
      <Row>
        <Col>
          <div>
            <h5 className="mt-3">Create new user</h5>
            {validation ? (
              <p className="text-danger">Please fill all required input!</p>
            ) : (
              <div></div>
            )}
          </div>
          <Form className="mt-4" onSubmit={formSubmit2}>
            <Form.Group>
              <Form.Label htmlFor="firstName">First Name: </Form.Label>
              <Form.Control
                className="w-25"
                onChange={(e) => setFirstName(e.target.value)}
                id="firstName"
                value={firstName}
                type="text"
                placeholder="Enter First Name"
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="lastName">Last Name: </Form.Label>
              <Form.Control
                className="w-25"
                onChange={(e) => setLastName(e.target.value)}
                id="lastName"
                value={lastName}
                type="text"
                placeholder="Enter Last Name"
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="email">Email: </Form.Label>
              <Form.Control
                className="w-25"
                onChange={(e) =>
                  handleEmailChange(e.target.value.toLowerCase())
                }
                id="email"
                value={email}
                type="email"
                placeholder="Enter Email"
              ></Form.Control>
              {validateEmail ? (
                <Form.Text className="text-danger h1">
                  Email already exist!
                </Form.Text>
              ) : (
                <div></div>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="userName">UserName: </Form.Label>
              <Form.Control
                className="w-25"
                onChange={(e) =>
                  handleUserNameChange(e.target.value.toLowerCase())
                }
                id="userName"
                value={userName}
                type="text"
                placeholder="Enter User Name"
              ></Form.Control>
              {validateUserName ? (
                <Form.Text className="text-danger h1">
                  UserName already Exist!
                </Form.Text>
              ) : (
                <div></div>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password">Password: </Form.Label>
              <Form.Control
                className="w-25"
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                value={password}
                type="password"
                placeholder="Enter Password"
              ></Form.Control>
            </Form.Group>
            <Button disabled={disabled} className="mt-4" type="submit">
              Submit
            </Button>
            <Button className="mt-4 ms-4" onClick={onLoginSwitch}>
              Back to Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default NewUserForm;

NewUserForm.propTypes = {
  onSetTheUser: PropTypes.func,
  onLoginSwitch: PropTypes.func
}
