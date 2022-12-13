const USER_ACTION = 'USER_ACTION';

export const saveUserInfo = (user) => ({
  type: USER_ACTION,
  payload: user,
});

export const saveWalletInfo = (wallet, currencies) => ({
  type: 'SAVE_INFO',
  payload: { wallet, currencies },
});

export const beginCurrencyList = () => ({
  type: 'LIST_BEGIN',
});

export const listCurrencies = (currencies) => ({
  type: 'LIST_SUCCESS', currencies,
});

export const listCurrenciesFailure = (error) => ({
  type: 'LIST_FAILURE', error,
});

export const getCurrencies = () => async (dispatch) => {
  dispatch(beginCurrencyList());
  try {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await request.json();
    const { USDT, ...newResponse } = response;
    dispatch(listCurrencies(newResponse));
  } catch (error) {
    dispatch(listCurrenciesFailure(error));
  }
};
