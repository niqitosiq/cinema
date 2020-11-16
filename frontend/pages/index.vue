<template>
  <div class="index-page container">
    <div class="index-page__stories">
      <story-preview
        v-for="story in stories"
        :key="story.url"
        :thumb="story.thumb"
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

  async asyncData() {
    return {
      activeStoryIndex: -1,
      stories: [
        {
          thumb: 'thumbs/1.png',
          url:
            'http://s3.cinema-hack.rednite.ru/cinema/3415d79ab87951dd4d60df925b09ea61.mp4',
        },
        {
          thumb: 'thumbs/1.png',
          url:
            'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        },
        { thumb: 'thumbs/1.png', url: '3.mp4' },
        { thumb: 'thumbs/1.png', url: '4.mp4' },
        { thumb: 'thumbs/1.png', url: '5.mp4' },
        { thumb: 'thumbs/1.png', url: '6.mp4' },
        { thumb: 'thumbs/1.png', url: '7.mp4' },
      ],
    };
  },

  computed: {
    activeStory() {
      if (this.activeStoryIndex === -1) {
        return null;
      }

      if (this.activeStoryIndex >= 0) {
        return this.stories[this.activeStoryIndex];
      }

      if (this.activeStoryIndex < this.stories.length) {
        return this.stories[this.activeStoryIndex];
      }

      return this.stories[0];
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
