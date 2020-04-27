<template>
  <div class="n-time-field" :class="{ 'n-time-field--active': isActive }">
    <span
      v-if="label"
      class="n-time-field-label"
      :class="{
        'n-time-field-label--active': isActive,
        'primary--text': isActive
      }"
    >
      {{ label }}
    </span>
    <v-menu
      v-model="menu"
      ref="menu"
      min-width="290px"
      transition="scale-transition"
      offset-y
      full-width
      :close-on-content-click="false"
      :nudge-right="40"
      :readonly="readonly || disabled"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-if="readonly || disabled"
          v-model="timestring"
          slot="activator"
          hide-details="auto"
          readonly
          outlined
          single-line
          dense
          :prepend-inner-icon="noicon == '' ? null : 'mdi-clock-outline'"
          :rules="rules"
          :label="placeholder"
          @focus="setFocus(true)"
          @blur="saveTextfield && setFocus(false)"
        ></v-text-field>
        <v-text-field
          v-else
          v-model="timestring"
          v-on="on"
          slot="activator"
          hide-details="auto"
          outlined
          single-line
          dense
          :prepend-inner-icon="noicon == '' ? null : 'mdi-clock-outline'"
          :rules="rules"
          :readonly="readonly || disabled"
          :required="required"
          :label="placeholder"
          @focus="setFocus(true)"
          @blur="saveTextfield && setFocus(false)"
        ></v-text-field>
      </template>
      <v-time-picker
        v-model="time"
        format="24hr"
        locale="de-de"
        full-width
        :readonly="readonly || disabled"
        @input="menu = false"
      ></v-time-picker>
    </v-menu>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'TimePickerField',
  props: [
    'value',
    'placeholder',
    'readonly',
    'disabled',
    'required',
    'rules',
    'noicon',
    'label',
  ],
  data: () => ({
    isActive: false,
    menu: false,
    modal: false,
    regex1: /^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/,
    timestring: '',
  }),
  computed: {
    time: {
      get() {
        if (this.value) {
          /* eslint-disable vue/no-side-effects-in-computed-properties */
          this.timestring = this.formatTime(this.value);
          return this.parseTime(this.value, 'HH:mm');
        }
        /* eslint-disable vue/no-side-effects-in-computed-properties */
        this.timestring = '';
        return this.value;
      },
      set(val) {
        if (val && typeof val === 'string' && this.regex1.test(val)) {
          this.$emit('input', this.parseTime(val, 'x'));
          this.$emit('change', 'changed');
        }
      },
    },
  },
  watch: {
    value(val) {
      this.time = moment(val, 'x').format('HH:mm');
      this.$emit('input', val);
      this.$emit('change', 'changed');
    },
  },
  methods: {
    setFocus(e) {
      this.isActive = e;
    },
    formatTime(time) {
      if (!time) return null;
      return moment(time, 'x').format('HH:mm');
    },
    parseTime(time, format) {
      if (!time) return null;

      const regex1 = /^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/;
      if (regex1.test(time)) {
        return moment(time, 'HH:mm').format(format);
      }
      const timeObject = moment(time, 'x');
      return timeObject.format(format);
    },
    saveTextfield() {
      const result = this.parseTime(this.timestring, 'HH:mm');
      this.date = result;
    },
  },
};
</script>

<style scoped lang="sass">
  .n-time-field-label
    font-size: 12px
</style>

<style lang="sass">
  .n-time-field
    .v-text-field.v-input--dense .v-input__prepend-inner .v-input__icon > .v-icon,
    .v-text-field.v-input--dense .v-input__append-inner .v-input__icon > .v-icon
      margin-top: 0
</style>