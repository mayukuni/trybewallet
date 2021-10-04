import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;
    // lógica da soma feita com ajuda do Rafael Bamberg.
    let total = 0;
    if (expenses.length !== 0) {
      expenses.forEach((element) => {
        total += Number(element.value * element.exchangeRates[element.currency].ask);
      });
    }
    return (
      <header>
        <p data-testid="email-field">
          Email:
          {' '}
          {email}
        </p>
        <p data-testid="total-field">{total.toFixed(2)}</p>
        <p data-testid="header-currency-field">Câmbio: BRL</p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.shape({
    forEach: PropTypes.func.isRequired,
    length: PropTypes.number.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
