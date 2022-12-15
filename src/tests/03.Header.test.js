import React from 'react';
import { screen } from '@testing-library/react';
import Header from '../components/Header';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockExpenses from './helpers/mockExpenses';

describe('Teste o componente Header', () => {
  beforeEach(() => renderWithRouterAndRedux(<Header email="teste@email.com" expenses={ mockExpenses } />));

  it('Se o Header é exibido', () => {
    const totalField = screen.getByTestId('total-field');
    const currencyField = screen.getByTestId('header-currency-field');
    const emailField = screen.getByTestId('email-field');
    const fields = [emailField, totalField, currencyField];
    fields.forEach((field) => expect(field).toBeInTheDocument());
  });

  it('Se o campo de valor total começa zerado', () => {
    const totalField = screen.getByTestId('total-field');
    expect(totalField).toHaveTextContent('0.00');
  });

  it('Se o campo de Moeda é BRL', () => {
    const currencyField = screen.getByTestId('header-currency-field');
    expect(currencyField).toHaveTextContent('BRL');
  });
});
