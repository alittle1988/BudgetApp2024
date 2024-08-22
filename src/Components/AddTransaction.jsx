import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import CategoryFrom from "./Forms/CategoryFrom";
import PropTypes from 'prop-types';
import TransactionForm from "./Forms/TransactionForm";

function AddTransaction(props) {
  const {
    incomeCategories,
    onAddCategory,
    expenseCategories,
    onAddTransaction,
  } = props;
  const [incExp, setIncExp] = useState("Income");
  const [newCategory, setNewCategory] = useState("");
  const [budgetAmt, setBudgetAmt] = useState(0);
  const [catVal, setCatVal] = useState(false);
  const [budgVal, setBudgVal] = useState(false);
  const [disabled, setDisabled] = useState(false);

  function handleIncExpChange(data) {
    setIncExp(data);
  }
  function handleCategorySubmit(e) {
    e.preventDefault();
    let stop = false;
    if (incExp === "Income") {
      incomeCategories.forEach((cat) => {
        if (cat.name.toLowerCase() === newCategory.toLowerCase()) {
          stop = true;
          setDisabled(true);
          setCatVal(true);
        }
      });
    } else {
      expenseCategories.forEach((cat) => {
        if (cat.name.toLowerCase() === newCategory.toLowerCase()) {
          stop = true;
          setDisabled(true);
          setCatVal(true);
        }
      });
    }
    if (stop) {
      return;
    } else {
      if (incExp === "Expense") {
        onAddCategory({ name: newCategory, amount: Number(budgetAmt) }, incExp);
        setNewCategory("");
        setBudgetAmt(0);
      } else {
        onAddCategory({ name: newCategory }, incExp);
        setNewCategory("");
      }
    }
  }

  function handleCatChange(e) {
    setNewCategory(e);
    setCatVal(false);
    setDisabled(false);
  }
  function handleBudgetAmtChange(e) {
    setBudgetAmt(e);
    setBudgVal(false);
    setDisabled(false);
  }

  return (
    <Container>
      <Row>
        <Col lg={6}>
          <h3 className="mb-5">Add Transaction</h3>
          <CategoryFrom incExp={incExp} onIncExpChange={handleIncExpChange} />

          {incExp === "Income" ? (
            <TransactionForm
              incExp={incExp}
              onAddTransaction={onAddTransaction}
              categories={incomeCategories}
            />
          ) : (
            <TransactionForm
              incExp={incExp}
              onAddTransaction={onAddTransaction}
              categories={expenseCategories}
            />
          )}
        </Col>
        <Col lg={6}>
          <h3 className="mb-5">Add Category</h3>
          <CategoryFrom incExp={incExp} onIncExpChange={handleIncExpChange} />
          <Form onSubmit={handleCategorySubmit}>
            <Form.Label htmlFor="addCategory">Add Category</Form.Label>
            <Form.Control
              placeholder="Enter new Category"
              id="addCategory"
              type="text"
              className="w-50"
              value={newCategory}
              onChange={(e) => handleCatChange(e.target.value)}
            ></Form.Control>
            {catVal ? (
              <Form.Text className="text-danger">
                Category already Exist
              </Form.Text>
            ) : (
              <div></div>
            )}
            {incExp === "Expense" ? (
              <Form.Group>
                <Form.Label htmlFor="budgetAmt">Budget Amount:</Form.Label>
                <Form.Control
                  id="budgetAmt"
                  placeholder="Enter amount"
                  type="number"
                  className="w-50"
                  value={budgetAmt}
                  onChange={(e) => handleBudgetAmtChange(e.target.value)}
                ></Form.Control>
              </Form.Group>
            ) : (
              <div></div>
            )}
            {budgVal ? (
              <Form.Text className="text-danger">
                Please Enter Budget Amount
              </Form.Text>
            ) : (
              <div></div>
            )}
            <br></br>
            <Button disabled={disabled} type="submit" className="mt-5">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddTransaction;

AddTransaction.propTypes = {
  incomeCategories: PropTypes.array,
    onAddCategory: PropTypes.func,
    expenseCategories: PropTypes.array,
    onAddTransaction: PropTypes.func,
}
