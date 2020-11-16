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
        setTimeout(() => {
          this.active = true;
        }, 300);
      },
      deep: true,
      immediate: true,
    },
  },
};
