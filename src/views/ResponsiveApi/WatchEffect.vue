<template>
  <h2>course 6:  watchEffect</h2>
  <div class="mb10">
    <div> <span v-pre>ref {{count}}</span> {{count}}</div>
    <button class="m10" @click="changeCount">change count</button>
  </div>
  <div class="mb10">
    <div> <span v-pre>let {{otherCount}}</span> {{otherCount}}</div>
    <button class="m10" @click="changeOtherCount">change otherCount</button>
  </div>
  <div class="mb10">
    <div> <span v-pre>reactive {{id.value}}</span> {{id.value}}</div>
    <button class="m10" @click="changeValue">change value</button>
  </div>
</template>

<script>
import {
  watchEffect, ref, reactive, onMounted,
} from 'vue';

export default {
  name: 'WatchEffect',
  setup() {
    const count = ref(0);
    let otherCount = 3;
    // 立即执行传入的一个函数，并响应式追踪其依赖，并在其依赖变更时重新运行该函数。
    watchEffect(() => {
      console.log(`WatchEffect.vue: count.value => ${count.value}, otherCount=> ${otherCount}`);
    });

    setTimeout(() => {
      count.value += 2;
    }, 100);
    function changeCount() {
      count.value += 2;
    }
    function changeOtherCount() {
      // 不是响应式的变量变化不会触发 watchEffect
      otherCount += 3;
      console.log(`WatchEffect.vue: otherCount=> ${otherCount}`);
    }

    // 当 watchEffect 在组件的 setup() 函数或生命周期钩子被调用时，
    // 侦听器会被链接到该组件的生命周期，并在组件卸载时自动停止。

    // 在一些情况下，也可以显式调用返回值以停止侦听：
    const stop = watchEffect(() => {
      console.log(`WatchEffect.vue: stop  count.value => ${count.value}`);
    });

    // 之后
    watchEffect(() => {
      if (count.value > 10) {
        stop();
      }
    });

    // 有时副作用函数会执行一些异步的副作用, 这些响应需要在其失效时清除（即完成之前状态已改变了）。
    // 所以侦听副作用传入的函数可以接收一个 onInvalidate 函数作入参, 用来注册清理失效时的回调。
    // 当以下情况发生时，这个失效回调会被触发:
    //   - 副作用即将重新执行时
    //   - 侦听器被停止 (如果在 setup() 或 生命周期钩子函数中使用了 watchEffect, 则在卸载组件时)
    const id = reactive({ value: 20 });
    function performAsyncOperation(value) {
      // 这个函数是假的 应该用 axios
      let token;
      const result = new Promise((resolve) => {
        token = setTimeout(() => {
          resolve(value + 1);
        }, 10000);
      });
      return {
        value: result,
        cancel() {
          console.log(`WatchEffect.vue: token.cancel() token:${token}`);
          clearTimeout(token);
        },
      };
    }
    watchEffect((onInvalidate) => {
      const token = performAsyncOperation(id.value);
      console.log(`WatchEffect.vue: log after cancel token:${token}`);
      // 这边和 React 的 useEffect 不同哦
      // 之所以是通过传入一个函数去注册失效回调，而不是从回调返回它，是因为返回值对于异步错误处理很重要。
      onInvalidate(() => {
        // id 改变时 或 停止侦听时
        // 取消之前的异步操作
        token.cancel();
      });
    });

    function changeValue() {
      id.value += 2;
      console.log(`WatchEffect.vue: id.value change ${id.value}`);
    }

    // 请注意，初始化运行是在组件 mounted 之前执行的。因此，如果你希望在编写副作用函数时访问 DOM（或模板 ref），
    // 请在 onMounted 钩子中进行：
    onMounted(() => {
      watchEffect(() => {
        // 在这里可以访问到 DOM 或者 template refs
        console.log('WatchEffect.vue: onMounted');
      });
    });

    // 如果副作用需要同步或在组件更新之前重新运行，我们可以传递一个拥有 flush 属性的对象作为选项（默认为 'post'）：
    // 同步运行
    watchEffect(
      () => {
        console.log('WatchEffect.vue: synchronous execution');
      },
      {
        flush: 'sync',
      },
    );

    // 组件更新前执行
    watchEffect(
      () => {
        console.log('WatchEffect.vue: update');
      },
      {
        flush: 'pre',
      },
    );

    // onTrack 和 onTrigger 选项可用于调试一个侦听器的行为。
    // 当一个 reactive 对象属性或一个 ref 作为依赖被追踪时，将调用 onTrack
    // 依赖项变更导致副作用被触发时，将调用 onTrigger
    // onTrack 和 onTrigger 仅在开发模式下生效。
    watchEffect(
      () => {
        changeCount(); //  这边也能监听到count的改变 我感觉挺诡异的
        console.log('WatchEffect.vue watchEffect->changeCount');
      },
      {
        onTrigger(e) {
          // 监听到改变先触发这个
          // 依赖项变更导致副作用
          console.log('WatchEffect.vue watchEffect->changeCount->onTrigger', e);
        },
        onTrack(e) {
          // 然后触发这个
          // 当一个 reactive 对象属性或一个 ref 作为依赖被追踪时 没看明白 后头再看看
          console.log('WatchEffect.vue watchEffect->changeCount->onTrack', e);
        },
      },
    );
    return {
      count,
      changeCount,
      otherCount,
      changeOtherCount,
      id,
      changeValue,
    };
  },
};
</script>

<style lang="less" scoped>
</style>
