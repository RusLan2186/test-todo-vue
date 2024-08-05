export default function getMarkerColor  (id)  {
  const colors = ['#FF0000', '#366EFF', '#FFEB33', '#10C200', '#C10015'];
  return colors[id % colors.length];
};
