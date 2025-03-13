import { Col, Container, Row, Form } from "react-bootstrap";
import IncomeTable from "./Tables/IncomeTable";
import ExpenseTable from "./Tables/ExpenseTable";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

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
  const [filterdExpenseTrans, setFilteredExpenseTrans] = useState([]);

  const years = [];
  for (let i = 2020; i <= new Date().getFullYear(); i++) {
    years.push(i);
  }

  function filterByMonthAndYear(from) {
    let begin;
    let end;
    switch (from) {
      case "Januaray":
        begin = `${year}` + "-" + "01";
        end = `${year}` + "-" + "02";
        break;
      case "Feburary":
        begin = `${year}` + "-" + "02";
        end = `${year}` + "-" + "03";
        break;
      case "March":
        begin = `${year}` + "-" + "03";
        end = `${year}` + "-" + "04";
        break;
      case "April":
        begin = `${year}` + "-" + "04";
        end = `${year}` + "-" + "05";
        break;
      case "May":
        begin = `${year}` + "-" + "05";
        end = `${year}` + "-" + "06";
        break;
      case "June":
        begin = `${year}` + "-" + "06";
        end = `${year}` + "-" + "07";
        break;
      case "July":
        begin = `${year}` + "-" + "07";
        end = `${year}` + "-" + "08";
        break;
      case "August":
        begin = `${year}` + "-" + "08";
        end = `${year}` + "-" + "09";
        break;
      case "September":
        begin = `${year}` + "-" + "09";
        end = `${year}` + "-" + "10";
        break;
      case "October":
        begin = `${year}` + "-" + "10";
        end = `${year}` + "-" + "11";
        break;
      case "November":
        begin = `${year}` + "-" + "11";
        end = `${year}` + "-" + "12";
        break;
      case "December":
        begin = `${year}` + "-" + "12";
        end = `${year}` + "-" + "01-31";
        break;
      default:
        console.log("no date selected");
    }

    const expFilteredArray = theUser.expTransactions.filter((item) => {
      if (item.date >= begin && item.date <= end) {
        return item;
      }
    });

    const incFilteredArray = theUser.incTransactions.filter((item) => {
      if (item.date >= begin && item.date <= end) {
        return item;
      }
    });
    
    setFilteredIncomeTrans(incFilteredArray);
    setFilteredExpenseTrans(expFilteredArray);
  }

  useEffect(() => {
    filterByMonthAndYear(month)
  }, [month, year])

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
          <IncomeTable theUser={theUser} filteredIncomeTrans={filteredIncomeTrans} />
        </Col>
        <Col lg={6}>
          <ExpenseTable theUser={theUser} filteredExpenseTrans={filterdExpenseTrans} />
        </Col>
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
