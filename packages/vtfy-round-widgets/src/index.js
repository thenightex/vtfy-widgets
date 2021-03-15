import RoundDatePickerField from './RoundDatePickerField.vue';
import RoundTimePickerField from './RoundTimePickerField.vue';
import RoundDateField from './RoundDateField.vue';
import RoundTimeField from './RoundTimeField.vue';
import RoundSelect from './RoundSelect.vue';
import RoundTextArea from './RoundTextArea.vue';
import RoundTextField from './RoundTextField.vue';

function Install(Vue) {
  Vue.component('n-date-field', RoundDatePickerField);
  Vue.component('n-time-field', RoundTimePickerField);
  Vue.component('n-date', RoundDateField);
  Vue.component('n-time', RoundTimeField);
  Vue.component('n-select', RoundSelect);
  Vue.component('n-text-area', RoundTextArea);
  Vue.component('n-text-field', RoundTextField);
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Install);
}

export default Install;
