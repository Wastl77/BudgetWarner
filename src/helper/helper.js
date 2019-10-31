export const calculateAvailable = (monthlyAvailable, totalExpense) => {
  const totalAvailable = (monthlyAvailable - totalExpense).toFixed(2);
  const daysOfMonth = (month, year) => {
    if (month !== "2") {
      if (month === "9" || month === "4" || month === "6" || month === "11") {
        return 30;
      }

      return 31;
    }

    return year % 4 === 0 && year % 100 !== 0 ? 29 : 28;
  };

  let date = new Date();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let day = date.getDate();
  let totalDays = daysOfMonth(month, year);
  let daysLeft = totalDays - day;

  if (daysLeft <= 1) {
    daysLeft = 1;
  }

  const dailyAvailable = (totalAvailable / daysLeft).toFixed(2);

  return {
    totalAvailable: totalAvailable,
    dailyAvailable: dailyAvailable
  };
};

export const getActualMonthString = () => {
  let date = new Date();
  let monthString = new Intl.DateTimeFormat("de-DE", { month: "long" }).format(
    date
  );
  return monthString.charAt(0).toLowerCase() + monthString.slice(1);
};
