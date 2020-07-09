<template>
  <h3>生命周期</h3>
</template>

<script>
import { onMounted, onUpdated, onUnmounted } from 'vue';

export default {
  name: 'LifeCycle',
  setup() {
    // 生命周期钩子函数
    // 可以直接导入 onXXX 一族的函数来注册生命周期钩子：
    // setup() 里面的声明周期钩子先执行
    console.log('LifeCycle.vue setup');

    onMounted(() => {
      console.log('LifeCycle.vue onMounted');
    });
    onUpdated(() => {
      console.log('LifeCycle.vue onUpdated');
    });
    onUnmounted(() => {
      console.log('LifeCycle.vue onUnmounted');
    });
    // 这些生命周期钩子注册函数只能在 setup() 期间同步使用，
    // 因为它们依赖于内部的全局状态来定位当前组件实例（正在调用 setup() 的组件实例）,
    // 不在当前组件下调用这些函数会抛出一个错误。

    // 组件实例上下文也是在生命周期钩子同步执行期间设置的，
    // 因此，在卸载组件时，在生命周期钩子内部同步创建的侦听器和计算状态也将自动删除。

    // 除了和 2.x 生命周期等效项之外，组合式 API 还提供了以下调试钩子函数：
    //   - onRenderTracked
    //   - onRenderTriggered
  },
  beforeCreate() {
    console.log('LifeCycle.vue beforeCreate');
  },
  created() {
    console.log('LifeCycle.vue created');
  },
  beforeMount() {
    console.log('LifeCycle.vue beforeMount');
  },
  mounted() {
    console.log('LifeCycle.vue mounted');
  },
  updated() {
    console.log('LifeCycle.vue updated');
  },
  beforeUnmount() {
    console.log('LifeCycle.vue beforeUnmount （beforeDestroy 弃用）');
  },
  unmounted() {
    console.log('LifeCycle.vue unmounted （destroyed 弃用）');
  },
  errorCaptured() {
    console.log('LifeCycle.vue errorCaptured');
  },
  // 两个钩子函数都接收一个 DebuggerEvent，与 watchEffect 参数选项中的 onTrack 和 onTrigger 类似：
  onRenderTriggered(e) {
    // 检查哪个依赖性导致组件重新渲染
    console.log('LifeCycle.vue onRenderTriggered', e);
  },
  onRenderTracked(e) {
    console.log('LifeCycle.vue onRenderTracked', e);
  },
};
</script>

<style lang="less" scoped>
.left {
  position: fixed;
  top: 20px;
  left: 0;
  width: 200px;
  float: left;
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
}
</style>
