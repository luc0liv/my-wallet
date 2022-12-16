import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense, getEditingInfo } from '../redux/actions';

class Table extends Component {
  tableHeaders = [
    { name: 'Descrição', key: 'description' },
    { name: 'Tag', key: 'tag' },
    { name: 'Método de pagamento', key: 'method' },
    { name: 'Valor', key: 'value' },
    { name: 'Moeda', key: 'currency' },
    { name: 'Câmbio utilizado', key: 'ask' },
    { name: 'Valor convertido', key: 'convertedValue' },
    { name: 'Moeda de conversão', key: 'conversionCoin' },
    { name: 'Editar/Excluir', key: 'buttons' },
  ];

  convertExchangeValue = (exchange, expense) => {
    const transformExchange = Number(exchange[expense.currency].ask);
    const transformValue = Number(expense.value);
    const convertValues = (transformExchange * transformValue).toFixed(2);
    return convertValues;
  };

  expensesToNewObject = (expenses) => {
    const newExpenses = expenses.map((expense) => ({
      ...expense,
      currency: expense.exchangeRates[expense.currency].name,
      conversionCoin: 'Real',
      value: Number(expense.value).toFixed(2),
      ask: Number(expense.exchangeRates[expense.currency].ask).toFixed(2),
      convertedValue: this.convertExchangeValue(expense.exchangeRates, expense),
    }));
    return newExpenses;
  };

  deleteSelectedExpense = (expense) => {
    const { dispatch } = this.props;
    dispatch(deleteExpense(expense.id));
  };

  editSelectedExpense = (expense) => {
    // envia as informações da despesa a ser editada
    const { dispatch } = this.props;
    dispatch(getEditingInfo(true, expense.id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            {this.tableHeaders.map((header) => (
              <th key={ header.name }>{header.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {expenses.length === 0
            ? <tr><td><span>Não existem despesas para exibir.</span></td></tr>
            : this.expensesToNewObject(expenses).map((expense) => (
              <tr key={ expense.id }>
                {this.tableHeaders.map((header, hIndex) => (header.key !== 'buttons' ? (
                  <td key={ hIndex }>{expense[header.key]}</td>
                ) : (
                  <td key={ hIndex }>
                    <button
                      type="button"
                      data-testid="edit-btn"
                      onClick={ () => this.editSelectedExpense(expense) }
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => this.deleteSelectedExpense(expense) }
                    >
                      Excluir
                    </button>
                  </td>
                )))}
              </tr>
            ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
