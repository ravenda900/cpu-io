const JobQueue = {
  template: '#job-queue-template',
  data () {
    return {
      counter: 0
    };
  },
  watch: {
    programCounter (newVal) {
      if (newVal === this.counter) {
        this.ADD_PROCESS_FROM_JOB_QUEUE();
      }
    },
    finishedProcesses (newVal) {
      if (newVal.length > 0 && this.isReadyQueueEmpty) {
        this.counter = this.programCounter + 1;
      }
    }
  }
};