import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
          {expenses.length !== 0
            && this.expensesToNewObject(expenses).map((expense) => (
              <tr key={ expense.id }>
                {this.tableHeaders.map((header, hIndex) => (header.key !== 'buttons' ? (
                  <td key={ hIndex }>{expense[header.key]}</td>
                ) : (
                  <td key={ hIndex }>
                    <button type="button">Editar</button>
                    <button type="button">Excluir</button>
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
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
