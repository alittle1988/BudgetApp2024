import { Container, Row, Table } from "react-bootstrap";
import { getTotalByCat } from "../../Functions/functions";
import PropTypes from "prop-types";
import { incomeTotals } from "../../Functions/functions";
function IncomeTable(props) {
  const { theUser, filteredIncomeTrans } = props;

   
  
  const [income, hours, pto] = incomeTotals(filteredIncomeTrans);

  
  return (
    <Container>
      <Row>
        <h3 className="mb-5">Monthly Income by Category</h3>
        <Table className="table table-sm table-striped">
          <thead>
            <tr className="table-secondary">
              <th>Category</th>
              <th>Total</th>
              <th>Hours Worked</th>
              <th>Tips Per/Hr</th>
              <th>PTO</th>
            </tr>
          </thead>
          <tbody className="">
            {theUser.incCategories.map((cat, index) => {
              return (
                <tr key={index}>
                  <td>{cat.name}</td>
                  <td>
                    $
                    {Math.round(
                      getTotalByCat(filteredIncomeTrans, cat.name, "amount") *
                        100
                    ) / 100}
                  </td>
                  <td>
                    {Math.round(
                      getTotalByCat(filteredIncomeTrans, cat.name, "hours") *
                        100
                    ) / 100 || 0}
                  </td>
                  {cat.name === "Tips" ? <td>{(getTotalByCat(filteredIncomeTrans, cat.name, "amount") / hours).toFixed(2)}</td> : <td></td>}
                  <td>
                    {Math.round(
                      getTotalByCat(filteredIncomeTrans, cat.name, "pto") * 100
                    ) / 100 || 0}
                  </td>
                </tr>
              );
            })}
            <tr className="table-primary">
              <td>Totals</td>
              <td>${((income * 100) / 100).toFixed(2)}</td>
              <td>{(hours * 100) / 100 || 0}</td>
              <td></td>
              <td>{(pto * 100) / 100 || 0}</td>
            </tr>
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}

export default IncomeTable;

IncomeTable.propTypes = {
  theUser: PropTypes.object,
  filteredIncomeTrans: PropTypes.array,
};
