function anonymous(
  contextData, ref, reactive, computed, watch, watchEffect, onMounted, onBeforeMount, onUpdated, onUnmounted, onBeforeUnmount, nextTick, provide, inject, toRef, toRefs, useSlots, useAttrs, window
) {

  "use strict";

  function executeLowCodeTemplate() {
    var vueComponentOptions = {
      setup: function setup() {
        var currentTime = ref(new Date().toLocaleString());

        var updateTime = function updateTime() {
          currentTime.value = new Date().toLocaleString();
        };

        return {
          currentTime: currentTime,
          updateTime: updateTime
        };
      },

      template: "\n    <div style=\"border: 2px solid blue; padding: 20px; margin: 20px;\">\n      <h2>\u6211\u662F\u8FDC\u7A0B\u52A0\u8F7D\u7684\u7EC4\u4EF6</h2>\n      <p>\u5F53\u524D\u65F6\u95F4: {{ currentTime }}</p>\n      <button @click=\"updateTime\">\u66F4\u65B0\u65F6\u95F4</button>\n    </div>\n  "
    };

    return vueComponentOptions;
  }
  return executeLowCodeTemplate();
}