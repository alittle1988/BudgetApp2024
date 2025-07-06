import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { getTotalByCat, getExpensesByCat } from "../../Functions/functions";
import PropTypes from "prop-types";
import { expenseTotals } from "../../Functions/functions";
export default function ExpenseTable(props) {
  const { theUser, filteredExpenseTrans } = props;
  
  /*function expenseTotals() {
    let expenseTotal = 0;
    let diffTotal = 0;
    let budgetTotal = 0;

    filteredExpenseTrans.forEach((trans) => {
      expenseTotal += trans.amount;
    });
    theUser.expCategories.forEach((trans) => {
      budgetTotal += trans.amount;
    });
    diffTotal = budgetTotal - expenseTotal;

    return [expenseTotal, budgetTotal, diffTotal];
  }*/
  
  const [expenseTotal, budgetTotal, diffTotal] = expenseTotals(theUser, filteredExpenseTrans);
 

  function setText(amount, cost) {
    if (amount < cost) {
      return "text-danger";
    } else if (amount > cost) {
      return "text-success";
    }
  }
  

  return (
    <Container>
      <h3 className="mb-5">Monthly Expenses by Category</h3>
      <table className="table table-sm table-striped">
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
                <td>${getExpensesByCat(filteredExpenseTrans, cat.name)}</td>
                <td
                  className={setText(
                    cat.amount,
                    getTotalByCat(filteredExpenseTrans, cat.name, "amount")
                  )}
                >
                  $
                  {(
                    cat.amount -
                    getTotalByCat(filteredExpenseTrans, cat.name, "amount")
                  ).toFixed(2)}
                </td>
              </tr>
            );
          })}
          <tr className="table-primary">
            <td>Totals</td>
            <td>${budgetTotal.toFixed(2)}</td>
            <td>${expenseTotal.toFixed(2)}</td>
            {diffTotal < 0 ? (
              <td className="text-danger">
                ${(-diffTotal).toFixed(2)}What the heck
              </td>
            ) : (
              <td className="text-success">${diffTotal.toFixed(2)}</td>
            )}
          </tr>
        </tbody>
      </table>
    </Container>
  );
}

ExpenseTable.propTypes = {
  theUser: PropTypes.object,
  filteredExpenseTrans: PropTypes.array,
};
