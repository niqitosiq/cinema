<template>
  <div class="story-wrapper"></div>
</template>

<script>
export default {
  name: 'story-wrapper',
  props: {
    story: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style lang="scss">
.story-wrapper {
}
</style>
