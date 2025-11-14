export const postDate = (date: Date) => {
  const newDate = new Date(date);
  newDate.setHours(12); // Set to noon to avoid timezone issues
  return newDate;
};
