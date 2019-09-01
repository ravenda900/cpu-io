const ReadyQueue = {
  template: '#ready-queue-template',
  data () {
    return {
      counter: 0,
    };
  },
  computed: {
    sortedReadyQueueProcess () {
      return this.readyQueueProcesses.sort((a, b) => {
        return a.index - b.index;
      });
    }
  }
};