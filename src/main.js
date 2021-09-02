import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

const app = createApp(App);
const host = "http://localhost:4000";

app.config.globalProperties.$axios = axios;
app.config.globalProperties.$host = host;

app.use(store).use(router).mount("#app");
