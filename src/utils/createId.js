const createId = (day, month, monthType, year) => {
  let adjustedMonth = month;
  if (monthType === "prev") adjustedMonth -= 1;
  if (monthType === "next") adjustedMonth += 1;

  const dateObj = new Date(year, adjustedMonth, day);

  const yyyy = dateObj.getFullYear();
  const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
  const dd = String(dateObj.getDate()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd}`;
};

export default createId;