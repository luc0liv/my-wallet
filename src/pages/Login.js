import React from 'react';
import validateDisabledButton from '../helpers/validation';

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

          <button type="button" disabled={ isButtonDisabled }>Entrar</button>
        </form>
      </section>
    );
  }
}

export default Login;
