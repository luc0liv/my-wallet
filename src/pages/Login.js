import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import validateDisabledButton from '../helpers/validation';
import { saveUserInfo } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isButtonDisabled: true,
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState(
      {
        [name]: value,
      },
      () => {
        this.setState((prevState) => ({
          isButtonDisabled: validateDisabledButton(prevState),
        }));
      },
    );
  };

  handleSubmit = () => {
    const { dispatch, history } = this.props;
    dispatch(saveUserInfo({ ...this.state }));
    history.push('/carteira');
  };

  render() {
    const { email, password, isButtonDisabled } = this.state;
    return (
      <section>
        <form>
          <label htmlFor="email">
            E-mail
            <input
              type="text"
              data-testid="email-input"
              id="email"
              name="email"
              placeholder="Digite seu e-mail"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="password">
            Senha
            <input
              type="password"
              data-testid="password-input"
              name="password"
              id="password"
              value={ password }
              onChange={ this.handleChange }
            />
          </label>

          <button
            type="button"
            disabled={ isButtonDisabled }
            onClick={ this.handleSubmit }
          >
            Entrar
          </button>
        </form>
      </section>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired }).isRequired,
};

export default connect()(Login);
