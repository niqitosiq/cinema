<template>
  <div
    :class="['story-wrapper', { visible: isStoryActive }]"
    @click="close"
    @mouseup="mouseup"
    @mousedown="mousedown"
    @mousemove="mousemove"
    @touchmove="mousemove"
    @touchstart="mousedown"
    @touchend="mouseup"
  >
    <transition name="story">
      <div
        v-if="isStoryActive"
        class="story-wrapper__video"
        @click.prevent.stop
      >
        <story-video ref="video" :position="videoStyle" :url="story.url" />
      </div>
    </transition>
  </div>
</template>

<script>
import throttle from 'lodash/throttle';

export default {
  name: 'story-wrapper',

  props: {
    story: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      mouseClamped: false,
      videoPosition: {
        x: 0,
        y: 0,
        progress: 1,
      },
    };
  },

  computed: {
    isStoryActive() {
      return this.story !== null && this.story !== undefined;
    },

    videoStyle() {
      return `
        transform: translate(${this.videoPosition.x}px, ${this.videoPosition.y}px);
        opacity: ${this.videoPosition.progress};
      `;
    },
  },

  watch: {
    story: {
      deep: true,
      handler() {
        this.play();
      },
    },
  },

  methods: {
    async play() {
      if (!this.$refs.video) {
        await this.$nextTick();
      }

      this.$refs.video.play();
    },

    close() {
      this.$emit('close');
    },

    mousedown() {
      this.mouseClamped = true;
    },

    mouseup() {
      this.mouseClamped = false;

      if (this.videoPosition.x > 50) {
        this.$emit('prev');
      } else if (this.videoPosition.x < -50) {
        this.$emit('next');
      }

      this.updateVideoPosition({
        x: 0,
        y: 0,
        progress: 1,
      });
    },

    mousemove(event) {
      if (!this.mouseClamped) {
        this.mouseup();
        if (event.type !== 'touchmove') return;
      }

      const x =
        event.type === 'touchmove'
          ? event.changedTouches[0].clientX
          : event.clientX;

      const width = this.$el.offsetWidth;

      const xPosition = Math.min(
        Math.max(parseInt((width / 2 - x) * -1), -200),
        200,
      );

      const yPosition = Math.abs(xPosition);
      const progress = 1 - yPosition / 200;

      this.updateVideoPosition({
        x: xPosition,
        y: yPosition,
        progress,
      });
    },

    updateVideoPosition: throttle(function ({ x, y, progress }) {
      this.videoPosition = {
        x,
        y,
        progress,
      };
    }, 50),
  },
};
</script>

<style lang="scss">
.story-wrapper {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.9);
  z-index: 20;
  color: #fff;

  opacity: 0;
  pointer-events: none;
  transition: opacity ease 0.2s;

  &.visible {
    opacity: 1;
    pointer-events: auto;
  }

  &__video {
    width: 400px;
    height: 500px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0%);
  }

  .story-enter-active,
  .story-leave-active {
    transition: opacity 0.2s 0.1s, transform 0.3s 0.1s;
    transform: translate(-50%, 0%);
    opacity: 1;
  }
  .story-enter,
  .story-leave-to {
    opacity: 0;
    transform: translate(-50%, 50px);
  }
}
</style>
