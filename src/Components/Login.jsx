import { useState, useRef, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import NewUserForm from "./NewUserForm";
import PropTypes from "prop-types";
import useFetch from "../Hooks/useFetch";


function Login(props) {
  const [validation, setValidation] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginSwitch, setLoginSwitch] = useState(false);
  const { get, results} = useFetch("http://localhost:8080");
  const { onHandleLogin, onSetTheUser } = props;
  const inputRef = useRef();

  function handleLoginSwitch() {
    setLoginSwitch(!loginSwitch);
  }
  
  function handleSubmitClick(e) {
    e.preventDefault();

    if (userName === "" || password === "") {
      setValidation(true);
      return;
    }
    get(`/users/${userName}?password=${password}`);
    

  }

  useEffect(() => {
    if( results) {
      if(results.error) {
        alert(results.error + "  Please try again!")
        setUserName("");
        setPassword("");
      } else {
        onSetTheUser(results.data)
        onHandleLogin()
       
      }
    }
    
  }, [results, onHandleLogin, onSetTheUser]);

  return (
    <>
      <Container>
        {loginSwitch ? (
          <NewUserForm
            onLoginSwitch={handleLoginSwitch}
            onSetTheUser={onSetTheUser}
          />
        ) : (
          <Row>
            <Col lg={6}>
              <div>
                <h5 className="mt-3">Login</h5>
              </div>
              <Form onSubmit={handleSubmitClick}>
                <Form.Group>
                  <Form.Label htmlFor="login-userName">UserName: </Form.Label>
                  <Form.Control
                    ref={inputRef}
                    className="w-50"
                    id="login-userName"
                    placeholder="Enter Username"
                    type="text"
                    value={userName}
                    onChange={(e) =>
                      setUserName(e.currentTarget.value.toLowerCase())
                    }
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="login-password">Password: </Form.Label>
                  <Form.Control
                    id="login-password"
                    className="w-50"
                    type="password"
                    value={password}
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                {validation ? (
                  <p className="text-danger">Please Enter requited input!</p>
                ) : (
                  <div></div>
                )}
                <Button type="submit" className="mt-3">
                  Submit
                </Button>
              </Form>
            </Col>
            <Col className="" lg={6}>
              <Button onClick={handleLoginSwitch} className="w-50 m-auto">
                New User
              </Button>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}

export default Login;

Login.propTypes = {
  onHandleLogin: PropTypes.func,
  onSetTheUser: PropTypes.func,
};
