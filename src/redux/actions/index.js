const USER_ACTION = 'USER_ACTION';

export const saveUserInfo = (user) => ({
  type: USER_ACTION,
  payload: user,
});

const WALLET_ACTION = 'WALLET_ACTION';

export const saveWalletInfo = (wallet) => ({
  type: WALLET_ACTION,
  payload: wallet,
});

export const beginCurrencyList = () => ({
  type: 'LIST_BEGIN',
});

export const listCurrencies = (currencies) => ({
  type: 'LIST_SUCCESS', currencies: Object.keys(currencies),
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
