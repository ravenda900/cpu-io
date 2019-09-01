const CPU_IO = {
  template: '#cpu-io-template',
  components: {
    'ready-queue': ReadyQueue,
    'job-queue': JobQueue,
    'cpu': CPU,
    'io': IO,
    'program-counter': ProgramCounter,
    'finished-process': FinishedProcess
  },
  data () {
    return {
      playState: 0,
      playMethod: 1,
      interval: null
    };
  },
  computed: {
    playMethodOptions () {
      return [
        { text: 'Manual', value: 1 },
        { text: 'Automatic', value: 0 }
      ];
    },
    isManual () {
      return this.playMethod === 1;
    },
    isAutomatic () {
      return this.playMethod === 0;
    },
    isPlaying () {
      return this.playState === 1;
    },
    isPaused () {
      return this.playState === -1;
    },
    isStopped () {
      return this.playState === 0;
    }
  },
  watch: {
    isProcessingFinished (newVal) {
      if (newVal) {
        this.pause();
      }
    },
    isManual (newVal) {
      if (newVal && this.isPlaying) {
        this.pause();
      }
    }
  },
  methods: {
    play () {
      this.playState = 1;
      this.interval = setInterval(() => {
        this.INCREMENT_PROGRAM_COUNTER();
      }, 1000);
    },
    pause () {
      this.playState = -1;
      clearInterval(this.interval);
    },
    stop () {
      this.playState = 0;
      clearInterval(this.interval);
      this.RESET_FORM_INPUTS();
    }
  }
};