import { DISPLAY_LOADING, HIDE_LOADING } from "../types/LoadingConstants";
const initialState = {
  isLoading: false,
};

const LoadingReducer = (state = initialState, { type }) => {
  switch (type) {
    case DISPLAY_LOADING:
      return { ...state, isLoading: true };
    case HIDE_LOADING:
      return { ...state, isLoading: false };
    default:
      return { ...state };
  }
};

export default LoadingReducer;
