<template>
  <div class="n-text-field" :class="{ 'n-text-field--active': isActive }">
    <span
      v-if="label"
      class="n-text-field-label"
      :class="{
        'n-text-field-label--active': isActive,
        'primary--text': isActive
      }"
    >
      {{ label }}
    </span>
    <v-text-field
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
    ></v-text-field>
  </div>
</template>

<script>
export default {
  name: 'RoundTextField',
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
    },
  },
};
</script>

<style scoped lang="sass">
  .n-text-field-label
    font-size: 12px
</style>
