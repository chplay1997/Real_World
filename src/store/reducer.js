import { SET_USER } from './constants';
const user = JSON.parse(localStorage.getItem('user'));
const initState = {
    user: user || '',
};

function reducer(state, action) {
    switch (action.type) {
        case SET_USER:
            return { user: action.payload };

        default:
            throw new Error('Invalid action!');
    }
}

export { initState };
export default reducer;
