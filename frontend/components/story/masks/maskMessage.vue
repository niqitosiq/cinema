<template>
  <div
    :class="['mask-message', { active }]"
    :style="metaStyle"
    v-html="meta.text"
  ></div>
</template>

<script>
import maskMixin from './maskMixin';

export default {
  name: 'mask-message',

  mixins: [maskMixin],

  computed: {
    metaStyle() {
      return `
        left: calc(50% - ${this.meta.x}px);
        bottom: ${this.meta.y}px;
      `;
    },
  },
};
</script>

<style lang="scss">
.mask-message {
  background-color: #fff;
  font-size: 24px;
  border-radius: 5px;
  padding: 10px 20px;
  z-index: 20;
  position: absolute;
  max-width: 300px;
  width: 100%;
  bottom: 0;
  left: 0;
  color: #1e1e1e;

  transform: rotate(10deg) translate(-50%, 20px);
  transition: opacity ease 0.01s, transform ease 0.01s;
  opacity: 0;

  &.active {
    transform: rotate(5deg) translate(-50%, 0px);
    opacity: 1;
    transition: opacity ease 0.3s 0.2s, transform ease 0.3s 0.2s;
  }
}
</style>
