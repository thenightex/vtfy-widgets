<template>
  <div>
    <v-menu
      v-model="menu"
      ref="menu"
      min-width="290px"
      transition="scale-transition"
      offset-y
      full-width
      :attach="attach"
      :close-on-content-click="false"
      :nudge-right="40"
      :readonly="readonly || disabled"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-if="readonly || disabled"
          v-model="datestring"
          slot="activator"
          readonly
          :prepend-icon="noicon == '' ? null : 'mdi-calendar-blank-outline'"
          :required="required"
          :rules="rules"
          :label="placeholder"
          @blur="saveTextfield"
        ></v-text-field>
        <v-text-field
          v-else
          v-model="datestring"
          v-on="on"
          slot="activator"
          :prepend-icon="noicon == '' ? null : 'mdi-calendar-blank-outline'"
          :readonly="readonly || disabled"
          :required="required"
          :rules="rules"
          :label="placeholder"
          @blur="saveTextfield"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        locale="de-de"
        first-day-of-week="1"
        no-title
        scrollable
        :min="min"
        :max="max"
        :readonly="readonly || disabled"
        :allowed-dates="allowedDates"
        @input="menu = false"
      ></v-date-picker>
    </v-menu>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'DatePickerField',
  props: [
    'value',
    'placeholder',
    'readonly',
    'disabled',
    'required',
    'rules',
    'noicon',
    'min',
    'max',
    'allowedDates',
    'pickerDate',
    'attach',
  ],
  data: () => ({
    menu: false,
    modal: false,
    datestring: '',
  }),
  computed: {
    date: {
      get() {
        if (this.value) {
          /* eslint-disable vue/no-side-effects-in-computed-properties */
          this.datestring = this.formatDate(this.value);
          return this.parseDate(this.value, 'YYYY-MM-DD');
        }
        /* eslint-disable vue/no-side-effects-in-computed-properties */
        this.datestring = '';
        return this.value;
      },
      set(val) {
        this.$emit('input', this.parseDate(val, 'x'));
        this.$emit('change', 'changed');
      },
    },
  },
  watch: {
    value(val) {
      this.date = moment(val, 'x').format('YYYY-MM-DD');
      this.$emit('input', val);
      this.$emit('change', 'changed');
    },
  },
  methods: {
    formatDate(date) {
      const regex = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
      if (regex.test(date)) {
        return moment(date, 'YYYY-MM-DD').format('DD.MM.YYYY');
      }
      if (!date) return null;
      return moment(date, 'x').format('DD.MM.YYYY');
    },
    parseDate(date, format) {
      if (!date) return null;

      const regex1 = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
      if (regex1.test(date)) {
        return moment(date, 'YYYY-MM-DD').format(format);
      }
      const regex2 = /[0-9]{2}\.[0-9]{2}\.[0-9]{4}/;
      if (regex2.test(date)) {
        return moment(date, 'DD.MM.YYYY').format(format);
      }
      const regex3 = /[0-9]{2}\.[0-9]{2}\.[0-9]{2}/;
      if (regex3.test(date)) {
        return moment(date, 'DD.MM.YY').format(format);
      }
      const regex4 = /[0-9]{2}\.[0-9]{2}\./;
      if (regex4.test(date)) {
        return moment(date, 'DD.MM.').format(format);
      }
      const dateObject = moment(date, 'x');
      return dateObject.format(format);
    },
    saveTextfield() {
      const result = this.parseDate(this.datestring, 'YYYY-MM-DD');
      if (this.min && this.max) {
        const minDate = moment(this.min, 'YYYY-MM-DD').subtract(1, 'day').format('YYYY-MM-DD');
        const maxDate = moment(this.max, 'YYYY-MM-DD').add(1, 'day').format('YYYY-MM-DD');
        if (result <= maxDate && result >= minDate) {
          this.date = result;
        } else {
          this.date = null;
        }
      } else {
        this.date = result;
      }
    },
  },
};
</script>
