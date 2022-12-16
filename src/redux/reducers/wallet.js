// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  error: '',
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'LIST_BEGIN':
    return {
      ...state,
    };
  case 'LIST_SUCCESS':
    return {
      ...state, currencies: Object.keys(action.currencies),
    };
  case 'LIST_FAILURE':
    return { ...state, error: action.error };
  case 'SAVE_INFO':
    return {
      ...state,
      expenses: [
        ...state.expenses,
        {
          id: state.expenses.length,
          ...action.payload.wallet,
          exchangeRates: action.payload.currencies,
        },
      ],
    };
  case 'DELETE_INFO':
    return {
      ...state,
      expenses: state.expenses.filter(
        (expense) => expense.id !== action.expenseId,
      ),
    };
  case 'SEND_EDIT':
    // reducer p/ enviar as infos da despesa a ser editada
    return {
      ...state,
      editor: action.edit,
      idToEdit: action.expenseId,
    };
  case 'EDIT_INFO':
    return {
      ...state,
      editor: false,
      expenses: state.expenses.map(
        (expense) => (expense.id === action.expenseId
          ? { ...action.editedExpense, exchangeRates: action.currencies } : expense),
      ),
    };
  default:
    return state;
  }
}

export default walletReducer;
