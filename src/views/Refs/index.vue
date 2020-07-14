<template>
  <div ref="root"></div>
</template>

<script>
import { onMounted, ref, nextTick } from 'vue';

export default {
  name: 'Refs',
  setup() {
    const root = ref(null);
    nextTick(() => {
      console.log(root.value, 3); // 这个在mounted生命周期后面打印
    });
    onMounted(() => {
      // 在渲染完成后, 这个 div DOM 会被赋值给 root ref 对象
      console.log(root.value, 1); // <div/>
    });

    return {
      root,
    };
  },
  mounted() {
    console.log(this.root, 2);
  },
};
</script>

<style lang="less" scoped>
</style>
