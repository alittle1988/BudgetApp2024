import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { getTotalByCat } from "../../Functions/functions";
import PropTypes from 'prop-types';
function IncomeTable(props) {
  const { theUser } = props;
  const [amountTot, setAmountTot] = useState();
  const [hoursTot, setHoursTot] = useState(0);
  const [ptoTot, setPtoTot] = useState(0);

  function incomeTotals() {
    let incomeTotal = 0;
    let hoursTotal = 0;
    let ptoTotal = 0;

    theUser.incTransactions.forEach((trans) => {
      incomeTotal += trans.amount;
      hoursTotal += trans.hours;
      ptoTotal += trans.ptoHours;
    });

    return [incomeTotal, hoursTotal, ptoTotal];
  }
  incomeTotals();
  const [income, hours, pto] = incomeTotals();
  

  return (
    <Container>
      <Row>
        <h3 className="mb-5">Summary of Income</h3>
        <table className="table table-sm">
          <thead>
            <tr className="table-secondary">
              <th>Category</th>
              <th>Total</th>
              <th>Hours Worked</th>
              <th>PTO</th>
            </tr>
          </thead>
          <tbody className="">
            {theUser.incCategories.map((cat, index) => {
              return (
                <tr key={index}>
                  <td>{cat.name}</td>
                  <td>
                    ${getTotalByCat(theUser.incTransactions, cat.name, "amount")}
                  </td>
                  <td>
                    {getTotalByCat(theUser.incTransactions, cat.name, "hours")}
                  </td>
                  <td>{getTotalByCat(theUser.incTransactions, cat.name, "pto")}</td>
                </tr>
              );
            })}
            <tr className="table-primary">
              <td>Totals</td>
              <td>${income}</td>
              <td>{hours}</td>
            </tr>
          </tbody>
        </table>
      </Row>
    </Container>
  );
}

export default IncomeTable;

IncomeTable.propTypes = {
  theUser: PropTypes.object,
}