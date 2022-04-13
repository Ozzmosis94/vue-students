<template>
  <v-app-bar app color="white">
    <v-toolbar-title>Vue & Vuetify & Router & Vuex</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn
      v-for="item in menuItems"
      link
      exact
      :key="item.title"
      :to="{ name: item.pathName }"
      class="ml-4"
      >{{ item.title }}
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      sidebar: false,
      appTitle: "Awesome App",
      menuItems: [
        { title: "Студенты", pathName: "StudentsPage" },
        { title: "Секции", pathName: "SectionsPage" },
      ],
    };
  },
};
</script>

<style>
</style>