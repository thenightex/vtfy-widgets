<template>
  <div class="n-select" :class="{ 'n-select--active': isActive }">
    <span
      v-if="label"
      class="n-select-label"
      :class="{
        'n-select-label--active': isActive,
        'primary--text': isActive
      }"
    >
      {{ label }}
    </span>
    <v-select
      v-bind:value="value"
      v-on:input="$emit('input', $event)"
      hide-details="auto"
      outlined
      single-line
      dense
      :items="items"
      :clearable="clearable"
      :readonly="readonly"
      :disabled="disabled"
      :rules="rules"
      :item-text="itemText"
      :item-value="itemValue"
      :menu-props="menuProps"
      :attach="attach"
      @focus="setFocus(true)"
      @blur="setFocus(false)"
    ></v-select>
  </div>
</template>

<script>
export default {
  name: 'RoundSelect',
  props: [
    'value',
    'label',
    'items',
    'clearable',
    'readonly',
    'disabled',
    'rules',
    'itemText',
    'itemValue',
    'menuProps',
    'attach',
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
  .n-select-label
    font-size: 12px
</style>

<style lang="sass">
  .n-select
    legend
      width: 0
    .v-text-field.v-input--dense .v-input__prepend-inner .v-input__icon > .v-icon,
    .v-text-field.v-input--dense .v-input__append-inner .v-input__icon > .v-icon
      margin-top: 0
</style>
