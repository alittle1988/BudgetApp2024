export const getTotalByCat = (array, category, colData) => {
  let sum = 0;
  array.forEach((item) => {
    if (item.category === category) {
      if (colData === "amount") {
        sum = sum + item.amount;
      } else if (colData === "hours") {
        sum = sum + item.hours;
      } else if (colData === "pto") {
        sum = sum + item.ptoHours;
      }
    }
  });

  return sum.toFixed(2);
};

export const getExpensesByCat = (array, category) => {
  let sum = 0;
  array.forEach((item) => {
    if (item.category === category) {
      sum = sum + item.amount;
    }
  });
  return sum.toFixed(2);
};

export const filterTransactionList = (
  from,
  year,
  months,
  category,
  theUser
) => {
  let begin;
  let end;
  let amountTotal = 0;

  for (let i = 0; i < months.length; i++) {
    if (months[i] === from) {
      begin = `${year}` + "-" + String(i + 1).padStart(2, "0");
      if (i < 12) {
        end = `${year}` + "-" + String(i + 2).padStart(2, "0");
      } else {
        end = `${year}` + "-" + "01-31";
      }
    }
  }

  if (category === "Expense") {
    const filteredArray = theUser.expTransactions.filter((item) => {
      if (item.date >= begin && item.date <= end) {
        amountTotal = amountTotal + item.amount;
        return item;
      }
    });

    return [filteredArray, amountTotal];
  } else if (category === "Income") {
    const filteredArray = theUser.incTransactions.filter((item) => {
      if (item.date >= begin && item.date <= end) {
        amountTotal = amountTotal + item.amount;

        return item;
      }
    });
    return [filteredArray, amountTotal];
  } else if (category === "All") {
    let newArray = theUser.incTransactions.concat(theUser.expTransactions);

    const filteredArray = newArray.filter((item) => {
      if (item.date >= begin && item.date <= end) {
        amountTotal = amountTotal + item.amount;
        return item;
      }
    });

    return [filteredArray, amountTotal];
  }
};

export const yearSummaryTotals = (array, months, month, year, data) => {
  let begin;
  let end;
  let sum = 0;
  let yearTotal = 0;
  let gasTotalGal = 0;

  for (let i = 0; i < months.length; i++) {
    if (months[i] === month) {
      begin = `${year}` + "-" + String(i + 1).padStart(2, "0");
      if (i < 12) {
        end = `${year}` + "-" + String(i + 2).padStart(2, "0");
      } else {
        end = `${year}` + "-" + "01-31";
      }
    }
  }

  for (let i = 0; i < array.length; i++) {
    if (
      array[i].category === data &&
      array[i].date >= begin &&
      array[i].date <= end
    ) {
      if (data === "Gas") {
        gasTotalGal += Number(array[i].description);
      }
      sum += array[i].amount;
    }
  }

  for (let i = 0; i < array.length; i++) {
    if (array[i].category === data) {
      yearTotal += array[i].amount;
    }
  }

  return [sum.toFixed(2), yearTotal.toFixed(2), gasTotalGal.toFixed(3)];
};

export function incomeTotals(array) {
  let incomeTotal = 0;
  let hoursTotal = 0;
  let ptoTotal = 0;

  array.forEach((trans) => {
    incomeTotal += trans.amount;
    hoursTotal += trans.hours;
    ptoTotal += trans.ptoHours;
  });

  return [incomeTotal, hoursTotal, ptoTotal];
}

export function expenseTotals(theUser, array = []) {
  let expenseTotal = 0;
  let diffTotal = 0;
  let budgetTotal = 0;

  array.forEach((trans) => {
    expenseTotal += trans.amount;
  });
  theUser.expCategories.forEach((trans) => {
    budgetTotal += trans.amount;
  });
  diffTotal = budgetTotal - expenseTotal;

  return [expenseTotal, budgetTotal, diffTotal];
}
