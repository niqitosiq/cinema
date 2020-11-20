<template>
  <div class="ui-pagination">
    <div
      v-for="story in stories"
      :key="story.id"
      class="ui-pagination__dot"
    ></div>

    <div class="ui-pagination__mark" :style="markStyle"></div>
  </div>
</template>

<script>
export default {
  name: 'ui-pagination',

  props: {
    stories: {
      type: Array,
      default: () => [],
    },

    active: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    storiesLen() {
      return this.stories.length;
    },

    activeIndex() {
      if (!this.active) return -1;

      return this.stories.findIndex((s = {}) => s.id === this.active.id);
    },

    markStyle() {
      const markWidth = this.storiesLen * 6;

      return `
        width: ${markWidth}px; 
        transform: translateX(${this.activeIndex * 6}px)
      `;
    },
  },
};
</script>

<style lang="scss">
.ui-pagination {
  position: relative;
  display: flex;
  height: 7px;

  &__dot {
    background-color: rgba(255, 255, 255, 0.4);
    width: 7px;
    height: 7px;
    border-radius: 3.5px;

    & + & {
      margin-left: 5px;
    }
  }

  &__mark {
    position: absolute;
    border-radius: 3.5px;
    height: 100%;
    background-color: #fff;
    transition: transform ease 0.3s;
  }
}
</style>
