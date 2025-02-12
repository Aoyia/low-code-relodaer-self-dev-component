module.exports = {
  template: `
    <div style="border: 2px solid blue; padding: 20px; margin: 20px;">
      <h2>我是远程加载的组件</h2>
      <p>当前时间: {{ currentTime }}</p>
      <button @click="updateTime">更新时间</button>
    </div>
  `,
  data() {
    return {
      currentTime: new Date().toLocaleString(),
    };
  },
  methods: {
    updateTime() {
      this.currentTime = new Date().toLocaleString();
    },
  },
};
