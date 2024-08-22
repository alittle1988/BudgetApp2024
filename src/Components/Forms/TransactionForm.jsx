import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import PropTypes from 'prop-types';

function TransactionForm(props) {
  const { categories, incExp, onAddTransaction } = props;
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [catVal, setCatVal] = useState(false);
  const [amountVal, setAmountVal] = useState(false);
  const [dateVal, setDateVal] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [hours, setHours] = useState(0);
  const [ptoHours, setPtoHours] = useState(0);

  function handleSubmitClick(e) {
    e.preventDefault();
    if (amount === 0) {
      setAmountVal(true);
      setDisabled(true);
      return;
    }
    if (date === "") {
      setDateVal(true);
      setDisabled(true);
      return;
    }
    if (category === "" || category === "Select a Category") {
      setCatVal(true);
      setDisabled(true);
      return;
    }

    let newTrans = {
      category: category,
      description: description,
      amount: Number(amount),
      date: date,
      hours: Number(hours),
      ptoHours: Number(ptoHours),
      id: Date.now(),
    };
    onAddTransaction(newTrans, incExp);
    setCategory("");
    setDescription("");
    setAmount(0);
    setDate("");
    setCategory("");
    setHours(0);
    setPtoHours(0);
  }
  function handleAmountChange(e) {
    setAmount(e);
    setDisabled(false);
    setAmountVal(false);
  }

  function handleDatechange(e) {
    setDate(e);
    setDisabled(false);
    setDateVal(false);
  }

  function handleCatChange(e) {
    setCategory(e);
    setDisabled(false);
    setCatVal(false);
  }
  return (
    <Container>
      <Form onSubmit={handleSubmitClick}>
        <Form.Label htmlFor="selectCategory">Category: </Form.Label>
        {incExp === "Income" ? (
          <Form.Select
            id="selectCategory"
            value={category}
            name="selectCategory"
            className="w-50"
            onChange={(e) => handleCatChange(e.target.value)}
          >
            <option>Select a Category</option>
            {categories.map((category) => {
              return (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              );
            })}
          </Form.Select>
        ) : (
          <Form.Select
            id="selectCategory"
            value={category.name}
            name="selectCategory"
            className="w-50"
            onChange={(e) => handleCatChange(e.target.value)}
          >
            <option>Select a Category</option>
            {categories.map((category) => {
              return (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              );
            })}
          </Form.Select>
        )}
        {catVal ? (
          <p className="text-danger font-weight-bold">
            Please select a category!
          </p>
        ) : (
          <div></div>
        )}
        {category === "Tips" ? (
          <Form.Group>
            <Form.Label htmlFor="pto">PTO Hours</Form.Label>
            <Form.Control
              type="number"
              id="pto"
              className="w-50"
              value={ptoHours}
              onChange={(e) => setPtoHours(e.target.value)}
              placeholder="PTO Hours"
              min={0}
            ></Form.Control>
          </Form.Group>
        ) : (
          <div></div>
        )}
        <Form.Group>
          <Form.Label htmlFor="description">Description:</Form.Label>
          <Form.Control
            type="text"
            id="description"
            className="w-50"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          ></Form.Control>
        </Form.Group>

        {category === "Tips" ? (
          <Form.Group>
            <Form.Label htmlFor="hours">Hours Worked:</Form.Label>
            <Form.Control
              type="number"
              id="hours"
              className="w-50"
              value={hours}
              min={0}
              onChange={(e) => setHours(e.target.value)}
              placeholder="hours"
            ></Form.Control>
          </Form.Group>
        ) : (
          <div></div>
        )}
        <Form.Label htmlFor="amount">Amount:</Form.Label>
        <Form.Control
          type="number"
          id="amount"
          className="w-50"
          value={amount}
          onChange={(e) => handleAmountChange(e.target.value)}
          placeholder="Amount"
          min={0}
        ></Form.Control>
        {amountVal ? (
          <p className="text-danger ">Please enter amount!</p>
        ) : (
          <div></div>
        )}
        <Form.Label htmlFor="date">Date:</Form.Label>
        <Form.Control
          value={date}
          type="date"
          id="date"
          className="w-50"
          onChange={(e) => handleDatechange(e.target.value)}
        ></Form.Control>
        {dateVal ? (
          <p className="text-danger font-weight-bold">Please select a date!</p>
        ) : (
          <div></div>
        )}
        <Button type="submit" disabled={disabled} className="mt-5">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default TransactionForm;

TransactionForm.propTypes = {
  categories: PropTypes.array, 
  incExp: PropTypes.string,
  onAddTransaction: PropTypes.func
}