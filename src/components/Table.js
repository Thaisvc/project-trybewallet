import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpenses } from '../redux/actions';

class Table extends Component {
  render() {
    const { stateInfo, delExpense } = this.props;
    // console.log(stateInfo);
    return (
      <table width="1000" align="center" border="1">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { stateInfo.map(({ id, description, tag, method,
            value, currency, exchangeRates }) => {
            const nunber = Number(value);
            const exchangeRate = exchangeRates[currency];
            return (
              <tr key={ id }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>{ nunber.toFixed(2) }</td>
                <td>{ exchangeRate.name }</td>
                <td>{ Number(exchangeRate.ask).toFixed(2) }</td>
                <td>{ (exchangeRate.ask * value).toFixed(2) }</td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => { delExpense(id); } }
                  >
                    Deletar
                  </button>
                </td>

              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
const mapStateToProps = (state) => ({
  // coin: state.wallet.currencies,
  stateInfo: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  delExpense: (del) => dispatch(deleteExpenses(del)),
});

Table.propTypes = {
  stateInfo: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  delExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
