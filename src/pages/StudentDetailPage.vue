<template>
  <div>
    {{ studentInfo.firstName }}
    <v-avatar> <img :src="studentInfo.avatarUrl" /> </v-avatar>
  </div>
</template>

<script>
export default {
  computed: {
    students() {
      return this.$store.state.students;
    },
    studentInfo() {
      return this.students.find(
        (student) => student.id === +this.$route.params.id
      );
    },
  },
};
</script>

<style></style>
