import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import AddTransaction from "./AddTransaction";
import EditUser from "./EditUser";
import NavBar from "./NavBar";
import PropTypes from "prop-types";
import VeiwTransaction from "./VeiwTransaction";
import UserMain from "./UserMain";
import YearSummary from "./YearSummary";

function UserHome(props) {
  const {
    onAddCategory,
    onAddTransaction,
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
    onHandleLogout,
  } = props;

  return (
    <Container>
      <NavBar />

      <Routes>
        <Route
          path="/"
          element={
            <UserMain
              theUser={theUser}
              year={year}
              month={month}
              months={months}
              onHandleMonthChange={onHandleMonthChange}
              onHandleYearChange={onHandleYearChange}
            />
          }
        />
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
              year={year}
              onHandleYearChange={onHandleYearChange}
              month={month}
              months={months}
              onHandleMonthChange={onHandleMonthChange}
            ></VeiwTransaction>
          }
        />
        <Route
          path="/YearSummary"
          element={
            <YearSummary theUser={theUser} months={months} year={year} />
          }
        ></Route>
        <Route
          path="/EditUser"
          element={
            <EditUser
              theUser={theUser}
              onHandleSetUser={onHandleSetUser}
              onHandleLogout={onHandleLogout}
            />
          }
        ></Route>
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
  year: PropTypes.string,
  onHandleYearChange: PropTypes.func,
  month: PropTypes.string,
  months: PropTypes.array,
  onHandleMonthChange: PropTypes.func,
  onHandleSetUser: PropTypes.func,
  onHandleLogout: PropTypes.func,
};
