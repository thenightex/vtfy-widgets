<template>
  <div class="n-date-field" :class="{ 'n-date-field--active': isActive }">
    <span
      v-if="label"
      ref="label"
      class="n-date-field-label"
      :class="{
        'n-date-field-label--active': isActive,
        'primary--text': isActive
      }"
    >
      {{ label }}
    </span>
    <v-text-field
      v-if="readonly || disabled"
      v-model="datestring"
      hide-details="auto"
      type="date"
      readonly
      outlined
      single-line
      dense
      :rules="rules"
      :label="placeholder"
      @focus="setFocus(true)"
      @blur="setFocus(false)"
      @click="$emit('click', $event)"
    ></v-text-field>
    <v-text-field
      v-else
      v-model="datestring"
      hide-details="auto"
      type="date"
      outlined
      single-line
      dense
      :rules="rules"
      :label="placeholder"
      @focus="setFocus(true)"
      @keydown.enter="saveTextfield"
      @keydown.tab="saveTextfield"
      @blur="blur"
      @click="$emit('click', $event)"
    ></v-text-field>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'RoundDateField',
  props: [
    'value',
    'placeholder',
    'readonly',
    'disabled',
    'rules',
    'min',
    'max',
    'allowedDates',
    'pickerDate',
    'label',
    'outputFormat',
  ],
  data: () => ({
    isActive: false,
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
        if (this.outputFormat) {
          this.$emit('input', this.parseDate(val, this.outputFormat));
        } else {
          this.$emit('input', this.parseDate(val, 'x'));
        }
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
    setFocus(e) {
      this.isActive = e;
      this.$emit('focus', e);
    },
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
      if (dateObject.isValid()) {
        return dateObject.format(format);
      }
      return null;
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
    blur() {
      this.saveTextfield();
      this.setFocus(false);
    },
  },
};
</script>

<style scoped lang="sass">
  .n-date-field-label
    font-size: 12px
</style>

<style lang="sass">
  .n-date-field
    legend
      width: 0
    .v-text-field.v-input--dense .v-input__prepend-inner .v-input__icon > .v-icon,
    .v-text-field.v-input--dense .v-input__append-inner .v-input__icon > .v-icon
      margin-top: 0
</style>
