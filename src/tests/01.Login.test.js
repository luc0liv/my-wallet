import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import Login from '../pages/Login';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const testEmail = 'teste@email.com';

describe('Teste o componente Login.js', () => {
  it('É exibido na tela um input de E-mail', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox', { name: /e-mail/i });
    expect(emailInput).toBeInTheDocument();

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Quando digitado um email o campo tem seu valor alterado', () => {
    const initialState = {
      user: {
        email: '',
        password: '',
      },
    };

    renderWithRouterAndRedux(<App />, { initialState });
    const emailInput = screen.getByRole('textbox', { name: /e-mail/i });
    expect(emailInput).toBeInTheDocument();

    userEvent.type(emailInput, testEmail);
    expect(emailInput).toHaveValue(testEmail);
  });
});
