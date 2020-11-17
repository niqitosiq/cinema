<template>
  <div class="story-video" :style="position">
    <video :key="url" ref="video" :src="url" width="100%" height="100%" muted />
  </div>
</template>

<script>
export default {
  name: 'story-video',

  props: {
    url: {
      type: String,
      default: '',
    },

    position: {
      type: String,
      default: '',
    },
  },

  mounted() {
    const video = this.$refs.video;

    video.addEventListener('playing', () => {
      this.$emit('playing');
    });

    video.addEventListener('pause', () => {
      this.$emit('pause');
    });

    video.addEventListener('seeking', () => {
      this.$emit('seeking');
    });

    video.addEventListener('seeked', () => {
      this.$emit('seeked');
    });

    video.addEventListener('ended', () => {
      this.$emit('ended');
    });
  },

  methods: {
    async play() {
      const video = this.$refs.video;
      if (!video) {
        await this.$nextTick();
      }

      video.play();
    },

    async pause() {
      const video = this.$refs.video;
      if (!video) {
        await this.$nextTick();
      }

      video.pause();
    },
  },
};
</script>

<style lang="scss">
.story-video {
  width: 100%;
  height: 100%;
  background-color: #1e1e1e;
  position: relative;
}
</style>
