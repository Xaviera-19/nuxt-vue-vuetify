// Marquee.js
export const marqueeMixin = {
  data() {
    return {
      messages: ["跑馬燈咦咦咦咦咦咦", "跑馬燈餓餓餓餓餓餓餓餓", "跑馬燈姍姍姍姍姍姍姍姍"],
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
      }, 3000);
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
