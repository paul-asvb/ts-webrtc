<script setup lang="ts">
import { useSessionStore } from "./store";
import LocalOffer from "./LocalOffer.vue";
import SessionList from "./SessionList.vue";
import PeerList from "./PeerList.vue";
import SendMessage from "./SendMessage.vue";
import Server from "./Server.vue";
const session = useSessionStore();
session.createConnection();
</script>
<template>
  <main class="container mx-auto">
    <Server />
  </main>
</template>
