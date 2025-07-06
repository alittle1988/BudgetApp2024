import React from "react";
import { Row, Nav} from "react-bootstrap";
import { Link } from "react-router-dom";

function NavBar() {

    return (
        <Row className="mb-5">
        <Nav className="justify-content-around">
          <Nav.Item>
            <Link to="/">Home</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/addTransaction">Add Transaction/Category</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/viewTransaction">View Transactions</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/YearSummary">Year Summary</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/EditUser">Edit User</Link>
          </Nav.Item>
        </Nav>
      </Row>

    )
}

export default NavBar;