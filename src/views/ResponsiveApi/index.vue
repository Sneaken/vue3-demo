<template>
  <nav class="left">
    <ul>
      <li v-for="item in list" :key="item.name">
        <router-link :to="{ name: item.name }">{{ item.label }}</router-link>
      </li>
    </ul>
  </nav>

  <router-view />

  <router-link class="next" :to="{ name: 'LifeCycle' }">Next Course: life cycle</router-link>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'ResponsiveApi',
  setup() {
    const list = ref([
      { name: 'Reactive', label: 'reactive' },
      { name: 'Ref', label: 'ref' },
      { name: 'Computed', label: 'computed' },
      { name: 'Readonly', label: 'readonly' },
      { name: 'WatchEffect', label: 'watchEffect' },
      { name: 'Watch', label: 'watch' },
    ]);

    return { list };
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
.next {
  position: fixed;
  top: 200px;
  left: 40px;
}
</style>
