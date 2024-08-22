import React from "react";
import { Container } from "react-bootstrap";
import EditTransactionForm from "./Forms/EditTransactionForm";
import PropTypes from 'prop-types';

function EditTransaction(props) {
  const { transaction, theUser, category, onViewEditOff, onEditTransaction} =
    props;
  return (
    <Container>
      {category === "Income" ? (
        <EditTransactionForm
          userCatList={theUser.incCategories}
          transaction={transaction}
          category={category}
          onViewEditOff={onViewEditOff}
          onEditTransaction={onEditTransaction}
        />
      ) : (
        <EditTransactionForm
          userCatList={theUser.expCategories}
          transaction={transaction}
          category={category}
          onViewEditOff={onViewEditOff}
          onEditTransaction={onEditTransaction}
        />
      )}
    </Container>
  );
}

export default EditTransaction;

EditTransaction.propTypes = {
  transaction: PropTypes.array,
  theUser: PropTypes.object,
  category: PropTypes.string,
  onViewEditOff: PropTypes.object,
  onEditTransaction: PropTypes.func
}
