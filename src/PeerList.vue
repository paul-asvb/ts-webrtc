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
    <tr v-for="l in session.peers">
      <td>{{ l.peer_id }}</td>
      <td>
        <button type="button" @click="session.$patch({ session_id: l.name })">
          {{ JSON.stringify(l.offer) }}
        </button>
      </td>
    </tr>
  </table>
</template>
