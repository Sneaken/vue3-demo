<template>
  <h2>course 1:  setup</h2>
  <div>
    <div v-pre> 注意 setup 返回的 ref 在模板中会自动解开，不需要写 .value。 {{count}}</div>
    <div><span v-pre>{{count}}:</span> {{count}}</div>
  </div>

  <br>
  <div>
    <props-demo :msg="msg"/>
    <button @click="changeMsg">change msg</button>
  </div>

  <div>
    <button @click="logThis">log this</button>
  </div>
</template>

<script>
import { reactive, ref, watchEffect } from 'vue';
import PropsDemo from '@/views/SetUp/components/PropsDemo.vue';

export default {
  name: 'SetUp',
  components: { PropsDemo },
  props: {
    name: String,
  },
  setup(props, { attrs, slots, emit }) {
    // 调用时机：
    // 创建组件实例，然后初始化 props,紧接着就调用setup函数。
    // 从生命周期钩子的视角来看，它会在 beforeCreate 钩子之前被调用。
    const count = ref(0);
    const msg = ref('');
    const object = reactive({ foo: 'bar' });

    // props
    // 该函数可以接受props作为第一个参数
    // 注意 props 对象是响应式的，watchEffect 或 watch 会观察和响应 props 的更新：

    // 不要解构 props 对象，那样会使其失去响应性,并且编辑器会提示
    // Destructuring the `props` will cause the value
    //   to lose reactivity.(vue/no-setup-props-destructure)
    watchEffect(() => {
      console.log(`SetUp.vue : count.value is: ${count.value}`);
    });

    // context
    // 第二个参数提供了一个上下文对象，从原来 2.x 中 this 选择性地暴露了一些 property。
    // context.attrs
    // context.slots
    // context.emit
    // attrs 和 slots 都是内部组件实例上对应项的代理，可以确保在更新后仍然是最新值。所以可以解构，无需担心后面访问到过期的值
    console.log(attrs, slots, emit);

    // this 在 setup() 中不可用
    // 由于 setup() 在解析 2.x 选项前被调用，setup() 中的 this 将与 2.x 选项中的 this 完全不同。
    console.log(this); // undefined

    // methods 方法在模板中使用需要导出
    function changeMsg() {
      msg.value += '1';
      // this.msg += '1' // 这样也行
    }
    function logThis() {
      console.log(this); // 你猜猜这里的this是啥?
    }

    // 暴露给模板
    // 注意 setup 返回的 ref 在模板中会自动解开，不需要写 .value。
    return {
      count,
      object,
      msg,
      changeMsg,
      logThis,
    };

    // jsx会直接覆盖template
    // h的来源 => import { h } from 'vue'
    // return () => h('div', [count.value, object.foo]);
  },
};
</script>

<style lang="less" scoped>

</style>
