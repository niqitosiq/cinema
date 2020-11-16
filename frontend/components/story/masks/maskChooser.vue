<template>
  <div :class="['mask-chooser', { active }]">
    <div :class="['mask-chooser__question', { active: questionVisible }]">
      <div class="mask-chooser__text">
        {{ meta.text }}
      </div>

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
      {{ answerText }}
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
      }, 200);
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
  width: 300px;

  transform: translate(-50%, 20px);
  transition: opacity ease 0.01s, transform ease 0.01s;
  opacity: 0;

  &.active {
    transform: translate(-50%, -40px);
    opacity: 1;
    transition: opacity ease 0.3s 0.2s, transform ease 0.3s 0.2s;
  }

  &__text,
  &__option {
    background-color: #fff;
    border-radius: 5px;
    color: #000;
    margin-bottom: 8px;
    padding: 10px 20px;
  }

  &__text {
    font-size: 24px;
  }

  &__option {
    font-size: 20px;
    display: flex;
    align-items: center;
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

    &.active {
      transform: translate(0%, -0px);
      opacity: 1;
    }
  }

  &__answer {
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    border-radius: 5px;
    color: #000;
    padding: 10px 20px;
    transition: opacity ease 0.3s 0.3s, transform ease 0.3s 0.3s;
    transform: translate(0%, 20px);
    opacity: 0;

    &.active {
      transform: translate(0%, 0px);
      opacity: 1;
    }
  }
}
</style>
