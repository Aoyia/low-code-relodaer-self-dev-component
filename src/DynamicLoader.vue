<template>
  <div class="dynamic-component" ref="container"></div>
</template>

<script setup>
// 优化: 引入更多必要的 Vue API
import {
  ref,
  onMounted,
  getCurrentInstance,
  defineProps,
  reactive,
  computed,
  watch,
  watchEffect,
  nextTick,
  provide,
  inject,
  onBeforeMount,
  onUpdated,
  onUnmounted,
  onBeforeUnmount,
  toRef,
  toRefs,
  // defineEmits,
  // defineExpose,
  useSlots,
  useAttrs
} from "vue";
import { createApp } from "vue";

const props = defineProps({
  scriptPath: {
    type: String,
    required: true,
  },
});

const container = ref(null);
const instance = ref(null);

const renderComponent = async () => {
  if (!container.value) return;

  try {
    const response = await fetch(props.scriptPath);
    if (!response.ok) {
      throw new Error(`获取脚本失败: ${response.status}`);
    }
    const code = await response.text();

    const exports = {};
    const module = { exports };
    
    // 优化: 提供完整的 Vue Composition API 上下文
    const vueContext = {
      ref,
      reactive,
      computed,
      watch,
      watchEffect,
      onMounted,
      onBeforeMount,
      onUpdated,
      onUnmounted,
      onBeforeUnmount,
      nextTick,
      provide,
      inject,
      toRef,
      toRefs,
      // defineEmits,
      // defineExpose,
      useSlots,
      useAttrs
    };

    const executeCode = new Function(
      "vueContext",
      "module",
      `with(vueContext){${code}}\nreturn module.exports;`
    );

    executeCode(vueContext, module);

    const RemoteComponentOptions = module.exports;

    if (instance.value) {
      instance.value.unmount();
      container.value.innerHTML = "";
    }

    const appContext = getCurrentInstance()?.appContext?.app;
    const childApp = createApp(RemoteComponentOptions);

    if (appContext?.config?.globalProperties) {
      childApp.config.globalProperties = appContext.config.globalProperties;
    }

    instance.value = childApp.mount(container.value);
  } catch (err) {
    console.error("加载远程组件出错:", err);
  }
};

onMounted(() => {
  renderComponent();
});
</script>
