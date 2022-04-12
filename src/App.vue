<template>
  <v-app>
    <v-app-bar app color="yellow">
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

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      sidebar: false,
      appTitle: "Awesome App",
      menuItems: [
        { title: "Home", pathName: "Home", icon: "home" },
        { title: "Студенты", pathName: "StudentsPage", icon: "face" },
        { title: "Секции", pathName: "SectionsPage", icon: "lock_open" },
      ],
    };
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
