import { ADD_TODO_INPUT, SET_TODO_INPUT, DELETE_TODO_INPUT, UPDATE_TODO_INPUT } from "./constants";

const initState = {
    todos: [],
    todoInput: ''
}

function reducer(state, action) {
    switch (action.type) {
        case SET_TODO_INPUT:
            return {
                ...state,
                todoInput: action.payload
            }
        case ADD_TODO_INPUT:
            return {
                ...state,
                todos: [...state.todos, action.payload]
            }
        case DELETE_TODO_INPUT:
            let newTodos = [...state.todos];
            newTodos.splice(action.payload, 1)
            return {
                ...state,
                todos: newTodos
            }
        case UPDATE_TODO_INPUT:
            const {indexChange, todoInput} = action.payload;
            state.todos[indexChange.current] = todoInput;
            return {
                ...state
            }

        default:
            throw new Error('Invalid action!')
    }
}

export { initState }
export default reducer