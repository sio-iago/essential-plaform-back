/**
 * Back End API calls.
 */
const store = require('../store/storeConfig').store;

const userMock = () => {
    const { username, email, password } = store.getState().userReducer;
        
    return {
        username: username,
        email: email,
        token: 'DUMMY-TOKEN',
    }
}

export const register = () => {
    const { username, email, password } = store.getState().userReducer;
    
    return (!username || username.length < 4 || username !== password)
        ? {error: 'error'}
        : userMock();
}
    

export const login = () =>{
    const { username, email, password } = store.getState().userReducer;
    
    return (!username || username.length < 4 || username !== password)
        ? {error: 'error'}
        : userMock();
}

export const validateUser = () => userMock();