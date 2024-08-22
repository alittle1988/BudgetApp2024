import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import EditUser from "./Components/EditUser.jsx";
import Header from "./Components/Header.jsx";
import Home from "./Components/Home.jsx";
import Search from "./Components/Search.jsx";

import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";

function App() {
  const [theUser, setTheUser] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);
  console.log(theUser);

  // handle Logout click
  function handleLogout() {
    setLoggedIn(false);
    setTheUser({});
  }

  // handle login click
  function handleLogin() {
    setLoggedIn(true);
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
    fetch(`http://localhost:8080/users/${theUser.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(theUser),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
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
    } else {
      const { expTransactions, ...rest } = theUser;
      let index = getIndexById(data.id, expTransactions);
      expTransactions.splice(index, 1);
      let newData = { ...theUser, expTransactions };
      setTheUser(newData);
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
    } else {
      const { expTransactions, ...rest } = theUser;
      let index = getIndexById(data.id, expTransactions);
      expTransactions.splice(index, 1, data);
      let newData = { ...theUser, expTransactions };
      setTheUser(newData);
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
    fetch(`http://localhost:8080/users/${theUser.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(theUser),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  useEffect(() => {
    if (theUser === undefined) {
      return;
    } else {
      fetch(`http://localhost:8080/users/${theUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(theUser),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  }, [theUser]);

  return (
    <>
      <Container fluid>
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
              />
            }
          ></Route>
          <Route path="/Search" element={<Search />}></Route>
          <Route path="/EditUser" element={<EditUser />}></Route>
        </Routes>
      </Container>
    </>
  );
}

export default App;
