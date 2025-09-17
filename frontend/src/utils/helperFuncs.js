function getCurrentDate() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[today.getMonth()];
  const year = today.getFullYear();

  return `${day} ${month} ${year}`;
}



const calcSpending = (transactions, userId, category) => {
  return transactions
    .filter(
      (t) =>
        t.userId === userId && t.category === category && t.type === "expense"
    )
    .reduce((sum, t) => sum + t.amount, 0);
};

export { getCurrentDate, calcSpending };
