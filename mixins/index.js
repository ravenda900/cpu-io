Vue.mixin({
  computed: {
    ...Vuex.mapState([
      'jobQueueCount',
      'readyQueueCount',
      'ioCount',
      'jobQueueProcesses',
      'readyQueueProcesses',
      'programCounter',
      'cpuProcess',
      'ioProcesses',
      'finishedProcesses',
      'isSaved'
    ]),
    ...Vuex.mapGetters([
      'isReadyQueueEmpty',
      'isProcessingFinished'
    ])
  },
  methods: {
    ...Vuex.mapMutations([
      'RESET_FORM_INPUTS',
      'SAVE_FORM_INPUTS',
      'RESET_PROGRAM_COUNTER',
      'INCREMENT_PROGRAM_COUNTER',
      'ADD_PROCESS_FROM_READY_QUEUE',
      'ADD_PROCESS_FROM_CPU',
      'ADD_PROCESS_FROM_IO',
      'ADD_PROCESS_FROM_JOB_QUEUE',
      'ADD_FINISHED_PROCESS'
    ]),
    getFinishedCount (subProcesses) {
      return subProcesses.filter(subProcess => subProcess.isFinished).length > 0;
    }
  }
});