import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import Login from '../pages/Login';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const testEmail = 'teste@email.com';
const testPassword = '123456';

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

  it('É exibido na tela um input de Senha', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const passwordInput = screen.getByLabelText(/senha/i);
    expect(passwordInput).toBeInTheDocument();

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Quando digitado uma Senha o campo tem seu valor alterado', () => {
    const initialState = {
      user: {
        email: '',
        password: '',
      },
    };

    renderWithRouterAndRedux(<App />, { initialState });
    const passwordInput = screen.getByLabelText(/senha/i);
    expect(passwordInput).toBeInTheDocument();

    userEvent.type(passwordInput, testPassword);
    expect(passwordInput).toHaveValue(testPassword);
  });

  it('O botão de Login não é habilitado com email e senha sem validação correta', () => {
    const initialState = {
      user: {
        email: '',
        password: '',
      },
    };

    renderWithRouterAndRedux(<App />, { initialState });
    const loginButton = screen.getByRole('button', { name: /entrar/i });
    const emailInput = screen.getByRole('textbox', { name: /e-mail/i });
    const passwordInput = screen.getByLabelText(/senha/i);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();

    userEvent.type(emailInput, testEmail);
    userEvent.type(passwordInput, '12345');

    expect(loginButton).toBeDisabled();
  });

  it('O botão de Login é habilitado e o Login é realizado com email e senha validados', () => {
    const initialState = {
      user: {
        email: '',
        password: '',
      },
    };

    const { history } = renderWithRouterAndRedux(<App />, { initialState });
    const loginButton = screen.getByRole('button', { name: /entrar/i });
    const emailInput = screen.getByRole('textbox', { name: /e-mail/i });
    const passwordInput = screen.getByLabelText(/senha/i);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();

    userEvent.type(emailInput, testEmail);
    userEvent.type(passwordInput, testPassword);
    expect(passwordInput).toHaveValue(testPassword);
    expect(emailInput).toHaveValue(testEmail);

    expect(loginButton).toBeEnabled();

    userEvent.click(loginButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});
