import { actions } from ".";

function logger(reducer) {
    return (prevState, action) => {
        console.group(action.type)
        console.log('PrevState: ', prevState);
        console.log('Action', action);

        const nextState = reducer(prevState, action)
        console.log('NextState: ', prevState);
        console.groupEnd()
        return nextState;
    }
}

export default logger