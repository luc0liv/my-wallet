import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './header.css';

class Header extends Component {
  sumTotalExpenses = () => {
    const { expenses } = this.props;
    if (!expenses.length) {
      return '0';
    }
    const expensesSum = expenses.reduce(
      (total, expense) => total + expense
        .exchangeRates[expense.currency].ask * expense.value,
      0,
    );
    return expensesSum.toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <header className="header-container">
        <span data-testid="email-field">{email}</span>
        <span data-testid="total-field">{this.sumTotalExpenses()}</span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps)(Header);
