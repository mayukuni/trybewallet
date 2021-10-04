export const LOGIN = 'LOGIN';

export const login = (email) => ({

  type: LOGIN,
  payload: {
    email,
  },
});

export const ADD_EXPENSE = 'ADD_EXPENSE';

export const saveExpense = (payload) => ({
  type: ADD_EXPENSE,
  payload,
});

export const addExpenseThunk = (payload) => async (dispatch) => {
  const URL = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(URL);
  const currencies = await response.json();
  payload.exchangeRates = currencies;
  dispatch(saveExpense(payload));
  console.log(payload);
};

export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const removeExpense = (expense) => ({
  type: DELETE_EXPENSE,
  expense,
});
