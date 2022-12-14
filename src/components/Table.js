import React, { Component } from 'react';

class Table extends Component {
  tableHeaders = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
    'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];

  render() {
    return (
      <table>
        {this.tableHeaders.map((header) => <th key={ header }>{header}</th>)}
      </table>
    );
  }
}

export default Table;
