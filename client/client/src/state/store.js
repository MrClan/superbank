import Vuex from "vuex";
import authStore from "./stores/authStore";

const vuexStore = new Vuex.Store({
    ...authStore
});

export default vuexStore;
