 export default function getData() {
  const currentDate = new Date();

  const [year, month, day] = [
    currentDate.getFullYear(),
    String(currentDate.getMonth() + 1).padStart(2, '0'),
    String(currentDate.getDate()).padStart(2, '0')
  ];


  return `${year}/${month}/${day}`;
}
