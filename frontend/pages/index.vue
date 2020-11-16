<template>
  <div class="index-page container">
    <div class="index-page__stories">
      <story-preview
        v-for="story in stories"
        :key="story.videoUrl"
        :thumb="story.previewUrl"
        @open="setActiveStory(story)"
      />
    </div>
    <story-wrapper
      :story="activeStory"
      @close="closeStory"
      @next="nextStory"
      @prev="prevStory"
    />
  </div>
</template>

<script>
export default {
  name: 'index-page',

  async asyncData({ $api }) {
    const { data: stories } = await $api.stories.clips();

    return {
      activeStoryIndex: -1,
      activeStory: null,
      stories,
    };
  },

  watch: {
    activeStoryIndex() {
      if (this.activeStoryIndex === -1) {
        this.activeStory = null;
        return;
      }

      if (this.activeStoryIndex >= 0) {
        this.activeStory = this.stories[this.activeStoryIndex];
        return;
      }

      if (this.activeStoryIndex < this.stories.length) {
        this.activeStory = this.stories[this.activeStoryIndex];
        return;
      }

      this.activeStoryIndex = 0;
      this.activeStory = this.stories[0];
    },
  },

  methods: {
    setActiveStory(story) {
      const activeStoryIndex = this.stories.findIndex(s => s.url === story.url);

      this.activeStoryIndex = activeStoryIndex;
    },

    closeStory() {
      this.activeStoryIndex = -1;
    },

    nextStory() {
      this.activeStoryIndex++;
    },

    prevStory() {
      this.activeStoryIndex--;
    },
  },
};
</script>

<style lang="scss">
.index-page {
  &__stories {
    display: flex;
    overflow: auto;
  }
}
</style>
