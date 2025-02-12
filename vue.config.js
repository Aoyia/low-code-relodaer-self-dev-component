const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  // 为了支持运行时编译，需要设置 runtimeCompiler 为 true
  runtimeCompiler: true,
});
