// Coloque aqui suas actions
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
