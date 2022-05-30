<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useSessionStore } from "./store";
import LocalOffer from "./LocalOffer.vue"

const session = useSessionStore();

// lifecycle hooks
onMounted(() => {
  console.log(`mounted`);
});
</script>
<template>
  <main>
    <div>peer id :</div>
    {{ session.peer_id }}
    <div>session id : {{ session.session_id }}</div>

    <input :value="session.session_id" @input="(event) => session.$patch({ session_id: event.target.value })" />
    <LocalOffer />
  </main>
</template>
