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
    year,
    onHandleYearChange,
    month,
    months,
    onHandleMonthChange,
    onHandleSetUser,
    onHandleLogout
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
          year={year}
          onHandleYearChange={onHandleYearChange}
          month={month}
          months={months}
          onHandleMonthChange={onHandleMonthChange}
          onHandleSetUser={onHandleSetUser}
          onHandleLogout={onHandleLogout}

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
  year: PropTypes.string,
  onHandleYearChange: PropTypes.func,
  month: PropTypes.string,
  months: PropTypes.array,
  onHandleMonthChange: PropTypes.func,
  onHandleSetUser: PropTypes.func,
  onHandleLogout: PropTypes.func,
};
