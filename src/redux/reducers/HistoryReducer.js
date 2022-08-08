const initialState = {
  history: {},
};

const HistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_HISTORY":
      return { ...state, history: action.history };
    default:
      return state;
  }
};

export default HistoryReducer;
