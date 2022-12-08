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

  // eslint-disable-next-line max-len
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // Regex encontrado aqui:
  // https://emailregex.com/
  const validEmail = emailRegex.test(email);
  const emptyFields = checkForEmptyFields(email, password);
  const passwordLength = password.length >= MIN_LENGTH;
  return !validEmail || !passwordLength || emptyFields;
};

export default validateDisabledButton;
