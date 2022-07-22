import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { saveNewExpenses, editExpense } from '../redux/actions';
import './Table.css';

class Table extends React.Component {
  handleClickDelete = (id) => {
    const { expenses, dispatchNewExpenses } = this.props;
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    console.log(newExpenses);
    dispatchNewExpenses(newExpenses);
  }

  render() {
    const { expenses, dispatchEditExpense } = this.props;
    const tableList = ['Description', 'Tag', 'Pay method',
      'Valor', 'Currency', 'Exchange', 'Converted value',
      'Conversion currency', 'Edit', 'Remove'];
    return (
      <table>
        <thead>
          <tr>
            {tableList.map((item) => <th key={ item }>{item}</th>)}
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((
              { value, currency, method, tag, description, exchangeRates, id },
            ) => (
              <tr key={ id }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{Number(value).toFixed(2)}</td>
                <td>{exchangeRates[currency].name.replace(/\b[/][a-z]+\s\w*/gi, '') }</td>
                <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                <td>
                  {(Number(value)
                 * Number(exchangeRates[currency].ask)).toFixed(2)}

                </td>
                <td>Real</td>
                <td className="buttons">
                  <button
                    className="edit"
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => dispatchEditExpense(id) }
                  >
                    <AiFillEdit className="formbtn" />
                  </button>
                </td>
                <td className="buttons">
                  <button
                    className="delete"
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.handleClickDelete(id) }
                  >
                    <AiFillDelete className="formbtn" />
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchNewExpenses: (newExpenses) => dispatch(saveNewExpenses(newExpenses)),
  dispatchEditExpense: (id) => dispatch(editExpense(id)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatchNewExpenses: PropTypes.func.isRequired,
  dispatchEditExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
