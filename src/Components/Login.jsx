import { useState, useRef } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import NewUserForm from "./NewUserForm";
import PropTypes from "prop-types";
import api from "../../lib/axios";
import toast from "react-hot-toast";

function Login(props) {
  const [validation, setValidation] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginSwitch, setLoginSwitch] = useState(false);
  const [loading, setLoading] = useState(false)
  const { onHandleLogin, onSetTheUser } = props;
  const inputRef = useRef();
  

  function handleLoginSwitch() {
    setLoginSwitch(!loginSwitch);
  }

  async function handleSubmitClick(e) {
    e.preventDefault();

    if (userName === "" || password === "") {
      setValidation(true);
      return;
    }

    try {
      const res = await api.get(`/users/${userName}?password=${password}`);

      onSetTheUser(res.data.data);
      onHandleLogin();
    } catch (error) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
    }
  }

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
            <Col className="mt-5" lg={6}>
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
