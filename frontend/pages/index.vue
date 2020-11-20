<template>
  <div class="index-page container">
    <h3>Истории с фильмами</h3>
    <div class="index-page__stories">
      <story-preview
        v-for="story in stories"
        :key="story.id"
        :thumb="story.previewUrl"
        :description="story.desc"
        @open="setActiveStory(story)"
      />
    </div>
    <story-wrapper
      :story="activeStory"
      :stories="stories"
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
      if (this.activeStoryIndex >= 0) {
        this.activeStory = this.stories[this.activeStoryIndex];
        return;
      }

      if (this.activeStoryIndex < this.stories.length) {
        this.activeStory = this.stories[this.activeStoryIndex];
        return;
      }

      this.activeStoryIndex = -1;
      this.activeStory = null;
    },
  },

  methods: {
    setActiveStory(story) {
      const activeStoryIndex = this.stories.findIndex(s => s.id === story.id);

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
  h3 {
    color: #fff;
    font-size: 28px;
  }

  &__stories {
    display: flex;
    overflow: auto;
    font-size: 12px;
  }

  &.container {
    @media screen and (max-width: 720px) {
      padding: 20px 10px;
    }
  }
}
</style>
