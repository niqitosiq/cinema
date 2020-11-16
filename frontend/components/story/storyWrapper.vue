<template>
  <div
    :class="['story-wrapper', { visible: isStoryActive }]"
    @mouseup="mouseup"
    @mousedown="mousedown"
    @mousemove="mousemove"
    @touchmove="mousemove"
    @touchstart="mousedown"
    @touchend="mouseup"
  >
    <div @click="close">Назад</div>
    <transition name="story">
      <div
        v-if="isStoryActive"
        :style="videoStyle"
        class="story-wrapper__animation"
        @click.prevent.stop
      >
        <div class="story-wrapper__video">
          <story-video
            ref="video"
            :url="story.videoUrl"
            @ended="$emit('next')"
          />
        </div>
        <div class="story-wrapper__mask">
          <component
            :is="maskComponent"
            :key="story.videoUrl"
            :meta="maskMeta"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import throttle from 'lodash/throttle';
/* masks */
import maskMessage from './masks/maskMessage';
import maskChooser from './masks/maskChooser';

export default {
  name: 'story-wrapper',

  components: {
    maskMessage,
    maskChooser,
  },

  props: {
    story: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      mouseClamped: false,
      mouseInitialPosition: null,
      videoPosition: {
        x: 0,
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
        transform: translate(${this.videoPosition.x}px, 0px);
        opacity: ${this.videoPosition.progress};
      `;
    },

    mask() {
      return this.story.mask || { meta: '{}' };
    },

    maskMeta() {
      return JSON.parse(this.mask.meta) || {};
    },

    maskComponent() {
      return {
        message: maskMessage,
        chooser: maskChooser,
      }[this.mask.type];
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

    mousedown(event) {
      this.mouseClamped = true;
      this.mouseInitialPosition =
        event.type === 'touchstart'
          ? event.changedTouches[0].clientX
          : event.clientX;
      console.log(this.mouseInitialPosition);
      console.log(event);
    },

    mouseup() {
      this.mouseClamped = false;

      if (this.videoPosition.x > 30) {
        this.$emit('prev');
      } else if (this.videoPosition.x < -30) {
        this.$emit('next');
      }

      this.updateVideoPosition({
        x: 0,
        progress: 1,
      });
    },

    mousemove(event) {
      if (!this.mouseClamped) {
        if (event.type !== 'touchmove') return;
      }

      const x =
        event.type === 'touchmove'
          ? event.changedTouches[0].clientX
          : event.clientX;

      const xPosition = Math.min(
        Math.max(parseInt((this.mouseInitialPosition - x) * -1), -200),
        200,
      );

      const progress = 1 - Math.abs(xPosition) / 200;

      this.updateVideoPosition({
        x: xPosition,
        progress,
      });
    },

    updateVideoPosition: throttle(function ({ x, progress }) {
      this.videoPosition = {
        x,
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

  background-color: rgba(0, 0, 0, 1);
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
    width: 100%;
    height: 100%;
    max-width: 400px;
    max-height: 900px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0%);
  }

  &__animation {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: transform linear 0.05s, opacity linear 0.05s;
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
