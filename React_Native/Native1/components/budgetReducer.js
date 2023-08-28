import { ADD_BUDGET_ENTRY, REMOVE_BUDGET_ENTRY } from "./budgetActions";

const initialState = {
  items: []
};

const budgetReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUDGET_ENTRY:
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case REMOVE_BUDGET_ENTRY:
      return {
        ...state,
        items: state.items.filter(item => item.key !== action.payload),
      };
    default:
      return state;
  }
};

export default budgetReducer;
