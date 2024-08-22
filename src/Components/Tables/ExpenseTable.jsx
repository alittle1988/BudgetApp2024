import { useState } from "react";
import { Container } from "react-bootstrap";
import { getTotalByCat } from "../../Functions/functions";
import PropTypes from "prop-types";
export default function ExpenseTable(props) {
  const { theUser } = props;
  const [negative, setNegative] = useState(false);

  function expenseTotals() {
    let expenseTotal = 0;
    let diffTotal = 0;
    let budgetTotal = 0;

    theUser.expTransactions.forEach((trans) => {
      expenseTotal += trans.amount;
    });
    theUser.expCategories.forEach((trans) => {
      budgetTotal += trans.amount;
    });
    diffTotal = budgetTotal - expenseTotal;

    return [expenseTotal, budgetTotal, diffTotal];
  }
  expenseTotals();
  const [expenseTotal, budgetTotal, diffTotal] = expenseTotals();

  function setText(amount, cost) {
    if(amount < cost) {
      return 'text-danger'
    }
  }

  return (
    <Container>
      <h3 className="mb-5">Summary of Expenses</h3>
      <table className="table table-sm">
        <thead className="table-secondary">
          <tr>
            <th>Category</th>
            <th>Budget</th>
            <th>Acutal</th>
            <th>Difference</th>
          </tr>
        </thead>
        <tbody>
          {theUser.expCategories.map((cat) => {
            return (
              <tr key={cat.name}>
                <td>{cat.name}</td>
                <td>${cat.amount}</td>
                <td>
                  ${getTotalByCat(theUser.expTransactions, cat.name, "amount")}
                </td>
                <td className={setText(cat.amount, getTotalByCat(theUser.expTransactions, cat.name, "amount"))}>
                  $
                  {cat.amount -
                    getTotalByCat(theUser.expTransactions, cat.name, "amount")}
                </td>
              </tr>
            );
          })}
          <tr className="table-primary">
            <td>Totals</td>
            <td>${budgetTotal}</td>
            <td>${expenseTotal}</td>
            {diffTotal < 0 ? (
              <td className="text-danger">-${diffTotal}</td>
            ) : (
              <td>${diffTotal}</td>
            )}
          </tr>
        </tbody>
      </table>
    </Container>
  );
}

ExpenseTable.propTypes = {
  theUser: PropTypes.object,
};
