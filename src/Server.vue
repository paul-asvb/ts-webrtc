<script setup lang="ts">
import { useSessionStore } from "./store";
import { ref } from "vue";
const session = useSessionStore();
session.loadSessions();
const is_server = ref(false)

</script>
<template>
  <table class="w-full">
    <tr class="w-1/2 bg-indigo-300">
      <th class="p-2 s">Available Servers</th>
      <th class="p-2 text-center"></th>
      <th class="p-2 text-center"></th>
    </tr>
    <tr v-if="session.sessions.length == 0">
      <td class="p-2">No server found</td>
    </tr>
    <tr v-else v-for="l in session.sessions">
      <td class="p-2">Server 1</td>
      <td class="text-center">
        <button class="rounded px-3 py-2 m-1 border-b-4 border-l-2 shadow-lg bg-blue-700 border-blue-800 text-white">
          join
        </button>
      </td>
      <td class="text-center">
        <button @click="session.deleteSessions(l.name)"
          class="rounded px-3 py-2 m-1 border-b-4 border-l-2 shadow-lg bg-blue-700 border-blue-800 text-white">
          🗑️
        </button>
      </td>
    </tr>
  </table>
  <button @click="session.loadSessions()"
    class="rounded px-3 py-2 m-1 border-b-4 border-l-2 shadow-lg bg-blue-700 border-blue-800 text-white">
    refresh
  </button>
  <button @click="session.pushOffer()"
    class="rounded px-3 py-2 m-1 border-b-4 border-l-2 shadow-lg bg-blue-700 border-blue-800 text-white">
    create Server
  </button>
</template>
