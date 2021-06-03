import { createApp } from "vue";
import store from "./state/store";

// styles

import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";

import router from "./routes";

import App from "@/App.vue";
createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
