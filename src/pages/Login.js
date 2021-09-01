import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <form>
        <label htmlFor="email">
          <input type="email" id="email" data-testid="email-input" />
        </label>
        <label htmlFor="password">
          <input type="password" id="password" data-testid="password-input" />
        </label>
        <button type="submit">Entrar</button>
      </form>
    );
  }
}

export default Login;
