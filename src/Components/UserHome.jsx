import { Container, Nav, Row } from "react-bootstrap";
import { Link, Route, Routes } from "react-router-dom";
import AddTransaction from "./AddTransaction";
import PropTypes from "prop-types";
import VeiwTransaction from "./VeiwTransaction";
import UserMain from "./UserMain";

function UserHome(props) {
  const {
    onAddCategory,
    onAddTransaction,
    incomeCategories,
    expenseCategories,
    theUser,
    onEditTransaction,
    onDeleteClick,
  } = props;

  return (
    <Container>
      <Row className="mb-5">
        <Nav className="justify-content-around">
          <Nav.Item>
            <Link to="/">Home</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/addTransaction">Add Transaction/Category</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/viewTransaction">View Transactions</Link>
          </Nav.Item>
        </Nav>
      </Row>

      <Routes>
        <Route path="/" element={<UserMain theUser={theUser} />} />
        <Route
          path="/addTransaction"
          element={
            <AddTransaction
              onAddCategory={onAddCategory}
              onAddTransaction={onAddTransaction}
              incomeCategories={incomeCategories}
              expenseCategories={expenseCategories}
            />
          }
        />
        <Route
          path="/viewTransaction"
          element={
            <VeiwTransaction
              onEditTransaction={onEditTransaction}
              onDeleteClick={onDeleteClick}
              theUser={theUser}
            ></VeiwTransaction>
          }
        />
      </Routes>
    </Container>
  );
}

export default UserHome;

UserHome.propTypes = {
  onAddCategory: PropTypes.func,
  onAddTransaction: PropTypes.func,
  incomeCategories: PropTypes.array,
  expenseCategories: PropTypes.array,
  theUser: PropTypes.object,
  onEditTransaction: PropTypes.func,
  onDeleteClick: PropTypes.func,
};
