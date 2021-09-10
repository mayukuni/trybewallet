import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions';

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
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.emailValidation = this.emailValidation.bind(this);
    // this.passwordValidation = this.passwordValidation.bind(this);
    // this.loginValidation = this.loginValidation.bind(this);
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

  handleSubmit(event) {
    event.preventDefault();
    const { dispatchSetLogin, history } = this.props;
    const { email } = this.state;
    dispatchSetLogin(email);
    history.push('/carteira');
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
            maxLength="15"
          />
        </label>
        {/* <Link to="/carteira"> */}
        <button
          type="button"
          disabled={ !(passwordValidate && emailValidate) }
          onClick={ this.handleSubmit }
        >
          Entrar
        </button>
        {/* por que sem o onClick ele redireciona
         com o <Link to="/carteira"> e com o onClick não? */}
        {/* </Link> */}
      </form>
    );
  }
}

Login.propTypes = {
  dispatchSetLogin: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchSetLogin: (email) => dispatch(login(email)),
});

export default connect(null, mapDispatchToProps)(Login);
