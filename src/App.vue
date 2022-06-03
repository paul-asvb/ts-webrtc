<script setup lang="ts">
import { useSessionStore } from "./store";
import LocalOffer from "./LocalOffer.vue";
import SessionList from "./SessionList.vue";
import PeerList from "./PeerList.vue";
const session = useSessionStore();
</script>
<template>
  <main>
    <div>peer id :</div>
    {{ session.peer_id }}
    <div>session id : {{ session.session_id }}</div>

    <input
      :value="session.session_id"
      @input="(event) => session.$patch({ session_id: event.target.value })"
    />
    <LocalOffer />
    <SessionList />
    <PeerList v-if="session.peers.length > 0" />
  </main>
</template>
