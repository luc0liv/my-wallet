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
    // { name: 'Câmbio utilizado', key: '' },
    // { name: 'Valor convertido', key: '' },
    // { name: 'Moeda de conversão', key: '' },
    // { name: 'Editar/Excluir', key: '' },
  ];

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
            && expenses.map((expense) => (
              <tr key={ expense.id }>
                {this.tableHeaders.map((header, hIndex) => (
                  <td key={ hIndex }>{expense[header.key]}</td>
                ))}
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
