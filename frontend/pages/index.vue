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
          mask: {
            type: 'message',
            meta: JSON.stringify({
              text: 'Когда тебе говорят, что ты красивый',
              x: 30,
              y: 200,
            }),
          },
        },
        {
          thumb: 'thumbs/1.png',
          url:
            'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          mask: {
            type: 'chooser',
            meta: JSON.stringify({
              text: 'Когда тебе говорят, что ты не красивый',
              options: [
                { name: 'Викинг' },
                { name: 'Викинг1' },
                { name: 'Викинг2' },
                { name: 'Викинг3' },
              ],
              answer: { name: 'Викинг2' },
            }),
          },
        },
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
