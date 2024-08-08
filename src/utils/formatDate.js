export default function formatDate  (date)  {
  const dateValue = new Date(date);
  const day = String(dateValue.getDate()).padStart(2, '0');
  const month = String(dateValue.getMonth() + 1).padStart(2, '0');
  return `${day}/${month}`;
};
