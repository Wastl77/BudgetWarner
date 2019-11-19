export const calculateAvailable = (monthlyAvailable, totalExpense) => {
  const totalAvailable = parseFloat(
    (monthlyAvailable - totalExpense).toFixed(2)
  );

  return {
    totalAvailable: totalAvailable
  };
};

export const getActualMonthString = () => {
  let date = new Date();
  let monthString = new Intl.DateTimeFormat("de-DE", { month: "long" }).format(
    date
  );
  return monthString.charAt(0).toLowerCase() + monthString.slice(1);
};

export const sortArray = array => {
  array.sort((a, b) => {
    let dateA = new Date(a.dateOfExpenseISO),
      dateB = new Date(b.dateOfExpenseISO);
    return dateA - dateB;
  });
};
