<template>
  <div class="dynamic-component" ref="container"></div>
</template>

<script setup>
// 引入必要的 Vue API
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
  useAttrs,
} from "vue";
import { createApp } from "vue";
import CodeEngine from "./CodeEngine";

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

    const apiContext = {
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
      useAttrs,
      // 可选的加入window对象
      window,
    };

    // 执行前可先进行code校验检查...等操作

    // 获取vueOption对象
    const RemoteComponentOptions = CodeEngine.getInstance().executeTemplateFunc(
      code,
      apiContext
    );

    // 下面的操作也可封装到CodeEngine中，便于复用
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
