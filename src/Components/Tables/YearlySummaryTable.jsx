import { Container, Table, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import {
  filterTransactionList,
  incomeTotals,
  yearSummaryTotals,
} from "../../Functions/functions";

export default function YearlySummaryTable(props) {
  const { theUser, months, year, category } = props;

  // figure out making it dynamic by looping through categories
  return (
    <Container>
      <Row className="mt-5">
        <h3 className="text-center text-decoration-underline">
          {category} Table
        </h3>
      </Row>
      <Row>
        <Table className="table table-sm  table-hover  table-striped">
          <thead className="thead-light">
            <tr style={{height: "25px"}}>
              <th>Month</th>
              {category === "Income"
                ? theUser.incCategories.map((item) => {
                    return <th key={item.name}>{item.name}</th>;
                  })
                : theUser.expCategories.map((item) => {
                    return <th key={item.name}>{item.name}</th>;
                  })}
              {category === "Income" ? <th>Hours Worked</th> : <div></div>}
              {category === "Income" ? <th>Tips Per/Hr</th> : <div></div>}
            </tr>
          </thead>
          <tbody>
            {months.map((month) => {
              return (
                <tr key={month}>
                  <td>{month}</td>
                  {category === "Income"
                    ? theUser.incCategories.map((item) => {
                        return (
                          <>
                            <td key={item.name}>
                              $
                              {
                                yearSummaryTotals(
                                  theUser.incTransactions,
                                  months,
                                  month,
                                  year,
                                  `${item.name}`
                                )[0] 
                              }
                            </td>
                          </>
                        );
                      })
                    : theUser.expCategories.map((item) => {
                        return (
                          <td key={item.name}>
                            $
                            {
                              yearSummaryTotals(
                                theUser.expTransactions,
                                months,
                                month,
                                year,
                                `${item.name}`
                              )[0]
                            }
                          </td>
                        );
                      })}
                  {category === "Income" ? (
                    <td>
                      {
                        incomeTotals(
                          filterTransactionList(
                            month,
                            year,
                            months,
                            "Income",
                            theUser
                          )[0]
                        )[1]
                      }
                    </td>
                  ) : (
                    <div></div>
                  )}
                  {category === "Income" ? (
                    <td>
                      {(
                        yearSummaryTotals(
                          theUser.incTransactions,
                          months,
                          month,
                          year,
                          `Tips`
                        )[0] /
                        incomeTotals(
                          filterTransactionList(
                            month,
                            year,
                            months,
                            "Income",
                            theUser
                          )[0]
                        )[1]
                      ).toFixed(2)}
                    </td>
                  ) : (
                    <div></div>
                  )}
                </tr>
              );
            })}
            <tr></tr>
            <tr className="table-success">
              <th>Year Totals</th>
              {category === "Income"
                ? theUser.incCategories.map((item) => {
                    return (
                      <th key={item.name}>
                        {
                          yearSummaryTotals(
                            theUser.incTransactions,
                            months,
                            "",
                            year,
                            `${item.name}`
                          )[1]
                        }
                      </th>
                    );
                  })
                : theUser.expCategories.map((item) => {
                    return (
                      <th key={item.name}>
                        {
                          yearSummaryTotals(
                            theUser.expTransactions,
                            months,
                            "",
                            year,
                            `${item.name}`
                          )[1]
                        }
                      </th>
                    );
                  })}
              {category === "Income" ? (
                <td>{incomeTotals(theUser.incTransactions)[1]}</td>
              ) : (
                <div></div>
              )}
              {category === "Income" ? (
                <td>{(yearSummaryTotals(theUser.incTransactions, months, "", year, 'Tips')[1] / incomeTotals(theUser.incTransactions)[1]).toFixed(2)}</td>
              ) : (
                <div></div>
              )}
            </tr>
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}

YearlySummaryTable.propTypes = {
  theUser: PropTypes.object,
  months: PropTypes.array,
  year: PropTypes.string,
  category: PropTypes.string,
};
