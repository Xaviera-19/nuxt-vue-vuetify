// Marquee.js
export const marqueeMixin = {
  data() {
    return {
      messages: ["Message 1", "Message 2", "Message 3"],
      currentMessageIndex: 0,
      intervalId: null,
    };
  },
  computed: {
    currentMessage() {
      return this.messages[this.currentMessageIndex];
    },
  },
  methods: {
    startMarquee() {
      this.intervalId = setInterval(() => {
        this.currentMessageIndex = (this.currentMessageIndex + 1) % this.messages.length;
      }, 2000);
    },
    stopMarquee() {
      clearInterval(this.intervalId);
    },
  },
  mounted() {
    this.startMarquee();
  },
  beforeDestroy() {
    this.stopMarquee();
  },
};
