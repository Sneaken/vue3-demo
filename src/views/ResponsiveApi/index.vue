<template>
  <nav class="left">
    <ul>
      <li v-for="item in list" :key="item.name">
        <router-link :to="{ name: item.name }">{{item.label}}</router-link>
      </li>
    </ul>
  </nav>

  <router-view />
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'ResponsiveApi',
  setup() {
    const list = ref([{
      name: 'Reactive',
      label: 'reactive',
    }, {
      name: 'Ref',
      label: 'ref',
    }]);

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
</style>
