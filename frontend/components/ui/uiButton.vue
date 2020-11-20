<template>
  <a-button class="ui-button" v-bind="$props" v-on="$listeners">
    <slot />
  </a-button>
</template>

<script>
/* eslint-disable no-undef */
/* eslint-disable vue/require-prop-types */
export default {
  name: 'ui-button',

  props: [
    'block',
    'disabled',
    'ghost',
    'htmlType',
    'icon',
    'loading',
    'prefixCls',
    'shape',
    'size',
    'type',
  ],

  data() {
    return {};
  },
};
</script>

<style lang="scss">
.ui-button {
  height: 50px;
  font-size: 16px;
  border-radius: 32px;
}
</style>
