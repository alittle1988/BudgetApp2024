import { Col, Container, Row, Form } from "react-bootstrap";
import IncomeTable from "./Tables/IncomeTable";
import ExpenseTable from "./Tables/ExpenseTable";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { filterTransactionList } from "../Functions/functions";
import GasBreakDown from "./Tables/GasBreakDown";
import RollOverIncome from "./Tables/RollOverIncome";

function UserMain(props) {
  const {
    theUser,
    month,
    months,
    onHandleYearChange,
    year,
    onHandleMonthChange,
  } = props;
  const [filteredIncomeTrans, setFilteredIncomeTrans] = useState([]);
  const [filteredExpenseTrans, setFilteredExpenseTrans] = useState([]);

  const years = [];
  for (let i = 2020; i <= new Date().getFullYear(); i++) {
    years.push(i);
  }

  useEffect(() => {
    setFilteredExpenseTrans(
      filterTransactionList(month, year, months, "Expense", theUser)[0]
    );
    setFilteredIncomeTrans(
      filterTransactionList(month, year, months, "Income", theUser)[0]
    );
  }, [month, year, months, theUser]);

  return (
    <Container>
      <Row>
        <Col col={6}>
          <Form>
            <Form.Select
              className="w-25 mb-5"
              onChange={(e) => onHandleYearChange(e.target.value)}
              value={year}
            >
              {years.map((year) => {
                return <option key={year}>{year}</option>;
              })}
            </Form.Select>
          </Form>
        </Col>
        <Col col={6}>
          <Form>
            <Form.Select
              className="w-25 mb-5"
              onChange={(e) => onHandleMonthChange(e.target.value)}
              value={month}
            >
              {months.map((month) => {
                return <option key={month}>{month}</option>;
              })}
            </Form.Select>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <IncomeTable
            theUser={theUser}
            filteredIncomeTrans={filteredIncomeTrans}
          />
          <GasBreakDown
            month={month}
            year={year}
            months={months}
            theUser={theUser}
            
          />
        </Col>
        <Col lg={6}>
          <ExpenseTable
            theUser={theUser}
            filteredExpenseTrans={filteredExpenseTrans}
          />
        </Col>
      </Row>
      <Row>
        <RollOverIncome
          theUser={theUser}
          filteredIncomeList={filteredIncomeTrans}
          filteredExpenseList={filteredExpenseTrans}
        />
      </Row>
    </Container>
  );
}

export default UserMain;

UserMain.propTypes = {
  theUser: PropTypes.object,
  month: PropTypes.string,
  months: PropTypes.array,
  year: PropTypes.string,
  onHandleMonthChange: PropTypes.func,
  onHandleYearChange: PropTypes.func,
};
