<template>
  <v-data-table
    :headers="tableHeaders"
    :items="students"
    v-bind="tableOptions"
    @click:row="rowClick"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Студенты</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <app-dialog
          ref="appAddDialogRef"
          button-title="Добавить студента"
          :form-title="dialogFormTitle"
          :success-text="dialogFormSuccessTitle"
          @click="onButtonDialogClick"
          @success="onSave"
          :disabled="!valid"
        >
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="add.firstName"
                  :rules="rules.firstName"
                  label="Введите имя студента"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="add.lastName"
                  :rules="rules.lastName"
                  label="Введите фамилию студента"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="add.middleName"
                  label="Введите отчество студента"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="add.sections"
                  :items="sections"
                  item-text="name"
                  label="Секции"
                  multiple
                  return-object
                  hint="Выберите секции"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-file-input
                  v-model="add.avatar"
                  accept="image/*"
                  label="Загрузите фотографию"
                ></v-file-input>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="add.birthdayDate"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="add.birthdayDate"
                      :rules="rules.birthdayDate"
                      label="Дата родждения"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      required
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="add.birthdayDate"
                    locale="ru-RU"
                    first-day-of-week="1"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">
                      Отмена
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu.save(add.birthdayDate)"
                    >
                      ОК
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-form>
        </app-dialog>
        <app-dialog
          ref="appRemoveDialogRef"
          form-title="Вы действительно хотите удалить студента?"
          success-text="Удалить"
          @success="onDelete"
        />
      </v-toolbar>
    </template>

    <template v-slot:[`item.fullName`]="{ item }">
      {{ getFullName(item) }}
    </template>
    <template v-slot:[`item.birthdayDate`]="{ item }">
      {{ getBirthdayDate(item) }}
    </template>
    <template v-slot:[`item.sections`]="{ item }">
      {{ getSections(item.sections) }}
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click.stop="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click.stop="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data> Нет студентов </template>
  </v-data-table>
</template>

<script>
import AppDialog from "./AppDialog.vue";

export default {
  components: {
    AppDialog,
  },
  data() {
    return {
      menu: false,
      valid: true,
      pickedStudent: null,
      tableOptions: {
        itemsPerPage: 5,
        footerProps: { "items-per-page-text": "Студентов на странице" },
      },
      add: {
        firstName: "",
        lastName: "",
        middleName: "",
        avatar: null,
        birthdayDate: null,
        sections: [],
      },
      rules: {
        firstName: [(v) => !!v || "Заполните имя"],
        lastName: [(v) => !!v || "Заполните фамилию"],
        birthdayDate: [(v) => !!v || "Заполните дату рождения"],
      },
      tableHeaders: [
        {
          text: "ФИО",
          align: "start",
          sortable: false,
          value: "fullName",
        },
        { text: "Дата рождения", value: "birthdayDate" },
        { text: "Секции", value: "sections" },
        { text: "Действия", value: "actions" },
      ],
    };
  },
  computed: {
    dialogFormTitle() {
      return this.pickedStudent
        ? "Редактировать студента"
        : "Добавить студента";
    },
    dialogFormSuccessTitle() {
      return this.pickedStudent ? "Редактировать" : "Добавить";
    },
    students() {
      return this.$store.state.students;
    },
    sections() {
      return this.$store.state.sections;
    },
    title() {
      return `Студенты: ${this.students.length}`;
    },
  },
  methods: {
    getFullName(student) {
      return `${student.lastName} ${student.firstName} ${
        student.middleName || ""
      }`;
    },
    getBirthdayDate(student) {
      return student.birthdayDate;
    },
    getSections(sections) {
      return sections.map((section) => section.name).join(", ");
    },
    editItem(item) {
      this.pickedStudent = this.students.find(
        (student) => student.id === item.id
      );
      this.add = Object.assign({}, item);
      this.$refs.appAddDialogRef.$data.dialog = true;
    },
    deleteItem(item) {
      this.pickedStudent = this.students.find(
        (student) => student.id === item.id
      );
      this.add = Object.assign({}, item);
      this.$refs.appRemoveDialogRef.$data.dialog = true;
    },
    onDelete() {
      this.$store.dispatch("removeStudent", this.pickedStudent);
      this.clearForm();
      this.$refs.appRemoveDialogRef.$data.dialog = false;
    },
    clearForm() {
      this.add = {
        firstName: "",
        lastName: "",
        middleName: "",
        avatar: null,
        avatarUrl: "",
        birthdayDate: null,
        sections: [],
      };
      this.pickedStudent = null;

      if (this.$refs.form) {
        this.$refs.form.reset();
      }
    },
    readFileAsync(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    },
    async onSave() {
      await this.$refs.form.validate();

      if (this.valid) {
        if (this.add.avatar && this.add.avatar instanceof File) {
          await this.readFileAsync(this.add.avatar).then(
            (blob) => (this.add.avatarUrl = blob)
          );
        }

        this.pickedStudent
          ? this.$store.dispatch("editStudent", this.add)
          : this.$store.dispatch("addStudent", {
              ...this.add,
              id: Date.now(),
            });

        this.clearForm();
        this.$refs.appAddDialogRef.$data.dialog = false;
      }
    },
    onButtonDialogClick() {
      this.clearForm();
    },
    rowClick(value) {
      this.$router.push({
        name: "StudentDetailPage",
        params: { id: value.id },
      });
    },
  },
};
</script>

<style></style>
