export const calculateAvailable = (monthlyAvailable, totalExpense) => {
  const totalAvailable = monthlyAvailable - totalExpense;
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
  const dailyAvailable = (totalAvailable / daysLeft).toFixed(2);

  return {
    totalAvailable: totalAvailable,
    dailyAvailable: dailyAvailable
  };
};

const monthStringObject = {
  1: "januar",
  2: "februar",
  3: "märz",
  4: "april",
  5: "mai",
  6: "juni",
  7: "juli",
  8: "august",
  9: "september",
  10: "oktober",
  11: "november",
  12: "dezember"
};

export const getActualMonthString = () => {
  let date = new Date();
  let month = date.getMonth() + 1;
  return monthStringObject[month];
};
