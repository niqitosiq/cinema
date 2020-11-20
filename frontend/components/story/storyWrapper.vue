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
    <div class="story-wrapper__back" @click="close">&lt; Назад</div>

    <div class="story-wrapper__pagination">
      <ui-pagination :stories="stories" :active="story" />
    </div>

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
            :key="story.id"
            :meta="maskMeta"
            @maskStarted="maskStarted"
            @maskEnded="play"
          />
        </div>

        <div class="story-wrapper__nav">
          <ui-button type="primary" @click="openCinema(story.linkedCinema)">
            Открыть фильм
          </ui-button>

          <div class="story-wrapper__icons">
            <div
              v-for="nav in navigation"
              :key="nav.icon"
              class="story-wrapper__icon"
            >
              <svg-icon :name="nav.icon" />
              <div class="story-wrapper__icon-counter">
                {{ story[nav.path] }}
              </div>
            </div>
          </div>
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

    stories: {
      type: Array,
      default: () => [],
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
      navigation: [
        { icon: 'like', path: 'likeCounter' },
        { icon: 'share', path: 'viewCounter' },
        { icon: 'star', path: 'viewCounter' },
      ],
    };
  },

  computed: {
    isStoryActive() {
      return this.story !== null && this.story !== undefined;
    },

    videoStyle() {
      return `
        transform: translate(calc(-50% + ${this.videoPosition.x}px), 0px);
        opacity: ${this.videoPosition.progress};
      `;
    },

    mask() {
      return this.story.mask || { meta: '{}' };
    },

    maskMeta() {
      return this.mask.meta || {};
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
      async handler() {
        await this.$nextTick();

        this.play();
      },
    },
  },

  methods: {
    play() {
      this.$refs.video.play();
    },

    pause() {
      this.$refs.video.pause();
    },

    close() {
      this.$emit('close');
    },

    maskStarted({ timestamp }) {
      if (timestamp) this.pause();
    },

    mousedown(event) {
      this.mouseClamped = true;
      this.mouseInitialPosition =
        event.type === 'touchstart'
          ? event.changedTouches[0].clientX
          : event.clientX;
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

    openCinema(link) {
      window.open(link, '_blank');
    },
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
    max-width: 400px;
    max-height: 900px;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0%);
    transition: transform linear 0s, opacity linear 0.1s;
  }

  &__back {
    position: absolute;
    left: 50%;
    top: 0px;
    transform: translateX(-200px);
    z-index: 40;

    @media screen and (max-width: 400px) {
      transform: none;
      left: 0;
    }
  }

  &__nav {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    a {
      width: 100%;
      text-align: center;
    }

    .ui-button {
      width: calc(100% - 50px);
    }
  }

  &__icons {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  &__icon {
    svg {
      width: 32px;
      height: 32px;
    }

    &-counter {
      font-size: 12px;
      text-align: center;
    }

    & + & {
      margin-left: 33px;
    }
  }

  &__pagination {
    position: absolute;
    left: 50%;
    top: 30px;
    transform: translateX(-50%);
    z-index: 40;
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
