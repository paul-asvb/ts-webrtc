import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import createWebRTC from "./rtc";
import { useSessionStore } from "./store";

const pinia = createPinia();

createApp(App).use(pinia).mount("#app");
