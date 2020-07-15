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
      :append-icon="type === 'password' ? (showText ? 'mdi-eye' : 'mdi-eye-off') : ''"
      :type="computedType"
      :readonly="readonly"
      :disabled="disabled"
      :rules="rules"
      @focus="setFocus(true)"
      @blur="setFocus(false)"
      @click:append="showText = !showText"
      @click="$emit('click', $event)"
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
    'type',
  ],
  data() {
    return {
      isActive: false,
      showText: false,
    };
  },
  computed: {
    computedType() {
      if (this.type && this.type !== '') {
        if (this.type === 'password') {
          return this.showText ? 'text' : 'password';
        }
        return this.type;
      }
      return 'text';
    },
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
  .n-text-field-label
    font-size: 12px
</style>

<style lang="sass">
  .n-text-field
    legend
      width: 0
</style>
