<script setup>
import { onBeforeMount } from 'vue';
import { RouterView } from 'vue-router';
import { useApplicationStore } from '@/stores/application.js';

const { loadUserData } = useApplicationStore();

onBeforeMount(() => {
  // If this method is non-blocking, add a loader.
  loadUserData();
});

</script>
<template>
  <div class="container">
    <RouterView />
  </div>
</template>




<style>
/* Add global styling for your application here */
body {
  font-family: 'Arial', sans-serif;
  background-image: 'C:\Users\Rafaela\Downloads\455601633_1018452869761871_3577872540159582754_n.jpg' ;
}
</style>