export const validateValue = (val, submitted) => {


  if (submitted) {
    return val.length >= 3 || 'Please use a minimum of 3 characters';
  }
  return true;
};

export const validateDate = (val, submitted) => {
  if (submitted) {
    return !!val || 'Please select a date';
  }
  return true;
};
