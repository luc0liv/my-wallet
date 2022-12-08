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

  const emailRegex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
  // Regex encontrado aqui:
  // https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
  const validEmail = emailRegex.test(email);
  const emptyFields = checkForEmptyFields(email, password);
  const passwordLength = password.length >= MIN_LENGTH;
  return !validEmail || !passwordLength || emptyFields;
};

export default validateDisabledButton;
