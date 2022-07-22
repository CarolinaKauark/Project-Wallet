import { typeCurrencies, typeExpenses, typeNewExpenses,
  typeEditExpense, typeEditor, typeSaveChanges } from '../actions/actionsType';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  isEditing: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case typeCurrencies:
    return { ...state, currencies: [...action.payload] };
  case typeExpenses:
    return { ...state,
      expenses: [...state.expenses, { ...action.payload }],
    };
  case typeNewExpenses:
    return { ...state, expenses: [...action.payload] };
  case typeEditExpense:
    return { ...state, editor: true, isEditing: true, idToEdit: action.id };
  case typeEditor:
    return { ...state, editor: false };
  case typeSaveChanges:
    return { ...state, isEditing: false, expenses: [...action.payload] };
  default:
    return state;
  }
};

export default wallet;
