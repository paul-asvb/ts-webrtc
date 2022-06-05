<script setup lang="ts">
import { ref } from "vue";
import { useSessionStore } from "./store";
const session = useSessionStore();
session.createOffer();
const push_sessions = ref(false);

async function pushOffer() {
  console.log(session);
  push_sessions.value = true;
  let s = {
    peer_id: session.peer_id,
    offer: session.local_offer,
  };
  await fetch(
    "https://webrtc-session.paul-asvb.workers.dev/" + session.session_id,
    {
      method: "POST",
      body: JSON.stringify(s),
    }
  ).catch(console.log);
  push_sessions.value = false;
}
</script>
<template>
  <hr />
  <h3>local offer</h3>
  <p>{{ JSON.stringify(session.local_offer) }}</p>
  <button type="button" @click="pushOffer">
    {{ !push_sessions ? "push offer" : "🔄" }}
  </button>
  <hr />
</template>
