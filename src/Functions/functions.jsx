 export  const  getTotalByCat = (array, category, colData) => {
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

    return sum;
  };