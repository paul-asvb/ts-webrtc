<script setup lang="ts">
import { ref } from "vue";
import { useSessionStore } from "./store";
const session = useSessionStore();

session.$subscribe((mutation, state) => {
  console.log(mutation);
  console.log(state);
});
</script>
<template>
  <h3>Peers</h3>
  <button type="button" @click="session.loadSessions">
    {{ !session.loading ? "load sessions" : "🔄" }}
  </button>
  <table>
    <tr>
      <th>session id</th>
      <th>load</th>
      <th>delete</th>
    </tr>
    <tr v-for="l in session.sessions">
      <td>{{ l.name }}</td>
      <td>
        <button type="button" @click="session.$patch({ session_id: l.name })">
          set
        </button>
      </td>
      <td>
        <button type="button" @click="session.deleteSessions(l.name)">
          🗑️
        </button>
      </td>
    </tr>
  </table>
</template>
