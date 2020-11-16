<template>
  <div class="index-page container">
    <div class="index-page__stories">
      <story-preview
        v-for="story in stories"
        :key="story.url"
        :thumb="story.thumb"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'index-page',

  async asyncData() {
    return {
      stories: [
        {
          thumb: 'thumbs/1.png',
          url:
            'http://s3.cinema-hack.rednite.ru/cinema/3415d79ab87951dd4d60df925b09ea61.mp4',
        },
        { thumb: 'thumbs/1.png', url: '2' },
        { thumb: 'thumbs/1.png', url: '3' },
        { thumb: 'thumbs/1.png', url: '4' },
        { thumb: 'thumbs/1.png', url: '5' },
        { thumb: 'thumbs/1.png', url: '6' },
        { thumb: 'thumbs/1.png', url: '7' },
      ],
    };
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
