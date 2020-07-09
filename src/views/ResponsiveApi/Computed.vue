<template>
  <h2>course 4:  computed</h2>
  <div class="mb10">
    <div> <span v-pre>ref {{count}}</span> {{count}}</div>
    <button class="m10" @click="changeCount">change count</button>
  </div>
  <div>
    <div> <span v-pre>computed {{plusOne}}</span> {{plusOne}}</div>
    <button class="m10" @click="changePlusOne">change plusOne</button>
  </div>
  <div>
    <div> <span v-pre>computed get&set {{getterAndSetter}}</span> {{getterAndSetter}}</div>
    <button class="m10" @click="changeSetter">change setter</button>
  </div>
</template>

<script>
import { computed, ref } from 'vue';

export default {
  name: 'Computed',
  setup() {
    const count = ref(1);

    // 传入一个 getter 函数，返回一个默认不可手动修改的 ref 对象。
    const plusOne = computed(() => count.value + 1);

    console.log(plusOne.value); // 2

    function changeCount() {
      count.value += 2;
    }
    function changePlusOne() {
      // 计算属性只有getter的情况下控制台发出警告:
      // Write operation failed: computed value is readonly
      plusOne.value += 2; // 错误！
    }

    const getterAndSetter = computed({
      get: () => plusOne.value + 2,
      set: (val) => {
        count.value += val + 1;
        console.log('Computed.vue set trigger');
        // console.log(this); // 无论是属性简写 还是箭头函数 this 都是 undefined
      },
    });
    function changeSetter() {
      getterAndSetter.value += 2;
    }
    return {
      count,
      plusOne,
      changeCount,
      changePlusOne,
      getterAndSetter,
      changeSetter,
    };
  },
};
</script>

<style lang="less" scoped>
</style>
