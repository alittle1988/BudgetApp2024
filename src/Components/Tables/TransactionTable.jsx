import { useEffect, useState } from "react";
import { Container, Row, Form } from "react-bootstrap";
import EditTransaction from "../EditTransaction";
import PropTypes from "prop-types";

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
    onHandleViewFilterSwitch,
  } = props;
  const [transToDisplay, setTransToDisplay] = useState(transactions);
  const [cat, setCat] = useState("All");
  const [editTrans, setEditTrans] = useState({});



  // handles setting the categories dropdown list
  function handleCatSelect(e) {
    setCat(e);
    
    if(e === "All") {
      setTransToDisplay(transactions)
    } else{
    setTransToDisplay(transactions.filter(trans => trans.category === e))
  }
    onViewEditOff();
  }

  //handles Click to edit Transaction
  function handleTransClick(e) {
    setEditTrans(e);
    onViewEditOn();
    onHandleViewFilterSwitch()
  }
  
  //handles deleting Transaction

  function handleDeleteBtnClick(e) {
    if (confirm("Are you sure you want to delete transaction?")) {
      onDeleteClick(e, category);
      onRemoveTrans();
    }
  }
  useEffect(() => {
    setTransToDisplay(transactions.reverse());
    //handleCatSelect(cat)
    setCat("All");
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
            onHandleViewFilterSwitch={onHandleViewFilterSwitch}
          />
        ) : (
          <Row>
            <table className="table table-primary  tTable">
              <thead>
                <tr className="table-light">
                  <th className="text-center">Date</th>
                  <th className="text-center">Category</th>
                  <th className="text-center">Amount</th>
                  <th className="text-center">{cat === "Tips" ? "Tips/Tips Per Hr" : "Description"}</th>
                  
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {transToDisplay.map((trans, index) => {
                  return (
                    
                      <tr className="tr opacity-75" key={index}>
                        <th
                          className="date text-center"
                          onClick={() => handleTransClick(trans, index)}
                        >
                          {trans.date}
                        </th>
                        <td className="text-center" onClick={() => handleTransClick(trans, index)}>
                          {trans.category}
                        </td>
                        <td className="text-center" onClick={() => handleTransClick(trans, index)}>
                          ${trans.amount.toFixed(2)}
                        </td>
                        {category === "Income" && trans.description === "" ? (<>
                          <td className="text-center" onClick={() => handleTransClick(trans, index)}>
                            {trans.category === "Tips" ? `${trans.hours} / ${(trans.amount / trans.hours).toFixed(2)}` : "" }
                          </td>
                          
                        </>) : (
                          <td className="text-center" onClick={() => handleTransClick(trans, index)}>
                            {trans.description}
                          </td>
                        )}
                        <td
                          className="p-1 table-danger delete"
                          style={{ width: ".1%" }}
                          key={`button${index}`}
                        >
                          <p
                            className="text-center m-1"
                            onClick={() => handleDeleteBtnClick(trans)}
                          >
                            X
                          </p>
                        </td>
                      </tr>
                    
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
  onHandleViewFilterSwitch: PropTypes.func,
};
