// Initial state
export const initialState = {
    token: null,
    username: null,
    email: null,
    password: null,
};

// Enum for user actions
export const USER_ACTIONS = {
    INITIAL_STATE: 'USER_INITIAL_STATE',
    
    UPDATE_USERNAME: 'UPDATE_USERNAME',
    UPDATE_EMAIL: 'UPDATE_EMAIL',
    UPDATE_PASSWORD: 'UPDATE_PASSWORD',
    UPDATE_TOKEN: 'UPDATE_TOKEN',
    

    REGISTER_USER: 'REGISTER_USER',
    LOGIN_USER: 'LOGIN_USER',
    VERIFY_USER: 'VERIFY_USER'
    
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_ACTIONS.INITIAL_STATE:
            return initialState;

        case USER_ACTIONS.UPDATE_USERNAME:
            return {...state, username : action.value};
        case USER_ACTIONS.UPDATE_EMAIL:
            return {...state, email: action.value};
        case USER_ACTIONS.UPDATE_PASSWORD:
            return {...state, password : action.value};
        case USER_ACTIONS.UPDATE_TOKEN:
            return {...state, token : action.value};

        case USER_ACTIONS.REGISTER_USER:
        case USER_ACTIONS.LOGIN_USER:
        case USER_ACTIONS.VERIFY_USER:
            return {...state, token: action.value, password: null};
        
        default:
            return state;
    }
};

export default userReducer;

