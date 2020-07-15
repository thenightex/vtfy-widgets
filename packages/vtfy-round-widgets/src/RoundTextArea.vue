<template>
  <div class="n-text-area" :class="{ 'n-text-area--active': isActive }">
    <span
      v-if="label"
      class="n-text-area-label"
      :class="{
        'n-text-area-label--active': isActive,
        'primary--text': isActive
      }"
    >
      {{ label }}
    </span>
    <v-textarea
      v-bind:value="value"
      v-on:input="$emit('input', $event)"
      hide-details="auto"
      outlined
      single-line
      dense
      :readonly="readonly"
      :disabled="disabled"
      :rules="rules"
      @focus="setFocus(true)"
      @blur="setFocus(false)"
      @click="$emit('click', $event)"
    ></v-textarea>
  </div>
</template>

<script>
export default {
  name: 'RoundTextArea',
  props: [
    'value',
    'label',
    'readonly',
    'disabled',
    'rules',
  ],
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    setFocus(e) {
      this.isActive = e;
      this.$emit('focus', e);
    },
  },
};
</script>

<style scoped lang="sass">
  .n-text-area-label
    font-size: 12px
  .n-text-area
    .v-input__slot
      padding: 0 20px
</style>

<style lang="sass">
  .n-text-area
    legend
      width: 0
    .v-text-field
      .v-text-field--enclosed:not(.v-text-field--rounded) > .v-input__control > .v-input__slot
        padding: 0 13px
</style>
