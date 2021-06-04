export default {
    state: {
        currentUser: JSON.parse(window.localStorage.getItem('auth:currentUser')),
        token: window.localStorage.getItem('auth:token')
    },
    mutations: {
        setCurrentUser(state, loggedInUser) {
            state.currentUser = loggedInUser;
            window.localStorage.setItem('auth:currentUser', JSON.stringify(loggedInUser));
        },
        setToken(state, token) {
            state.token = token;
            window.localStorage.setItem('auth:token', token);
        },
        clearState(state) {
            state.token = null;
            window.localStorage.setItem('auth:token', null);
            state.currentUser = null;
            window.localStorage.setItem('auth:currentUser', null);
        }
    },
    getters: {
        loggedIn(state) {
            return !!state.currentUser;
        }
    }
}

