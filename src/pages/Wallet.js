import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveChanges, fetchCoinsThunk,
  fetchExpensesThunk, setEditorFalse } from '../redux/actions';
import Header from '../components/Header';
import Table from '../components/Table';
import './Wallet.css';

class Wallet extends React.Component {
  state = {
    id: 0,
    value: '',
    currency: 'USD',
    method: 'Cash',
    tag: 'Food',
    description: '',
    exchangeRates: {},
  }

  componentDidMount = () => {
    const { getCoins } = this.props;
    getCoins();
  }

  componentDidUpdate = () => {
    const { editor } = this.props;
    if (editor) this.handleEditState();
  }

  initialState = (id) => ({
    id,
    value: 0,
    currency: 'USD',
    method: 'Cash',
    tag: 'Food',
    description: '',
    exchangeRates: {},
  });

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleClick = () => {
    const { id } = this.state;
    const { dispatchExpenses } = this.props;
    dispatchExpenses(this.state);
    this.setState(this.initialState(id + 1));
  }

  handleEditState = () => {
    const { idToEdit, expenses, dispatchEditorFalse } = this.props;
    const expenseToEdit = expenses.find((expense) => expense.id === idToEdit);
    this.setState({ ...expenseToEdit }, () => dispatchEditorFalse());
    // dispatchEditorFalse();
  }

  handleClickEdit = () => {
    const { id } = this.state;
    const { expenses, dispatchEditExpense } = this.props;
    const all = expenses.map((expense) => (expense.id === id
      ? this.state : expense));
    console.log(all);
    dispatchEditExpense(all);
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, isEditing } = this.props;
    const methosList = ['Cash', 'Credit card', 'Debit card'];
    const tagList = ['Food', 'Hobby', 'Work', 'Transport', 'Healthy'];
    return (
      <>
        <Header />
        <form>
          <label htmlFor="value">
            Value:
            <input
              data-testid="value-input"
              placeholder="0"
              type="text"
              value={ value }
              name="value"
              onChange={ this.handleChange }
              required
            />
          </label>
          <label htmlFor="description" className="description">
            Description:
            <textarea
              data-testid="description-input"
              placeholder="Describe your spending"
              type="text"
              value={ description }
              name="description"
              onChange={ this.handleChange }
              required
            />
          </label>
          <label htmlFor="currency">
            Coin:
            <select
              id="currency"
              value={ currency }
              name="currency"
              data-testid="currency-input"
              onChange={ this.handleChange }
            >
              {currencies.map((coin) => (
                <option key={ coin } value={ coin }>{coin}</option>))}
            </select>
          </label>
          <label htmlFor="method">
            Payment method
            <select
              id="method"
              value={ method }
              name="method"
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              {methosList.map((item) => (
                <option key={ item } value={ item }>{item}</option>))}
            </select>
          </label>
          <label htmlFor="tag">
            Category:
            <select
              id="tag"
              value={ tag }
              name="tag"
              data-testid="tag-input"
              onChange={ this.handleChange }
            >
              {tagList.map((item) => (
                <option key={ item } value={ item }>{item}</option>))}
            </select>
          </label>
          { isEditing ? (
            <button type="button" onClick={ this.handleClickEdit }>
              Edit
            </button>)
            : (
              <button type="button" onClick={ this.handleClick }>
                Add
              </button>)}
        </form>
        <Table />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
  isEditing: state.wallet.isEditing,
});

const mapDispatchToProps = (dispatch) => ({
  getCoins: () => dispatch(fetchCoinsThunk()),
  dispatchExpenses: (state) => dispatch(fetchExpensesThunk(state)),
  dispatchEditorFalse: () => dispatch(setEditorFalse()),
  dispatchEditExpense: (all) => dispatch(saveChanges(all)),
});

Wallet.propTypes = {
  getCoins: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatchExpenses: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
  dispatchEditorFalse: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  dispatchEditExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
