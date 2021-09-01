import React from 'react';
import { Link } from 'react-router-dom';

// requisito 2 feito com a ajuda da Mayu <3

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailValidate: false,
      passwordValidate: false,
    };
    // this.emailValidation = this.emailValidation.bind(this);
    // this.passwordValidation = this.passwordValidation.bind(this);
    // this.loginValidation = this.loginValidation.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleChangeEmail(event) {
    const emailValidate = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i
      .test(event.target.value);
    this.setState({
      email: event.target.value,
      emailValidate,
    });
  }

  handleChangePassword(event) {
    const minLength = 6;
    const passwordValidate = event.target.value.length >= minLength;
    this.setState({
      password: event.target.value,
      passwordValidate,
    });
  }

  // loginValidation() {
  //   const { email, password } = this.state;
  //   const minLength = 6;
  //   if (email.includes('@') && email.includes('.com') && password.length >= minLength) {
  //     this.setState({
  //       disabled: false,
  //     });
  //   }
  // }

  // emailValidation(email) {
  //   if (email.includes('@') && email.includes('.com')) {
  //     return true;
  //   }
  // }

  // passwordValidation(password) {
  //   const minLength = 6;
  //   if (password.length >= minLength) {
  //     return true;
  //   }
  // }

  // loginValidation() {
  //   const { email, password } = this.state;
  //   const validEmail = this.emailValidation(email);
  //   const validPassword = this.passwordValidation(password);
  //   if (validEmail === true && validPassword === true) {
  //     this.setState({
  //       disabled: false,
  //     });
  //   } else {
  //     this.setState({
  //       disabled: true,
  //     });
  //   }
  // }

  render() {
    const { email, password, passwordValidate, emailValidate } = this.state;
    return (
      <form>
        <label htmlFor="email">
          <input
            type="email"
            id="email"
            data-testid="email-input"
            value={ email }
            onChange={ this.handleChangeEmail }
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            id="password"
            data-testid="password-input"
            value={ password }
            onChange={ this.handleChangePassword }
          />
        </label>
        <Link to="/carteira">
          <button type="submit" disabled={ !(passwordValidate && emailValidate) }>
            Entrar
          </button>
        </Link>
      </form>
    );
  }
}

export default Login;
