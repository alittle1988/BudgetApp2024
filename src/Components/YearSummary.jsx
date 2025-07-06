import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import YearlySummaryTable from "./Tables/YearlySummaryTable";
import PropTypes from "prop-types";

function YearSummary(props) {
  const { theUser, months, year } = props;

  return (
    <Container >
      <Row>
        <h2 className="text-center">Yearly Summary</h2>
      </Row>
      <Row>
      
        <YearlySummaryTable
          category="Income"
          theUser={theUser}
          months={months}
          year={year}
        />
        </Row>
        <Row>
      
        <YearlySummaryTable
          category="Expense"
          theUser={theUser}
          months={months}
          year={year}
        />
      
      </Row>
    </Container>
  );
}

export default YearSummary;

YearSummary.propTypes = {
  theUser: PropTypes.object,
  months: PropTypes.array,
  year: PropTypes.string,
};
