import { Col, Container, Row } from "react-bootstrap";
import PropTypes from "prop-types";

function Header(props) {
  const { onLogout, loggedIn, theUser } = props;

  return (
    <>
      <Container fluid>
        <Row>
          {/*<Button onClick={test}>Press me</Button>*/}
          <Col className="my-5" lg={11}>
            {loggedIn ? (
              <h1 className="text-center">Welcome {theUser.firstName}</h1>
            ) : (
              <h1 className="text-center">Budget App</h1>
            )}
          </Col>
          {loggedIn ? (
            <Col lg={1}>
              <p
                className="text-primary text-decoration-underline logout w-25"
                onClick={onLogout}
              >
                Logout
              </p>
            </Col>
          ) : (
            <div></div>
          )}
        </Row>
      </Container>
      <hr></hr>
    </>
  );
}

export default Header;

Header.propTypes = {
  onLogout: PropTypes.func,
  loggedIn: PropTypes.bool,
  theUser: PropTypes.object,
};
