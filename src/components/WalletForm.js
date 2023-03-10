import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editExpense, saveWalletInfo } from '../redux/actions';

class WalletForm extends Component {
  methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

  tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

  state = {
    method: this.methods[0],
    tag: this.tags[0],
    currency: 'USD',
    value: 0,
    description: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  fetchCurrencies = async () => {
    const requestCurrencies = await fetch(
      'https://economia.awesomeapi.com.br/json/all',
    );
    const currenciesList = await requestCurrencies.json();
    return currenciesList;
  };

  handleSubmit = async () => {
    const { dispatch } = this.props;
    const currencies = await this.fetchCurrencies();
    // const { USDT, ...newCurrencies } = currencies;
    dispatch(saveWalletInfo(this.state, currencies));
    this.setState({
      value: '',
      description: '',
    });
  };

  handleEdit = async () => {
    const { dispatch, idToEdit } = this.props;
    const currencies = await this.fetchCurrencies();
    dispatch(editExpense(idToEdit, this.state, currencies));
  };

  render() {
    const { currencies, editor } = this.props;
    const { method, tag, currency, value, description } = this.state;
    return (
      <form>
        <label htmlFor="value-input">
          Valor:
          <input
            type="number"
            name="value"
            id="value-input"
            data-testid="value-input"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            name="description"
            id="description"
            data-testid="description-input"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="currency">
          Moeda:
          <select
            name="currency"
            id="currency"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencies.map((option) => (
              <option key={ option }>{option}</option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select
            name="method"
            id="method"
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChange }
          >
            {this.methods.map((option, index) => (
              <option key={ index }>{option}</option>
            ))}
          </select>
        </label>

        <label htmlFor="tag">
          Categoria:
          <select
            name="tag"
            id="tag"
            data-testid="tag-input"
            value={ tag }
            onChange={ this.handleChange }
          >
            {this.tags.map((option, index) => (
              <option key={ index } value={ option }>
                {option}
              </option>
            ))}
          </select>
        </label>

        {!editor ? (
          <button type="button" onClick={ this.handleSubmit }>
            Adicionar despesa
          </button>
        ) : (
          <button type="button" onClick={ this.handleEdit }>
            Editar despesa
          </button>
        )}
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(Object).isRequired,
  idToEdit: PropTypes.number.isRequired,
  editor: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

export default connect(mapStateToProps)(WalletForm);
