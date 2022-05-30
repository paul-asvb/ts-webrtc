<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useSessionStore } from "./store";

const session = useSessionStore();

const createOffer = () => {
  console.log("oofer")
};

// lifecycle hooks
onMounted(() => {
  console.log(`mounted`);
});
</script>
<template>
  <hr />
  <h3>local offer</h3>
  <p id="offerLocal"></p>
  <br />
  <button  @click="createOffer">create local offer</button>
  <button id="pushOffer" data-cy="create">push local offer</button>
  <hr />
</template>
