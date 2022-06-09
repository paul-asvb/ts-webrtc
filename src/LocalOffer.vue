<script setup lang="ts">
import { useSessionStore } from "./store";
const session = useSessionStore();
</script>
<template>
  <hr />
  <h3>local offer</h3>
  <p>{{ JSON.stringify(session.message) }}</p>
  <button type="button" @click="session.pushOffer">
    {{ !session.loading ? "push offer" : "🔄" }}
  </button>
  <hr />
</template>
