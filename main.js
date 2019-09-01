VeeValidate.setInteractionMode('eager');

new Vue({
  el: '#app',
  components: {
    'form-input': FormInput,
    'cpu-io': CPU_IO
  },
  store
});