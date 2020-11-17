export default {
  props: {
    meta: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      active: false,
    };
  },

  watch: {
    meta: {
      handler() {
        this.active = false;
        const timing = this.meta.timestamp * 1000 || 300;
        setTimeout(() => {
          this.active = true;
          this.$emit('maskStarted', this.meta);
        }, timing);
      },
      deep: true,
      immediate: true,
    },
  },
};
