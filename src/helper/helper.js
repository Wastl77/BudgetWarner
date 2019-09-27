// import monthlyAvailable from '../assets/data/monthlyAvailable';
// import axios from 'axios';

// export const getInitialState = () => {
  // let initialData = getData();
  // axios.get('/expenditure/-LoUWQkmjyAhwPsPHU6l/totalExpenditure.json')
  //   .then(result => {
  //   const totalExpenditure = +(result.data.totalExpenditure);
  //   const monthlyBudget = +(354).toFixed(2);
  //   const totalAvailable = calculateTotalAvailable(monthlyBudget, totalExpenditure);
  //   const dailyAvailable = calculateDailyAvailable(totalAvailable);
  //   return {
  //     monthlyBudget: monthlyBudget,
  //     totalExpenditure: totalExpenditure.toFixed(2),
  //     totalAvailable: totalAvailable.toFixed(2),
  //     dailyAvailable: dailyAvailable.toFixed(2),
  //     spendingInputValue: 0 
  //   }
  // });
  // ;
  // let totalAvailable = calculateTotalAvailable(initialData.monthlyBudget, initialData.totalExpenditure);
  // let dailyAvailable = calculateDailyAvailable(totalAvailable);
  // return {
  //   ...initialData,
  //   totalAvailable: totalAvailable.toFixed(2),
  //   dailyAvailable: dailyAvailable.toFixed(2),
  //   spendingInputValue: 0 
  // }
// };

// const getData = () => {
  // get monthly Budget and total Expenses from Database
  // const actualMonth = new Date().getMonth()+1;
  // const monthlyBudget = monthlyAvailable[actualMonth];

// axios all und spread für monatliches budget und total ausgaben

  // const getTotalExpenditure = () => {
  //   return axios.get('/expenditure/-LoUWQkmjyAhwPsPHU6l/totalExpenditure.json')};

  // const getTotalExpenditure = () => {
  //   return axios.get('/expenditure/-LoUWQkmjyAhwPsPHU6l/totalExpenditure.json')};
  // axios.get('/expenditure/-LoUWQkmjyAhwPsPHU6l/totalExpenditure.json')
  //   .then(result => {
  //   const totalExpenditure = +(result.data.totalExpenditure);
  //   return {
  //     totalExpenditure: totalExpenditure.toFixed(2),
  //     monthlyBudget: (354).toFixed(2)
  //   }});
  // return {
  //   monthlyBudget: (354).toFixed(2),
  //   totalExpenditure: (0).toFixed(2)
  // };
// };

export const calculateTotalAvailable = (budget, expenses) => {
  return (budget-expenses);
};

export const calculateDailyAvailable = (availableBudget) => {

  const daysOfMonth = (month, year) => {
    if(month !=='2') {
      if(month==='9' ||
        month==='4' ||
        month==='6' ||
        month==='11') {
        return 30;
      } else {
        return 31;
      }
    } else {
      return (year%4)==="" && (year%100)!=="" ? 29 : 28;
    }
  };

  let date = new Date();
  let month = date.getMonth()+1;
  let year = date.getFullYear();
  let day = date.getDate();
  let totalDays = daysOfMonth(month, year);
  let daysLeft = totalDays-day;
  return availableBudget/daysLeft.toFixed(2);
};
