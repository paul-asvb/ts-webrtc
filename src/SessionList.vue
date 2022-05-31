<script setup lang="ts">
import { ref } from "vue";
import { useSessionStore } from "./store";
const session = useSessionStore();
</script>
<template>
  <h3>sessions</h3>
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
          load peers
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
