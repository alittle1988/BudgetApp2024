import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Header.jsx";
import Home from "./Components/Home.jsx";
import Search from "./Components/Search.jsx";

import { Container } from "react-bootstrap";
import { Route, Routes, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import api from "../lib/axios.js";

function App() {
  const [theUser, setTheUser] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [months, setMonths] = useState([
    "January",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);
  const [month, setMonth] = useState(months[new Date().getMonth()]);

  const navigate = useNavigate();

  // handle Logout click
  function handleLogout() {
    setLoggedIn(false);
    setTheUser({});
    toast.success("User has been logged out!");
  }

  //handle Year Change
  function handleYearChange(e) {
    setYear(e);
  }

  //handle month Change
  function handleMonthChange(e) {
    setMonth(e);
  }

  function handleUpdateUser(data) {
    setTheUser(data);
  }

  // handle login click
  function handleLogin() {
    setLoggedIn(true);
    navigate("/");
    toast.success("User login successfull!");
  }

  // handles setting user
  function handleSetTheUser(user) {
    setTheUser(user);
    setExpenseCategories(user.expCategories);
    setIncomeCategories(user.incCategories);
  }

  // handles adding Category to user obj
  function handleAddCategory(data, incExp) {
    if (incExp === "Income") {
      const { incCategories, ...rest } = theUser;
      incCategories.push(data);
      let newData = { ...theUser, incCategories };
      setTheUser(newData);
    } else if (incExp === "Expense") {
      const { expCategories, ...rest } = theUser;
      expCategories.push(data);
      let newData = { ...theUser, expCategories };
      setTheUser(newData);
    }
    //put(`/users/${theUser._id}`, theUser);
    api.put(`/users/${theUser._id}`, theUser);
  }

  // handles finding index of item by Id
  function getIndexById(id, array) {
    const num = (element) => element.id === id;
    return array.findIndex(num);
  }

  // handles deleting transaction from user transaction list
  function handleDeleteClick(data, incExp) {
    if (incExp === "Income") {
      const { incTransactions, ...rest } = theUser;
      let index = getIndexById(data.id, incTransactions);
      incTransactions.splice(index, 1);
      let newData = { ...theUser, incTransactions };
      setTheUser(newData);
      api.put(`/users/${theUser._id}`, newData);
      //put(`/users/${theUser._id}`, newData);
    } else {
      const { expTransactions, ...rest } = theUser;
      let index = getIndexById(data.id, expTransactions);
      expTransactions.splice(index, 1);
      let newData = { ...theUser, expTransactions };
      setTheUser(newData);
      api.put(`/users/${theUser._id}`, newData);
      //put(`/users/${theUser._id}`, newData);
    }
  }
  // handles editing transaction that already exist on server
  function handleEditTransaction(data, incExp) {
    if (incExp === "Income") {
      const { incTransactions, ...rest } = theUser;
      let index = getIndexById(data.id, incTransactions);
      incTransactions.splice(index, 1, data);
      let newData = { ...theUser, incTransactions };
      setTheUser(newData);
      api.put(`/users/${theUser._id}`, newData);
      //put(`/users/${theUser._id}`, newData);
    } else {
      const { expTransactions, ...rest } = theUser;
      let index = getIndexById(data.id, expTransactions);
      expTransactions.splice(index, 1, data);
      let newData = { ...theUser, expTransactions };
      setTheUser(newData);
      //put(`/users/${theUser._id}`, newData);
      api.put(`/users/${theUser._id}`, newData);
    }
  }
  // handles adding transaction the the user transaction list
  function handleAddTransaction(data, incExp) {
    if (incExp === "Income") {
      const { incTransactions, ...rest } = theUser;
      incTransactions.push(data);
      let newData = { ...theUser, incTransactions };
      setTheUser(newData);
    } else if (incExp === "Expense") {
      const { expTransactions, ...rest } = theUser;
      expTransactions.push(data);
      let newData = { ...theUser, expTransactions };
      setTheUser(newData);
    }
    //put(`/users/${theUser._id}`, theUser);
    api.put(`/users/${theUser._id}`, theUser);
  }

  return (
    <>
      <Container fluid>
        <Toaster />
        <Header onLogout={handleLogout} theUser={theUser} loggedIn={loggedIn} />
        <Routes>
          <Route
            path="*"
            element={
              <Home
                onAddTransaction={handleAddTransaction}
                incomeCategories={incomeCategories}
                expenseCategories={expenseCategories}
                loggedIn={loggedIn}
                theUser={theUser}
                onSetTheUser={handleSetTheUser}
                onHandleLogin={handleLogin}
                onAddCategory={handleAddCategory}
                onEditTransaction={handleEditTransaction}
                onDeleteClick={handleDeleteClick}
                year={year}
                onHandleYearChange={handleYearChange}
                month={month}
                onHandleMonthChange={handleMonthChange}
                months={months}
                onHandleSetUser={handleUpdateUser}
                onHandleLogout={handleLogout}
              />
            }
          ></Route>
          <Route path="/Search" element={<Search />}></Route>
        </Routes>
      </Container>
    </>
  );
}

export default App;
