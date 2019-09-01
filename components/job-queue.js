const JobQueue = {
  template: '#job-queue-template',
  data () {
    return {
      counter: 0
    };
  },
  watch: {
    programCounter (newVal) {
      if (this.isReadyQueueEmpty) {
        this.counter = newVal + 1;
      }
      if (newVal === this.counter) {
        this.ADD_PROCESS_FROM_JOB_QUEUE();
      }
    }
  }
};