import React, { useEffect, useState } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TransactionTable from "./Tables/TransactionTable";

function VeiwTransaction(props) {
  const {
    theUser,
    onEditTransaction,
    onDeleteClick,
    year,
    onHandleYearChange,
    month,
    months,
    onHandleMonthChange,
  } = props;
  const [category, setCategory] = useState("Expense");
  const [catList, setCatList] = useState(["All", "Expense", "Income"]);

  const [viewEdit, setViewEdit] = useState(false);

  const [transactionList, setTransactionsList] = useState(filterTrans(month));
  const [theUserTransCatList, setTheUserTransCatList] = useState(
    theUser.expCategories
  );
  const [deleteClick, setDeleteClick] = useState(true);

  const newYears = [];

  for (let i = 2020; i <= new Date().getFullYear(); i++) {
    newYears.push(i);
  }

  function filterTrans(from) {
    let begin;
    let end;
    switch (from) {
      case "Januaray":
        begin = `${year}` + "-" + "01";
        end = `${year}` + "-" + "02";
        break;
      case "Feburary":
        begin = `${year}` + "-" + "02";
        end = `${year}` + "-" + "03";
        break;
      case "March":
        begin = `${year}` + "-" + "03";
        end = `${year}` + "-" + "04";
        break;
      case "April":
        begin = `${year}` + "-" + "04";
        end = `${year}` + "-" + "05";
        break;
      case "May":
        begin = `${year}` + "-" + "05";
        end = `${year}` + "-" + "06";
        break;
      case "June":
        begin = `${year}` + "-" + "06";
        end = `${year}` + "-" + "07";
        break;
      case "July":
        begin = `${year}` + "-" + "07";
        end = `${year}` + "-" + "08";
        break;
      case "August":
        begin = `${year}` + "-" + "08";
        end = `${year}` + "-" + "09";
        break;
      case "September":
        begin = `${year}` + "-" + "09";
        end = `${year}` + "-" + "10";
        break;
      case "October":
        begin = `${year}` + "-" + "10";
        end = `${year}` + "-" + "11";
        break;
      case "November":
        begin = `${year}` + "-" + "11";
        end = `${year}` + "-" + "12";
        break;
      case "December":
        begin = `${year}` + "-" + "12";
        end = `${year}` + "-" + "01-31";
        break;
      default:
        console.log("no date selected");
    }

    if (category === "Expense") {
      const filteredArray = theUser.expTransactions.filter((item) => {
        if (item.date >= begin && item.date <= end) {
          return item;
        }
      });

      return filteredArray;
    } else if (category === "Income") {
      const filteredArray = theUser.incTransactions.filter((item) => {
        if (item.date >= begin && item.date <= end) {
          return item;
        }
      });

      return filteredArray;
    } else if (category === "All") {
      let newArray = theUser.incTransactions.concat(theUser.expTransactions);

      const filteredArray = newArray.filter((item) => {
        if (item.date >= begin && item.date <= end) {
          return item;
        }
      });

      return filteredArray;
    }
  }

  function handleViewEditOff() {
    setViewEdit(false);
  }
  function handleViewEditOn() {
    setViewEdit(true);
  }
  function handleCatChange(e) {
    if (e === "Income") {
      //setTransactionsList(theUser.incTransactions)
      setTheUserTransCatList(theUser.incCategories);
    } else if (e === "Expense") {
      //setTransactionsList(theUser.expTransactions)
      setTheUserTransCatList(theUser.expCategories);
    } else {
      let newArray = theUser.expCategories.concat(theUser.incCategories);
      setTheUserTransCatList(newArray);
    }

    handleViewEditOff();
    setCategory(e);
  }

  function handleRemoveTrans() {
    setDeleteClick(!deleteClick);
  }

  useEffect(() => {
    setTransactionsList(filterTrans(month));
  }, [category, month, year, deleteClick]);

  return (
    <Container>
      <Row>
        <Col>
          <h3 className="text-secondary text-center mb-5">All Transactions</h3>
        </Col>
      </Row>
      <Row >
        <Col lg={4}>
          <Form>
            <Form.Group>
              <Form.Select
                onChange={(e) => onHandleYearChange(e.target.value)}
                value={year}
                className="w-50"
              >
                {newYears.map((yearNum) => {
                  return <option key={yearNum}>{yearNum}</option>;
                })}
              </Form.Select>
            </Form.Group>
          </Form>
        </Col>
        <Col lg={4}>
          <Form>
            <Form.Group>
              <Form.Select
                onChange={(e) => onHandleMonthChange(e.target.value)}
                value={month}
                className="w-50"
              >
                {months.map((month) => {
                  return <option key={month}>{month}</option>;
                })}
              </Form.Select>
            </Form.Group>
          </Form>
        </Col>
        <Col col={4}>
          <Form>
            <Form.Select
              className="w-50"
              onChange={(e) => handleCatChange(e.target.value)}
              value={category}
            >
              {catList.map((cat) => {
                return <option key={cat}>{cat}</option>;
              })}
            </Form.Select>
          </Form>
        </Col>
      </Row>

      <Row className="mt-5">
        <TransactionTable
          theUserCat={theUserTransCatList}
          category={category}
          transactions={transactionList}
          theUser={theUser}
          onViewEditOn={handleViewEditOn}
          viewEdit={viewEdit}
          onViewEditOff={handleViewEditOff}
          onEditTransaction={onEditTransaction}
          onDeleteClick={onDeleteClick}
          onRemoveTrans={handleRemoveTrans}
        />
      </Row>
    </Container>
  );
}

export default VeiwTransaction;

VeiwTransaction.propTypes = {
  theUser: PropTypes.object,
  onEditTransaction: PropTypes.func,
  onDeleteClick: PropTypes.func,
  year: PropTypes.string,
  onHandleYearChange: PropTypes.func,
  month: PropTypes.string,
  months: PropTypes.array,
  onHandleMonthChange: PropTypes.func,
};
