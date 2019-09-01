const FormInput = {
  template: '#form-template',
  components: {
    'validation-provider': VeeValidate.ValidationProvider,
    'validation-observer': VeeValidate.ValidationObserver
  },
  data () {
    return {
      form: {
        readyQueueCount: null,
        jobQueueCount: null,
        ioCount: null
      },
      show: true
    }
  },
  watch: {
    isSaved (newVal) {
      console.log('newVal', newVal);
    }
  },
  methods: {
    async onSubmit (e) {
      e.preventDefault();

      const isValid = await this.$refs.observer.validate();

      if (isValid) {
        this.SAVE_FORM_INPUTS(this.form);
      }
    },
    onReset (e) {
      e.preventDefault();

      this.form.readyQueueCount = null;
      this.form.jobQueueCount = null;
      this.form.ioCount = null;
      this.$refs.observer.reset();
    }
  }
};