import { localStorageService } from '../services/localStorageService';
import { SERVER_URL } from '../consts';
import { CLEAR_TOKEN, SET_TOKEN } from './actionTypes';

export const setToken = data => ({ type: SET_TOKEN, payload: data });

export const logoutAsync = dispatch => {
  return fetch(`${SERVER_URL}/logout`, { method: 'POST', credentials: 'include' })
    .finally(() => {
      localStorageService.clearData();
      dispatch({ type: CLEAR_TOKEN });
    })
    .catch(console.error);
};
