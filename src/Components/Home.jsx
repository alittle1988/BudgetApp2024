import Login from "./Login.jsx";
import PropTypes from "prop-types";
import UserHome from "./UserHome.jsx";
import { Container } from "react-bootstrap";

function Home(props) {
  const {
    loggedIn,
    onAddCategory,
    onAddTransaction,
    onHandleLogin,
    onSetTheUser,
    incomeCategories,
    expenseCategories,
    theUser,
    onEditTransaction,
    onDeleteClick,
  } = props;

  return (
    <Container className="mt-5">
      {loggedIn ? (
        <UserHome
          incomeCategories={incomeCategories}
          expenseCategories={expenseCategories}
          onAddCategory={onAddCategory}
          onAddTransaction={onAddTransaction}
          theUser={theUser}
          onEditTransaction={onEditTransaction}
          onDeleteClick={onDeleteClick}
        />
      ) : (
        <Login onHandleLogin={onHandleLogin} onSetTheUser={onSetTheUser} />
      )}
    </Container>
  );
}

export default Home;

Home.propTypes = {
  loggedIn: PropTypes.bool,
  onAddCategory: PropTypes.func,
  onAddTransaction: PropTypes.func,
  onHandleLogin: PropTypes.func,
  onSetTheUser: PropTypes.func,
  incomeCategories: PropTypes.array,
  expenseCategories: PropTypes.array,
  theUser: PropTypes.object,
  onEditTransaction: PropTypes.func,
  onDeleteClick: PropTypes.func,
};
