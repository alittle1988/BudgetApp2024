import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Table } from "react-bootstrap";
import { yearSummaryTotals } from "../../Functions/functions";

function GasBreakDown(props) {
  const { month, year, months, theUser } = props;

  return (
    <Container>
      <Row>
        <h2 className="my-4">Monthly Gas Breakdown</h2>
      </Row>
      <Table className="table table-striped ">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Gas Gallons</th>
            <th>Avg. Dollars Per/Gal</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          <tr>
            <td>
              $
              {
                yearSummaryTotals(
                  theUser.expTransactions,
                  months,
                  month,
                  year,
                  "Gas"
                )[0]
              }
            </td>
            <td>
              {
                yearSummaryTotals(
                  theUser.expTransactions,
                  months,
                  month,
                  year,
                  "Gas"
                )[2]
              }
            </td>
            <td>
              $
              {(
                yearSummaryTotals(
                  theUser.expTransactions,
                  months,
                  month,
                  year,
                  "Gas"
                )[0] /
                yearSummaryTotals(
                  theUser.expTransactions,
                  months,
                  month,
                  year,
                  "Gas"
                )[2]
              ).toFixed(2)}
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

GasBreakDown.propTypes = {
  month: PropTypes.string,
  months: PropTypes.array,
  theUser: PropTypes.object,
  year: PropTypes.string,
};

export default GasBreakDown;
