<template>
  <h2>course 7: watch</h2>
  <div class="mb10">
    <div>
      <span v-pre>reactive {{ stateReactive.count }}</span> {{ stateReactive.count }}
    </div>
    <button class="m10" @click="changeReactive">change state.count</button>
  </div>
  <div class="mb10">
    <div>
      <span v-pre>ref {{ countRef }}</span> {{ countRef }}
    </div>
    <button class="m10" @click="changeRef">change count</button>
  </div>
</template>

<script>
import { reactive, ref, watch } from 'vue';

export default {
  name: 'Watch',
  setup() {
    // watch API 完全等效于 2.x this.$watch （以及 watch 中相应的选项）。
    // watch 需要侦听特定的数据源，并在回调函数中执行副作用。默认情况是懒执行的，也就是说仅在侦听的源变更时才执行回调。

    // 对比 watchEffect，watch 允许我们：
    //   - 懒执行副作用；
    //   - 更明确哪些状态的改变会触发侦听器重新运行副作用；
    //   - 访问侦听状态变化前后的值。

    // 侦听单个数据源 (侦听器的数据源可以是一个拥有返回值的 getter 函数，也可以是 ref)
    // 侦听一个 getter
    const stateReactive = reactive({ count: 0 });
    watch(
      () => stateReactive.count,
      (count, prevCount) => {
        console.log(`Watch.vue: state.count:${count}, prevCount:${prevCount}`);
      },
    );
    // 直接侦听一个 ref
    const countRef = ref(0);
    // eslint-disable-next-line no-shadow
    watch(countRef, (count, prevCount) => {
      console.log(`Watch.vue: count:${count}, prevCount:${prevCount}`);
    });

    // 侦听多个数据源
    // eslint-disable-next-line no-shadow
    watch([stateReactive, countRef], ([state, count], [prevState, prevCount]) => {
      console.log(
        `Watch.vue: state:${state},prevState:${prevState}, count:${count}, prevCount:${prevCount}`,
      );
    });
    // 与 watchEffect 共享的行为
    // watch 和 watchEffect 在停止侦听, 清除副作用 (相应地 onInvalidate 会作为回调的第三个参数传入)，
    // 副作用刷新时机 和 侦听器调试 等方面行为一致.

    function changeReactive() {
      stateReactive.count += 2;
    }
    function changeRef() {
      countRef.value += 1;
    }
    return {
      stateReactive,
      countRef,
      changeReactive,
      changeRef,
    };
  },
};
</script>

<style lang="less" scoped></style>
