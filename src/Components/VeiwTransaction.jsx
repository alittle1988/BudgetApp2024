import { useEffect, useState } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TransactionTable from "./Tables/TransactionTable";
import { filterTransactionList } from "../Functions/functions";

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
  const [category, setCategory] = useState("All");
  const [catList, setCatList] = useState(["All", "Expense", "Income"]);
  const [viewFilters, setViewFilters] = useState(true);

  const [viewEdit, setViewEdit] = useState(false);

  const [transactionList, setTransactionsList] = useState(
    filterTransactionList(month, year, months, category, theUser)[0]
  );
  const [theUserTransCatList, setTheUserTransCatList] = useState(
    theUser.expCategories
  );
  const [deleteClick, setDeleteClick] = useState(true);

  const newYears = [];

  for (let i = 2020; i <= new Date().getFullYear(); i++) {
    newYears.push(i);
  }

  function handleViewFilterSwitch() {
    setViewFilters(!viewFilters);
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
    setTransactionsList(
      filterTransactionList(month, year, months, category, theUser)[0]
    );
  }, [category, month, year, deleteClick, theUser, months]);

  return (
    <Container>
      <Row>
        <Col>
          <h3 className="text-secondary text-center mb-5">All Transactions</h3>
        </Col>
      </Row>
      {viewFilters ? (
        <Row>
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
      ) : (
        <div></div>
      )}

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
          onHandleViewFilterSwitch={handleViewFilterSwitch}
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
