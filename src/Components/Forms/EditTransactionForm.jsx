import React, { useState } from "react";
import { Button, Container, Form, FormLabel, Row } from "react-bootstrap";
import PropTypes from "prop-types";

export default function EditTransactionForm(props) {
  const {
    transaction,
    category,
    userCatList,
    onViewEditOff,
    onEditTransaction,
  } = props;
  const [newCat, setNewCat] = useState(transaction.category);
  const [newAmount, setNewAmount] = useState(transaction.amount);
  const [newDescription, setNewDescription] = useState(transaction.description);
  const [newHours, setNewHours] = useState(transaction.hours);
  const [newPto, setNewPto] = useState(transaction.ptoHours);
  const [newDate, setNewDate] = useState(transaction.date);

  function handleBackToTableClick() {
    onViewEditOff();
  }

  function handleSubmit(e) {
    e.preventDefault();
    transaction.amount = Number(newAmount);
    transaction.description = newDescription;
    transaction.date = newDate;
    transaction.ptoHours = Number(newPto);
    transaction.hours = Number(newHours);
    transaction.category = newCat;
    onEditTransaction(transaction, category);
    onViewEditOff();
  }

  return (
    <Container>
      <Row>
        <h4>Edit Transaction</h4>
        <h5>{category}</h5>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="category" className="w-25">
              Category:
            </Form.Label>
            <Form.Select
              className="w-25"
              id="category"
              onChange={(e) => setNewCat(e.target.value)}
              value={newCat}
            >
              <option key={1}>{newCat}</option>
              {userCatList.map((cat) => {
                return (
                  <option key={cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="amount">Amount: </Form.Label>
            <Form.Control
              type="number"
              id="amount"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              className="w-25"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="description">Description: </Form.Label>
            <Form.Control
              type="text"
              id="description"
              placeholder="Enter Description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-25"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="date">Date: </Form.Label>
            <Form.Control
              type="date"
              id="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-25"
            />
          </Form.Group>
          {newCat === "Tips" ? (
            <>
              <Form.Group>
                <Form.Label htmlFor="hours">Hours Worked:</Form.Label>
                <Form.Control
                  type="number"
                  value={newHours}
                  id="hours"
                  className="w-25"
                  onChange={(e) => setNewHours(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="ptoHours">PTO Hours:</Form.Label>
                <Form.Control
                  type="number"
                  value={newPto}
                  id="ptoHours"
                  className="w-25"
                  onChange={(e) => setNewPto(e.target.value)}
                />
              </Form.Group>
            </>
          ) : (
            <div></div>
          )}
          <Button className="mt-5" type="submit">
            Submit
          </Button>
          <Button onClick={handleBackToTableClick} className="mt-5 ms-5">
            Back to Table
          </Button>
        </Form>
      </Row>
    </Container>
  );
}

EditTransactionForm.propTypes = {
  transaction: PropTypes.array,
  category: PropTypes.string,
  userCatList: PropTypes.array,
  onViewEditOff: PropTypes.func,
  onEditTransaction: PropTypes.func,
};
