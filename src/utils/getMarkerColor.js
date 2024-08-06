export default function getMarkerColor  (id)  {
  const colors = ['#366EFF', '#FFEB33', '#10C200', '#C10015', '#FF0000'];
  return colors[id % colors.length];
};
