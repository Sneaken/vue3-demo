<template>
  <h2>course 2:  reactive</h2>
  <div>{{state}}</div>
</template>

<script>
import { ref, reactive } from 'vue';

export default {
  name: 'Reactive',
  setup() {
    // 接收一个普通对象然后返回该普通对象的响应式代理。等同于 2.x 的 Vue.observable()
    const count = ref(0);
    // 当 ref 作为 reactive 对象的 property 被访问或修改时，也将自动解套 value 值，其行为类似普通属性：
    const state = reactive({
      count,
    }); // template里面的提示更智能了!! 牛皮

    console.log(state.count); // 0

    state.count = 1;
    console.log(count.value); // 1

    return { state };
  },
};
</script>

<style lang="less" scoped>

</style>
