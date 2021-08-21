<template>
  <div id="app">
    <Navbar></Navbar>
    <div class="w-3/4 mx-auto h-full">
      <router-view></router-view>
    </div>
    <p class="text-center text-gray-500 text-xs pt-60">
        &copy;2021 Kyaw Naing Tun. All rights reserved.
    </p>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>
