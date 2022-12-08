import React, { Component } from 'react';

class WalletForm extends Component {
  methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

  tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

  state = {
    method: this.methods[0],
    tag: this.tags[0],
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { currencies } = this.props;
    const { method, tag } = this.state;
    return (
      <form>
        <label htmlFor="value-input">
          Valor:
          <input
            type="number"
            name="value"
            id="value-input"
            data-testid="value-input"
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            name="description"
            id="description"
            data-testid="description-input"
          />
        </label>

        {/* <label htmlFor="currency">
          Moeda:
          <select name="currency" id="currency" data-testid="currency-input">
            { currencies.map((currency) => <option key={ currency }>{currency}</option>)}
          </select>
        </label> */}
        <label htmlFor="method">
          Método de pagamento:
          <select name="method" id="method" data-testid="method-input" value={ method } onChange={ this.handleChange }>
            {this.methods.map((met, index) => (
              <option key={ index }>{met}</option>
            ))}
          </select>
        </label>

        <label htmlFor="tag">
          Categoria:
          <select name="tag" id="tag" data-testid="tag-input" value={ tag } onChange={ this.handleChange }>
            {this.tags.map((t, index) => (
              <option key={ index } value={ t }>
                {t}
              </option>
            ))}
          </select>
        </label>
      </form>
    );
  }
}

export default WalletForm;
