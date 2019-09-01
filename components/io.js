const IO = {
  template: '#io-template',
  props: {
    ioProcess: Object,
    index: Number
  },
  data () {
    return {
      counter: 0
    };
  },
  computed: {
    currentSubProcess () {
      if (this.ioProcess.process !== null) {
        return this.ioProcess.process.subProcesses.find(subProcess => !subProcess.isFinished);
      }
      return null;
    },
    hasFinishedProcess () {
      if (this.ioProcess.process !== null) {
        return this.ioProcess.process.subProcesses.filter(subProcess => subProcess.isFinished).length > 0;
      }
      return false;
    }
  },
  watch: {
    programCounter (newVal) {
      if (this.currentSubProcess !== null) {
        if (newVal === this.counter + this.currentSubProcess.io.counter) {
          if (this.hasFinishedProcess) {
            this.ADD_FINISHED_PROCESS(this.ioProcess.process);
          } else {
            this.ADD_PROCESS_FROM_IO(this.ioProcess.process);
          }
        }
      }
    },
    'ioProcess.process' (newVal) {
      if (newVal === null) {
        this.counter = 0;
      } else {
        this.counter = this.programCounter;
      }
    }
  }
};