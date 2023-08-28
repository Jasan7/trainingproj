export const ADD_BUDGET_ENTRY = 'ADD_BUDGET_ENTRY';
export const REMOVE_BUDGET_ENTRY = 'REMOVE_BUDGET_ENTRY';

export const addBudgetEntry = (entry) => ({
  type: ADD_BUDGET_ENTRY,
  payload: entry
});

export const removeBudgetEntry = (key) => ({
  type: REMOVE_BUDGET_ENTRY,
  payload: key
});
