import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockExpenses from './helpers/mockExpenses';
import mockData from './helpers/mockData';

describe('Teste o componente Table', () => {
  it('Testa se a lista for vazia exibe a mensagem de lista vazia.', () => {
    const emptyList = [];
    const initialState = {
      wallet: {
        currencies: Object.keys(mockData),
        expenses: emptyList,
      },
    };

    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
    const element = screen.getByRole('cell', { name: /não existem despesas para exibir\./i });
    expect(element).toBeInTheDocument();
  });

  it('Testa se a lista não for vazia não exibe a mensagem de lista vazia.', () => {
    const initialState = {
      wallet: {
        currencies: Object.keys(mockData),
        expenses: mockExpenses,
      },
    };

    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
    const element = screen.queryByRole('cell', { name: /não existem despesas para exibir\./i });
    expect(element).not.toBeInTheDocument();
  });

  it('Se o Header da tabela é exibido', () => {
    const initialState = {
      wallet: {
        currencies: Object.keys(mockData),
        expenses: mockExpenses,
      },
    };

    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
    const dHeader = screen.getByRole('columnheader', { name: /descrição/i });
    expect(dHeader).toBeInTheDocument();
  });

  it('Se os botões de editar e excluir são exibidos', () => {
    const initialState = {
      wallet: {
        currencies: Object.keys(mockData),
        expenses: mockExpenses,
      },
    };

    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
    const editButton = screen.getAllByRole('button', { name: /editar/i });
    const deleteButton = screen.getAllByRole('button', { name: /excluir/i });
    editButton.forEach((edButton) => expect(edButton).toBeInTheDocument());
    deleteButton.forEach((delButton) => expect(delButton).toBeInTheDocument());
  });
});
