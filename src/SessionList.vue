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
  <div v-if="session.sessions.length == 0">no sessions</div>
  <div v-else>
    <table>
      <tr>
        <th>session id</th>
        <th>load</th>
        <th>delete</th>
      </tr>

      <tr v-for="l in session.sessions">
        <td>{{ l.name }}</td>
        <td>
          <button type="button" @click="session.useSession(l.name)">
            use this session
          </button>
        </td>
        <td>
          <button type="button" @click="session.deleteSessions(l.name)">
            🗑️
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>
