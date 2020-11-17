<template>
  <div :class="['story-preview', { status }]" @click="$emit('open')">
    <div class="story-preview__thumb">
      <img :src="thumb" alt="" />
    </div>
    <div class="story-preview__circle"></div>
    <div class="story-preview__description">
      {{ description }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'story-preview',

  props: {
    thumb: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss">
.story-preview {
  width: 85px;
  height: calc(93px + 1em);
  padding-bottom: calc(10px + 1em);
  padding-top: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &__thumb {
    width: 85px;
    height: 85px;
    border-radius: 100%;
    overflow: hidden;
    position: relative;
    z-index: 3;
    transform: scale(0.82);
    transition: transform ease 0.3s;
    img {
      width: 100%;
      height: 100%;
    }
  }

  &__circle {
    position: absolute;
    width: 85px;
    height: 85px;
    border-radius: 100%;
    border: solid 1px #20bec7;
    z-index: 2;
    transition: transform ease 0.3s, opacity ease 0.3s 0.1s;
  }

  &__description {
    position: absolute;
    bottom: 0px;
    font-size: 1em;
    color: #fff;
  }

  &:hover {
    .story-preview {
      &__thumb {
        transform: scale(1);
      }

      &__circle {
        transform: scale(0.7);
        opacity: 0;
      }
    }
  }

  & + & {
    margin-left: 10px;
  }
}
</style>
