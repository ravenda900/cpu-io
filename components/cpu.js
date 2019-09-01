const CPU = {
  template: '#cpu-template',
  data () {
    return {
      counter: 0
    };
  },
  computed: {
    currentSubProcess () {
      if (this.cpuProcess !== null) {
        return this.cpuProcess.subProcesses.find(subProcess => !subProcess.isFinished);
      }
      return null;
    },
    index () {
      if (this.currentSubProcess !== null) {
        return this.currentSubProcess.io.index - 1;
      }
      return -1;
    },
    ioProcess () {
      if (this.currentSubProcess !== null) {
        return this.ioProcesses[this.index];
      }
      return null;
    }
  },
  watch: {
    programCounter (newVal) {
      if (this.currentSubProcess !== null) {
        if (newVal === this.counter + this.currentSubProcess.cpu && this.ioProcess.process === null) {
          this.ADD_PROCESS_FROM_CPU(this.index);
          this.ADD_PROCESS_FROM_READY_QUEUE();
        } else if (newVal === this.counter + this.currentSubProcess.cpu && this.ioProcess.process !== null) {
          this.counter = newVal;
        }
      } else {
        this.ADD_PROCESS_FROM_READY_QUEUE();
      }
    },
    cpuProcess (newVal) {
      if (newVal !== null) {
        this.counter = this.programCounter;
      }
    }
  }
};