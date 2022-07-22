import { typeEmail, typeCurrencies, typeError, typeExpenses,
  typeNewExpenses, typeEditor, typeEditExpense, typeSaveChanges } from './actionsType';

const endpointCoins = 'https://economia.awesomeapi.com.br/json/all';

const sendEmail = (email) => ({
  type: typeEmail,
  email,
});

const fetchCoinsSuccess = (payload) => ({
  type: typeCurrencies,
  payload,
});

const fetchCoinsFail = (payload) => ({
  type: typeError,
  payload,
});

const fetchCoinsThunk = () => (dispatch) => {
  fetch(endpointCoins)
    .then((result) => result.json())
    .then((data) => {
      const coins = Object.keys(data).filter((coin) => coin !== 'USDT');
      dispatch(fetchCoinsSuccess(coins));
    })
    .catch((err) => {
      dispatch(fetchCoinsFail(err));
    });
};

const saveExpenses = (payload) => ({
  type: typeExpenses,
  payload,
});

const fetchExpensesThunk = (state) => (dispatch) => {
  fetch(endpointCoins)
    .then((result) => result.json())
    .then((data) => dispatch(saveExpenses({ ...state,
      exchangeRates: data })));
};

const saveNewExpenses = (payload) => ({
  type: typeNewExpenses,
  payload,
});

const editExpense = (id) => ({
  type: typeEditExpense,
  id,
});

const setEditorFalse = () => ({
  type: typeEditor,
});

const saveChanges = (payload) => ({
  type: typeSaveChanges,
  payload,
});

export { sendEmail, fetchCoinsThunk, saveExpenses,
  fetchExpensesThunk, saveNewExpenses, editExpense, setEditorFalse, saveChanges };
