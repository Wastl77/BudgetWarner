// import monthlyAvailable from '../assets/data/monthlyAvailable';

export const getInitialState = () => {
  let initialData = getData();
  let totalAvailable = calculateTotalAvailable(initialData.monthlyBudget, initialData.totalExpenditure);
  let dailyAvailable = calculateDailyAvailable(totalAvailable);
  return {
    ...initialData,
    totalAvailable: totalAvailable.toFixed(2),
    dailyAvailable: dailyAvailable.toFixed(2),
    spendingInputValue: 0 
  }
};

const getData = () => {
  // get monthly Budget and total Expenses from Database
  // const actualMonth = new Date().getMonth()+1;
  // const monthlyBudget = monthlyAvailable[actualMonth];
  return {
    monthlyBudget: (354).toFixed(2),
    totalExpenditure: (0).toFixed(2)
  };
};

export const calculateTotalAvailable = (budget, expenses) => {
  return (budget-expenses);
};

export const calculateDailyAvailable = (availableBudget) => {

  const daysOfMonth = (month, year) => {
    if(month !=2) {
      if(month==9 ||
        month==4 ||
        month==6 ||
        month==11) {
        return 30;
      } else {
        return 31;
      }
    } else {
      return (year%4)=="" && (year%100)!="" ? 29 : 28;
    }
  };

  const date = new Date();
  const month = date.getMonth()+1;
  const year = date.getFullYear();
  const day = date.getDate();
  const totalDays = daysOfMonth(month, year);
  const daysLeft = totalDays-day;
  return availableBudget/daysLeft.toFixed(2);
};
