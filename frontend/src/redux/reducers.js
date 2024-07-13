import { localStorageService } from '../services/localStorageService';
import { CLEAR_TOKEN, SET_TOKEN } from './actionTypes';

const initialState = localStorageService.getData()
  ? localStorageService.getData()
  : {
      isAuthenticated: false,
      userId: null,
    };

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CLEAR_TOKEN:
      return {
        isAuthenticated: false,
        userId: null,
      };
    case SET_TOKEN:
      return {
        ...state,
        isAuthenticated: true,
        userId: payload,
      };
    default:
      return state;
  }
};
