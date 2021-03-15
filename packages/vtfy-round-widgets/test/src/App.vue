<template>
  <v-app>
    <v-container fluid>
      <n-text-area v-model="model.area" label="area" outlined></n-text-area>
      <n-text-field v-model="model.password" label="password" outlined type="password"></n-text-field>
      <n-text-field v-model="model.text" label="text" outlined></n-text-field>
      <n-text-field v-model="model.number" label="number" outlined type="number"></n-text-field>

      <n-date-field
        v-model="model.date"
        attach
        label="date"
        outlined
        output-format="YYYY-MM-DD"
      ></n-date-field>

      <n-time-field
        v-model="model.time"
        attach
        label="time"
        outlined
        output-format="HH:mm"
      ></n-time-field>

      <n-date
        v-model="model.date"
        label="date"
        outlined
      ></n-date>

      <n-time
        v-model="model.time"
        label="time"
        outlined
      ></n-time>

      <n-select v-model="model.select" attach label="select" outlined :items="['a','b','c','d']"></n-select>
      <pre>{{ JSON.stringify(model) }}</pre>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      visible: false,
      model: {
        area: null,
        password: null,
        text: null,
        number: null,
        date: null,
        time: null,
        select: null,
      },
    };
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
