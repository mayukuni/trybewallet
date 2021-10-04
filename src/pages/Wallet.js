import PropTypes from 'prop-types';
import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { addExpenseThunk as addExpenseThunkAction } from '../actions';
import Table from '../components/Table';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currencies: [],
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchApi = this.fetchApi.bind(this);
  }

  componentDidMount() {
    this.fetchApi();
  }

  async fetchApi() {
    const URL = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(URL);
    const currencies = await response.json();
    delete currencies.USDT;
    this.setState({
      currencies,
    });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    const { addExpenseThunk } = this.props;
    const { id, value, description, currency, method, tag, exchangeRates } = this.state;
    const teste2 = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    event.preventDefault();
    addExpenseThunk(teste2);
    this.setState((previous) => ({
      id: previous.id + 1,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    }));
  }

  form() {
    const { currencies, value, description, currency } = this.state;
    return (
      <>
        <label htmlFor="valor">
          Valor
          <input
            type="text"
            name="value"
            id="valor"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="descricao">
          Descrição
          <input
            type="text"
            name="description"
            id="descricao"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="moeda">
          Moeda
          <select
            id="moeda"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {
              Object.keys(currencies)
                .map((teste) => <option key="currency">{ teste }</option>)
            }
          </select>
        </label>
      </>
    );
  }

  render() {
    const { method, tag } = this.state;
    return (
      <div>
        <Header />
        <form>
          {this.form()}
          <label htmlFor="pagamento">
            Método de pagamento.
            <select
              name="method"
              id="pagamento"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag
            <select name="tag" id="tag" value={ tag } onChange={ this.handleChange }>
              <option value="Alimentacao">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saude">Saúde</option>
            </select>
          </label>
          <button type="button" onClick={ this.handleSubmit }>Adicionar despesa</button>
        </form>
        <Table />
      </div>
    );
  }
}

Wallet.propTypes = {
  addExpenseThunk: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addExpenseThunk: (payload) => dispatch(addExpenseThunkAction(payload)),
});

export default connect(null, mapDispatchToProps)(Wallet);
