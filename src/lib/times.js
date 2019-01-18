export const months = [
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
  "December"
];

export const yearsBetween = (from, to, order = "asc") => {
  const years = [];
  for (let i = from; i <= to; i++) {
    years[order == "asc" ? "push" : "unshift"](i);
  }
  return years;
};
