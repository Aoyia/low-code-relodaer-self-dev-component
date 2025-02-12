<template>
  <div id="app">
    <h1>本地宿主应用</h1>
    <DynamicLoader scriptPath="/my-remote-component.js" />
  </div>
</template>

<script>
import DynamicLoader from "./DynamicLoader.vue";

export default {
  name: "App",
  components: {
    DynamicLoader,
  },
};
</script>
