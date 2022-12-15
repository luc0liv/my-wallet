import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WalletForm from '../components/WalletForm';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

describe('Teste o componente WalletForm.js', () => {
  it('É exibido na tela um input de Valor', () => {
    renderWithRouterAndRedux(<WalletForm currencies={ mockData } />);
    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const inputs = [valueInput, descriptionInput, currencyInput, methodInput, tagInput];
    inputs.forEach((input) => expect(input).toBeInTheDocument());
    expect(valueInput).toHaveValue(0);
    userEvent.type(valueInput, '2');
    expect(valueInput).toHaveValue(2);
  });

  it('É exibido na tela um botão de Adicionar despesa', () => {
    renderWithRouterAndRedux(<WalletForm currencies={ mockData } />);

    const addButton = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(addButton).toBeInTheDocument();
    expect(addButton).toBeEnabled();
  });
});
