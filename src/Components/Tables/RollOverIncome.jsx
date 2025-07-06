import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Container, Row, Table } from "react-bootstrap";
import { incomeTotals, expenseTotals } from "../../Functions/functions";

function RollOverIncome(props) {
  const { theUser, filteredIncomeList, filteredExpenseList } = props;
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);

  useEffect(() => {
    setIncomeTotal(incomeTotals(filteredIncomeList)[0]);
    setExpenseTotal(expenseTotals(theUser, filteredExpenseList)[0]);
  }, [filteredIncomeList, filteredExpenseList, theUser]);

  return (
    <Container>
      <Row>
        <h4 className="text-center my-5">Rollover Income</h4>
      </Row>
      <Table className="table table-striped">
        <thead className="table-">
          <tr>
          <th>Rollover Income</th>
          <th>Savings</th>
          <th>Goal Savings</th>
          <th>Extra</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${(incomeTotal - expenseTotal).toFixed(2)}</td>
            <td>${((incomeTotal - expenseTotal) * 0.8).toFixed(2)}</td>
            <td>${((incomeTotal - expenseTotal) * 0.1).toFixed(2)}</td>
            <td>${((incomeTotal - expenseTotal) * 0.1).toFixed(2)}</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

RollOverIncome.propTypes = {
  theUser: PropTypes.object,
  filteredIncomeList: PropTypes.array,
  filteredExpenseList: PropTypes.array,
};

export default RollOverIncome;
