export const validation = (value, rules) => {
  
  if (rules.required && !value) {
    return `${rules.label} wajib diisi`;
  }

  if (rules.minLength && value.length < rules.minLength) {
    return `${rules.label} must be at least ${rules.minLength} characters long`;
  }

  return true;
};

export default validation;
