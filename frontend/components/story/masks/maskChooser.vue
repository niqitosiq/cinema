<template>
  <div :class="['mask-chooser', { active, answerVisible }]">
    <div :class="['mask-chooser__question', { active: questionVisible }]">
      <div class="mask-chooser__text" v-html="meta.text"></div>
      <div class="mask-chooser__description" v-html="meta.description"></div>

      <div class="mask-chooser__options">
        <div
          v-for="(option, index) in meta.options"
          :key="option.name"
          class="mask-chooser__option"
          @click="choose(index)"
        >
          <div
            :class="['mask-chooser__radio', { active: index === activeChoose }]"
          ></div>
          {{ option.name }}
        </div>
      </div>
    </div>

    <div :class="['mask-chooser__answer', { active: answerVisible }]">
      <span v-html="answerText" />
    </div>

    <div :class="['mask-chooser__effects', { active: answerVisible }]">
      <img src="/emoji/backsuccess.png" alt="" />
      <img src="/emoji/frontsuccess.png" alt="" />
    </div>
  </div>
</template>

<script>
import maskMixin from './maskMixin';

export default {
  name: 'mask-chooser',

  mixins: [maskMixin],

  data() {
    return {
      activeChoose: null,
      answerVisible: false,
      questionVisible: true,
    };
  },

  computed: {
    answerText() {
      if (
        this.meta.options[this.activeChoose]?.name === this.meta.answer.name
      ) {
        return `Ура, ты попал!`;
      }
      return `Не попал! Правилный ответ: ${this.meta.answer.name}`;
    },
  },

  methods: {
    choose(index) {
      this.activeChoose = index;
      setTimeout(() => {
        this.answerVisible = true;
        this.questionVisible = false;

        this.$emit('maskEnded');
      }, 200);
      setTimeout(() => {
        this.active = false;
      }, 3000);
    },
  },
};
</script>

<style lang="scss">
.mask-chooser {
  position: absolute;
  z-index: 20;
  bottom: 0px;
  left: 50%;
  max-width: 350px;
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  padding: 26px 20px 20px;
  max-height: 100%;

  transform: translate(-50%, 20px);
  transition: opacity ease 0.01s, transform ease 0.01s, max-height ease 0.4s;
  opacity: 0;

  &.active {
    transform: translate(-50%, -40px);
    opacity: 1;
    transition: opacity ease 0.3s 0.2s, transform ease 0.3s 0.2s,
      max-height ease 0.4s;
  }

  &.answerVisible {
    max-height: 200px;
  }

  &__text,
  &__option,
  &__description {
    color: #1e1e1e;
    margin-bottom: 8px;
  }

  &__text {
    font-size: 24px;
  }

  &__description {
    font-size: 16px;
  }

  &__option {
    font-size: 16px;
    display: flex;
    align-items: center;
    background-color: #f4f4f4;
    padding: 10px 20px;
    border-radius: 50px;
  }

  &__radio {
    width: 20px;
    height: 20px;
    border-radius: 100%;
    border: solid 1px #20bec7;
    margin-right: 10px;
    position: relative;
    &:after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      border-radius: 100%;
      opacity: 0;
      transform: scale(0.5);
      background-color: #20bec7;
      transition: opacity ease 0.1s, transform ease 0.3s;
    }
    &.active:after {
      opacity: 1;
      transform: scale(0.7);
    }
  }

  &__question {
    transform: translate(0%, 20px);
    transition: opacity ease 0.3s, transform ease 0.3s;
    opacity: 0;
    pointer-events: none;
    z-index: 25;
    position: relative;

    &.active {
      transform: translate(0%, -0px);
      opacity: 1;
      pointer-events: auto;
    }
  }

  &__answer {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    bottom: 0;
    width: 100%;
    left: 0px;
    max-width: 350px;
    height: 200px;
    color: #1e1e1e;
    pointer-events: none;
    z-index: 20;
    background-color: #fff;
    border-radius: 5px;
    span {
      font-size: 20px;
      transition: opacity ease 0.3s 0.3s, transform ease 0.3s 0.3s;
      transform: translate(0%, 20px);
      opacity: 0;
    }
    &.active span {
      transform: translate(0%, 0px);
      opacity: 1;
      pointer-events: auto;
    }
  }

  &__effects {
    position: absolute;
    top: 0px;
    width: 100%;
    img {
      position: absolute;
      opacity: 0;
      pointer-events: none;
      &:nth-child(1) {
        transition: opacity ease 0.3s 0.3s, transform ease 0.3s 0.3s;
        left: 0px;
        top: -75px;
        transform: translateY(50px);
        z-index: 18;
      }
      &:nth-child(2) {
        transition: opacity ease 0.5s 0.4s, transform ease 0.5s 0.4s;
        right: 20px;
        top: -130px;
        transform: translateY(50px);
        z-index: 24;
      }
    }
    &.active {
      img {
        transform: translateY(0px);
        opacity: 1;
      }
    }
  }
}
</style>
