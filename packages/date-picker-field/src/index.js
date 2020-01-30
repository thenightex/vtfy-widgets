import DatePickerField from './DatePickerField.vue'

function Install (Vue) {
  Vue.component('n-date-picker-field', DatePickerField);
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Install)
}

export default Install
