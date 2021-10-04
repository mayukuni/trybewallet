// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_EXPENSE, DELETE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  expenses: [],
  // totalExpenses: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_EXPENSE:
    return ({
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.expense.id),
    });
  default:
    return state;
  }
};
// terminar depois
