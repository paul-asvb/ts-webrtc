<script setup lang="ts">
import { ref, watch } from "vue";
import { useSessionStore } from "./store";
const session = useSessionStore();
</script>
<template>
  <h3>peers</h3>
  <table>
    <tr>
      <th>session id</th>
      <th>load</th>
    </tr>
    <tr v-for="peer in session.peers">
      <td>{{ peer.peer_id }}</td>
      <td>
        <button type="button" @click="session.loadRemoteOffer(peer.offer)">
          load as remote
        </button>
      </td>
    </tr>
  </table>
</template>
