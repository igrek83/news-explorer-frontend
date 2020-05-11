const searchDate = () => {
  const week = 24 * 60 * 60 * 1000 * 7;
  const toDay = new Date();
  const weekDay = new Date(toDay - week);
  const from = weekDay.toISOString().slice(0, 10);
  const to = toDay.toISOString().slice(0, 10);
  return `&from=${from}&to=${to}`;
};
export default searchDate;