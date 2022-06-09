<script setup lang="ts">
import { useSessionStore } from "./store";
const session = useSessionStore();
</script>
<template>
  {{ session.peer_id }}
  <div>session id : {{ session.session_id }}</div>

  <input :value="session.session_id"
    @input="(event) => session.$patch({ session_id: (event.target as HTMLInputElement).value })" />
</template>
