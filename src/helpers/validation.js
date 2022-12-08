const checkForEmptyFields = (...fields) => {
  const isEmpty = fields.some((field) => field === '');
  return isEmpty;
};

const validateDisabledButton = (state) => {
  const MIN_LENGTH = 6;
  const {
    email,
    password,
  } = state;
  const emailRegex = /^[A-Za-z0-9_!#$%&'*+\\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;
  // Regex encontrado aqui:
  // https://www.abstractapi.com/guides/email-validation-regex-javascript
  const validEmail = emailRegex.test(email);
  const emptyFields = checkForEmptyFields(email, password);
  const passwordLength = password.length >= MIN_LENGTH;
  return emptyFields || !validEmail || !passwordLength;
};

export default validateDisabledButton;
