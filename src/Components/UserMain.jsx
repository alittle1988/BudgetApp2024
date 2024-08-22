import { Col, Container, Row } from "react-bootstrap";
import IncomeTable from "./Tables/IncomeTable";
import ExpenseTable from "./Tables/ExpenseTable";
import PropTypes from "prop-types";

function UserMain(props) {
  const { theUser } = props;
  return (
    <Container>
      <Row>
        <Col lg={6}>
          <IncomeTable theUser={theUser} />
        </Col>
        <Col lg={6}>
          <ExpenseTable theUser={theUser} />
        </Col>
      </Row>
    </Container>
  );
}

export default UserMain;

UserMain.propTypes = {
  theUser: PropTypes.object,
};
