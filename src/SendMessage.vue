<script setup lang="ts">
import { ref } from "vue";
import { useSessionStore } from "./store";
const session = useSessionStore();
let message = ref("");
</script>
<template>
  <hr />
  <input v-model="message" />
  <button type="button" @click="session.sendMessage(message)">send</button>
  
</template>
