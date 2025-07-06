
import { Container, Row, Col } from "react-bootstrap";
import EditUserForm from "./Forms/EditUserForm";
import PropTypes from "prop-types";


function EditUser(props) {
  const { theUser, onHandleSetUser, onHandleLogout } = props;
  

  
   // figure out how to delete user!

  return (
    <Container>
      <Row>
        <Col>
          <h3 className="text-secondary text-center mb-5">Edit User</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <EditUserForm className='mb-5' theUser={theUser} onHandleSetUser={onHandleSetUser} onHandleLogout={onHandleLogout} />
          
        </Col>
      </Row>
    </Container>
  );
}

export default EditUser;

EditUser.propTypes = {
  theUser: PropTypes.object,
  onHandleSetUser: PropTypes.func,
  onHandleLogout: PropTypes.func
};
