import { useEffect, useState } from "react";
import { Container, Row, Form, Button } from "react-bootstrap";
import EditTransaction from "../EditTransaction";
import PropTypes from 'prop-types';


function TransactionTable(props) {
  const {
    transactions,
    category,
    theUserCat,
    theUser,
    viewEdit,
    onViewEditOn,
    onViewEditOff,
    onEditTransaction,
    onDeleteClick,
    onRemoveTrans,
    
  } = props;
  const [transToDisplay, setTransToDisplay] = useState(transactions);
  const [cat, setCat] = useState("All");
  const [editTrans, setEditTrans] = useState({});
 

  // handles setting the categories dropdown list
  function handleCatSelect(e) {
    setCat(e);
    let newArray = [];
    transactions.forEach((trans) => {
      if (e === "All") {
        newArray.push(trans);
      } else if (e === trans.category) {
        newArray.push(trans);
      }
    });
    setTransToDisplay(newArray);
    onViewEditOff(); 
    
  }

  //handles Click to edit Transaction
  function handleTransClick(e, index) {
    setEditTrans(e);
    onViewEditOn();
  }

  //handles deleting Transaction

  function handleDeleteBtnClick(e) {
    if (confirm("Are you sure you want to delete transaction?")) {
      onDeleteClick(e, category);
      onRemoveTrans()
    }
    
  }
  useEffect(() => {
    setTransToDisplay(transactions);
    //handleCatSelect(cat)
    setCat('All')
    
  }, [transactions]);

  return (
    <>
      <Container>
        <Row className="mb-5">
          <Form>
            <Form.Select
              className="w-25"
              onChange={(e) => handleCatSelect(e.target.value)}
              placeholder="Select Category"
              value={cat}
            >
              <option>All</option>
              {theUserCat.map((cat, index) => {
                return <option key={index}>{cat.name}</option>;
              })}
            </Form.Select>
          </Form>
        </Row>
        {viewEdit ? (
          <EditTransaction
            onEditTransaction={onEditTransaction}
            onViewEditOff={onViewEditOff}
            transaction={editTrans}
            category={category}
            theUser={theUser}
          />
        ) : (
          <Row>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {transToDisplay.map((trans, index) => {
                  return (
                    <>
                      <tr className="table-secondary" key={index}>
                        <th onClick={(e) => handleTransClick(trans, index)}>
                          {trans.date}
                        </th>
                        <td onClick={(e) => handleTransClick(trans, index)}>
                          {trans.category}
                        </td>
                        <td onClick={(e) => handleTransClick(trans, index)}>
                          ${trans.amount}
                        </td>
                        {category === "Income" && trans.description === "" ? (
                          <td onClick={(e) => handleTransClick(trans, index)}>
                            {trans.hours} hours worked
                          </td>
                        ) : (
                          <td onClick={(e) => handleTransClick(trans, index)}>
                            {trans.description}
                          </td>
                        )}
                        <td key={`button${index}`}>
                        <Button
                          className="btn-danger"
                          onClick={(e) => handleDeleteBtnClick(trans)}
                        >
                          Delete
                        </Button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </Row>
        )}
      </Container>
    </>
  );
}

export default TransactionTable;

TransactionTable.propTypes = {
  transactions: PropTypes.array,
    category: PropTypes.string,
    theUserCat: PropTypes.array,
    theUser: PropTypes.object,
    viewEdit: PropTypes.bool,
    onViewEditOn: PropTypes.func,
    onViewEditOff: PropTypes.func,
    onEditTransaction: PropTypes.func,
    onDeleteClick: PropTypes.func,
    onRemoveTrans: PropTypes.func,
}