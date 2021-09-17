import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import Header from '../components/Header';

export default class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currencies: [],
    };

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

  render() {
    const { currencies } = this.state;
    return (
      <div>
        <Header />
        <form>
          <label htmlFor="valor">
            Valor
            <input type="text" name="valor" id="valor" />
          </label>
          <label htmlFor="descricao">
            Descrição
            <input type="text" name="descricao" id="descricao" />
          </label>
          <label htmlFor="moeda">
            Moeda
            <select id="moeda" name="moeda">
              {
                Object.keys(currencies)
                  .map((currency) => <option key="currency">{ currency }</option>)
              }
            </select>
          </label>
          <label htmlFor="pagamento">
            Método de pagamento.
            <select name="pagamento" id="pagamento">
              <option value="dinheiro">Dinheiro</option>
              <option value="credito">Cartão de crédito</option>
              <option value="debito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag
            <select name="tag" id="tag">
              <option value="alimentacao">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saude">Saúde</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}
