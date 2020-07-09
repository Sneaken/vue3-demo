<template>
  <h2>course 5:  computed</h2>
  <div class="mb10">
    <div> <span v-pre>reactive {{original}}</span> {{original}}</div>
    <button class="m10" @click="changeReactive">change reactive</button>
  </div>
  <div>
    <div> <span v-pre>readonly {{copy}}</span> {{copy}}</div>
    <button class="m10" @click="changeReadonly">change readonly</button>
  </div>
</template>

<script>
import { reactive, readonly, watchEffect } from 'vue';

export default {
  name: 'Readonly',
  setup() {
    const original = reactive({ count: 0, person: { age: 24 } });

    // 传入一个对象（响应式或普通）或 ref，返回一个原始对象的只读代理。
    // 一个只读的代理是“深层的”，对象内部任何嵌套的属性也都是只读的。
    const copy = readonly(original);

    watchEffect(() => {
      // 依赖追踪
      console.log(`Readonly.vue 依赖追踪: copy.count => ${copy.count}`);
    });

    function changeReactive() {
      // original 上的修改会触发 copy 上的侦听
      original.count += 2;
      console.log('Readonly.vue changeReactive()');
    }
    function changeReadonly() {
      // 无法修改 copy 并会被警告
      // warning: Set operation on key "count" failed: target is readonly.
      copy.count += 2; // warning!
      // warning: Set operation on key "age" failed: target is readonly.
      copy.person.age += 2;
    }
    return {
      original,
      copy,
      changeReactive,
      changeReadonly,
    };
  },
};
</script>

<style lang="less" scoped>
</style>
