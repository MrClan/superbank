import axios from 'axios';
import store from '../state/store';

const apiUrl = "http://localhost:3000/api";

let instance = axios.create({
    baseURL: apiUrl
});

if (store.state.token) {
    instance.defaults.headers['Authorization'] = `Bearer ${store.state.token}`;
}

const apiHandler = {
    get: instance.get,
    post: instance.post,
    patch: instance.patch,
    login: (username, password) => {
        const endpoint = '/auth';
        return new Promise((resolve, reject) => {
            instance
                .post(endpoint, {
                    email: username,
                    password: password
                })
                .then((response) => {
                    store.commit('setToken', response.data.token);
                    instance.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;
                    apiHandler
                        .loadUser()
                        .then(user => {
                            resolve(user);
                        })
                        .catch(userErr => {
                            reject(userErr);
                        });
                })
                .catch((err) => {
                    reject(err.response.data);
                });
        });
    },
    register: (user) => {
        const endpoint = '/users';
        return new Promise((resolve, reject) => {
            instance
                .post(endpoint, user)
                .then((response) => resolve(user))
                .catch((err) => reject(err.response.data));
        });
    },
    logout: () => {
        store.commit('clearState', '');
    },
    loadUser: () => {
        const endpoint = '/users';
        return new Promise((resolve, reject) => {
            instance
                .get(endpoint)
                .then(response => {
                    store.commit('setCurrentUser', response.data);
                    resolve(response.data);
                })
                .catch((err) => {
                    reject(err.response.data);
                });
        });
    },
    log: (msg) => {
        console.log(msg);
    }
};

export default apiHandler;