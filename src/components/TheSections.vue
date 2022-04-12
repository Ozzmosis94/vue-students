<template>
  <v-data-table
    :headers="headers"
    :items="sections"
    v-bind="options"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Секции</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <app-dialog
          ref="appAddDialogRef"
          button-title="Добавить секцию"
          form-title="Добавить секцию"
          @click="onButtonDialogClick"
          @success="onSave"
          :disabled="!valid"
        >
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="add.name"
                  :rules="rules.name"
                  label="Введите название секции"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </app-dialog>
      </v-toolbar>
    </template>
  </v-data-table>
</template>

<script>
import AppDialog from "./AppDialog.vue";

export default {
  components: { AppDialog },
  data() {
    return {
      valid: true,
      options: {
        itemsPerPage: 5,
        footerProps: { "items-per-page-text": "Секций на странице" },
      },
      add: {
        name: "",
      },
      rules: {
        name: [(v) => !!v || "Заполните название секции"],
      },
      headers: [
        {
          text: "Название секции",
          align: "start",
          sortable: false,
          value: "name",
        },
      ],
    };
  },
  computed: {
    sections() {
      return this.$store.state.sections;
    },
  },
  methods: {
    onButtonDialogClick() {
      if (this.$refs.form) {
        this.$refs.form.reset();
      }
    },
    async onSave() {
      await this.$refs.form.validate();

      if (this.valid) {
        this.$store.dispatch("updateSections", { ...this.add, id: Date.now() });
        this.add = {
          name: "",
        };
        this.$refs.appAddDialogRef.$data.dialog = false;
      }
    },
  },
};
</script>

<style></style>
