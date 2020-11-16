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
  },

  methods: {
    async play() {
      await this.$nextTick();

      this.$refs.video.play();
    },

    async pause() {
      await this.$nextTick();

      this.$refs.video.pause();
    },
  },
};
</script>

<style lang="scss">
.story-video {
  width: 100%;
  height: 100%;
  background-color: #000;
  position: relative;
  transition: transform linear 0.05s, opacity linear 0.05s;
}
</style>
