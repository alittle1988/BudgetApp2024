import { Container, Row } from "react-bootstrap";
import { getTotalByCat } from "../../Functions/functions";
import PropTypes from 'prop-types';
function IncomeTable(props) {
  const { theUser, filteredIncomeTrans } = props;
  

  function incomeTotals() {
    let incomeTotal = 0;
    let hoursTotal = 0;
    let ptoTotal = 0;
    //theUser.incTransactions
    filteredIncomeTrans.forEach((trans) => {
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
                    ${Math.round(getTotalByCat(filteredIncomeTrans, cat.name, "amount") * 100) / 100}
                  </td>
                  <td>
                    {Math.round(getTotalByCat(filteredIncomeTrans, cat.name, "hours") * 100) / 100 || 0}
                  </td>
                  <td>{Math.round(getTotalByCat(filteredIncomeTrans, cat.name, "pto") * 100) / 100 || 0}</td>
                </tr>
              );
            })}
            <tr className="table-primary">
              <td>Totals</td>
              <td >${income *100 / 100}</td>
              <td>{hours  *100 / 100 || 0}</td>
              <td>{pto  *100 / 100 || 0}</td>
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
  filteredIncomeTrans: PropTypes.array
}