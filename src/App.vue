<template>
  <div id="app">
    <b-row class="d-flex vh-100 m-0">
      <VerticalNav />
      <b-col class="container p-2 vh-100 overflow-auto">
        <router-view />
      </b-col>
  </b-row>
  </div>
</template>

<script>
import VerticalNav from '@/layouts/VerticalNav';

  export default {
    name: 'App',
    components: {
      VerticalNav
    }
  }
</script>

<style>
</style>
