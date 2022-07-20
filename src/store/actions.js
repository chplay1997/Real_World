import { SET_USER } from './constants';

export const setUser = (payload) => ({
    type: SET_USER,
    payload,
});
