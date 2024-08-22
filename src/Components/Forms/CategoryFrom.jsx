import { Container, Form } from "react-bootstrap";
import PropTypes from 'prop-types';

function CategoryFrom(props) {
  const { onIncExpChange, incExp } = props;
  return (
    <Form>
      <Form.Label htmlFor="incExp">Income/Expense:</Form.Label>
      <Form.Select
        id="incExp"
        onChange={(e) => onIncExpChange(e.target.value)}
        value={incExp}
        className="w-50"
        name="selectExpenseIncome"
      >
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
      </Form.Select>
    </Form>
  );
}
export default CategoryFrom;

CategoryFrom.propTypes = {
  onIncExpChange: PropTypes.func,
  incExp: PropTypes.string
}