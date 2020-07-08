<template>
  <div>{{msg}}</div>
</template>

<script>
import { watchEffect } from 'vue';

export default {
  name: 'PropsDemo',
  props: {
    msg: String,
  },
  setup(props) {
    watchEffect(() => {
      console.log(`PropsDemo.vue : props.msg is: ${props.msg} 2`);
    });
  },
};
</script>

<style lang="" scoped>

</style>
