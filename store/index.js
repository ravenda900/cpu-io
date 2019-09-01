const store = new Vuex.Store({
  strict: true,
  state: {
    jobQueueCount: 0,
    readyQueueCount: 0,
    ioCount: 0,
    isSaved: false,
    jobQueueProcesses: [],
    readyQueueProcesses: [],
    programCounter: 0,
    cpuProcess: null,
    ioProcesses: [],
    finishedProcesses: [],
    readyQueueProcessesLoaded: 0
  },
  getters: {
    isReadyQueueEmpty (state) {
      return state.readyQueueCount === state.readyQueueProcessesLoaded;
    },
    isProcessingFinished (state) {
      return state.jobQueueCount + state.readyQueueCount === state.finishedProcesses.length;
    }
  },
  mutations: {
    RESET_FORM_INPUTS (state) {
      state.jobQueueCount = 0;
      state.readyQueueCount = 0;
      state.ioCount = 0;
      state.isSaved = false;
      state.jobQueueProcesses = [];
      state.readyQueueProcesses = [];
      state.programCounter = 0;
      state.cpuProcess = null,
      state.ioProcesses = [];
      state.finishedProcesses = [];
    },
    SAVE_FORM_INPUTS (state, payload) {
      const { jobQueueCount, readyQueueCount, ioCount } = payload;
      state.jobQueueCount = parseInt(jobQueueCount);
      state.readyQueueCount = parseInt(readyQueueCount);
      state.ioCount = parseInt(ioCount);

      for (let i = 0 ; i < state.jobQueueCount ; i++) {
        let index = state.readyQueueCount + i + 1;
        let process = {
          index: index,
          processName: `P${index}`
        };
        let subProcesses = [];

        for (let j = 0 ; j < 2 ; j++) {
          subProcesses.push({
            cpu: Helpers.getRandomInt(1, 9),
            io: {
              index: Helpers.getRandomInt(1, ioCount),
              counter: Helpers.getRandomInt(1, 9)
            },
            isFinished: false
          });
        }
        process.subProcesses = subProcesses;

        state.jobQueueProcesses.push(process);
      }

      for (let i = 0 ; i < state.readyQueueCount ; i++) {
        let index = i + 1;
        let process = {
          index: index,
          processName: `P${index}`
        };
        let subProcesses = [];

        for (let j = 0 ; j < 2 ; j++) {
          subProcesses.push({
            cpu: Helpers.getRandomInt(1, 9),
            io: {
              index: Helpers.getRandomInt(1, ioCount),
              counter: Helpers.getRandomInt(1, 9)
            },
            isFinished: false
          });
        }
        process.subProcesses = subProcesses;

        state.readyQueueProcesses.push(process);
      }

      for (let i = 0 ; i < state.ioCount ; i++) {
        let io = {
          ioName: `I/O${i + 1}`,
          process: null
        };

        state.ioProcesses.push(io);
      }

      state.isSaved = true;
    },
    RESET_PROGRAM_COUNTER (state) {
      state.programCounter = 0;
    },
    INCREMENT_PROGRAM_COUNTER (state)  {
      state.programCounter++;
    },
    ADD_PROCESS_FROM_READY_QUEUE (state) {
      if (state.readyQueueProcesses.length > 0) {
        const process = state.readyQueueProcesses.shift();

        state.cpuProcess = process;
      } else {
        state.cpuProcess = null;
      }
    },
    ADD_PROCESS_FROM_CPU (state, index) {
      state.ioProcesses[index].process = state.cpuProcess;
    },
    ADD_PROCESS_FROM_IO (state, value) {
      const firstSubProcess = value.subProcesses[0];

      firstSubProcess.isFinished = true;
      state.ioProcesses[firstSubProcess.io.index - 1].process = null;
      state.readyQueueProcesses.push(value);
      state.readyQueueProcessesLoaded++;
    },
    ADD_PROCESS_FROM_JOB_QUEUE (state, value) {
      while (state.jobQueueProcesses.length > 0 && state.readyQueueProcesses.length < state.readyQueueCount) {
        let process = state.jobQueueProcesses.shift();

        state.readyQueueProcesses.push(process);
      }
    },
    ADD_FINISHED_PROCESS (state, value) {
      const secondSubProcess = value.subProcesses[1];

      state.ioProcesses[secondSubProcess.io.index - 1].process = null;
      state.finishedProcesses.push(value);
    }
  }
});