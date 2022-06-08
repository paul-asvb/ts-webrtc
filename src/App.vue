<script setup lang="ts">
import { useSessionStore } from "./store";
import LocalOffer from "./LocalOffer.vue";
import SessionList from "./SessionList.vue";
import PeerList from "./PeerList.vue";
import SendMessage from "./SendMessage.vue";
const session = useSessionStore();
session.createConnection();
</script>
<template>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
  <main>

    {{ session.peer_id }}
    <div>session id : {{ session.session_id }}</div>

    <input :value="session.session_id"
      @input="(event) => session.$patch({ session_id: (event.target as HTMLInputElement).value })" />
    <LocalOffer />
    <SessionList />
    <PeerList v-if="session.peers.length > 0" />
    <SendMessage />
  </main>
</template>
