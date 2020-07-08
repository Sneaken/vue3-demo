<template>
  <h2>course 3:  ref</h2>
  <div>
    <div>{{count}}</div>
      <button @click="changCount">change count</button>
  </div>
  <div>
    <div>{{obj}}</div>
    <button @click="changeAge">change age</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Ref',
  setup() {
    // 接受一个参数值并返回一个响应式且可改变的 ref 对象。ref 对象拥有一个指向内部值的单一属性
    const count = ref(0);
    console.log(count.value); // 0
    count.value += 2; // 在 setup 内部 得用.value 来当访问当前值
    console.log(count.value); // 2

    // 如果传入 ref 的是一个对象，将调用 reactive 方法进行深层响应转换。 (见changeAge)
    const obj = ref({
      name: 'xx',
      age: 23,
    });
    return { count, obj };
  },
  methods: {
    changCount() {
      this.count += 2; // 在外部不需要添加.value 就能访问当前值
    },
    changeAge() {
      this.obj.age += 2;
      if (!this.obj.likes) {
        this.obj.likes = 3; // 是的没错!!!这样干页面能渲染!!
        return;
      }
      this.obj.likes += 3;
    },
  },
};
</script>

<style lang="less" scoped>

</style>
