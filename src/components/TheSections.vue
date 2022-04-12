<template>
  <v-data-table
    :headers="headers"
    :items="sections"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Секции</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Добавить секцию
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="add.firstName"
                      :rules="rules.firstName"
                      label="Введите название секции"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Отмена </v-btn>
              <v-btn color="blue darken-1" text @click="save">
                Сохранить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Вы действительно хотите удалить секцию?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Отмена</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >ОК</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script>
// import AppTable from "./AppTable.vue";
// import AppDialog from "./AppDialog.vue";

export default {
  // components: { AppTable, AppDialog },
  data() {
    return {
      menu: false,
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      options: {
        itemsPerPage: 5,
        footerProps: { "items-per-page-text": "Студентов на странице" },
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
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    title() {
      return `Студенты: ${this.students.length}`;
    },
    tableStudents() {
      return this.students.map((student) => ({
        ...student,
        fullName: `${student.lastName} ${student.firstName} ${
          student.middleName || ""
        }`,
        birthdayDate: student.birthdayDate.getFullYear(),
        sections: student.sections.map((section) => section.name).join(", "),
      }));
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
    // editItem(item) {
    //   const student = this.students.find((student) => student.id === item.id);

    //   console.log(student);

    //   //   student = {
    //   //     ...student,
    //   //     firstName: "Lox",
    //   //   };

    //   Object.assign(student, {
    //     ...student,
    //     firstName: "Lox",
    //   });

    //   //   this.$set(this.someObject, "b", 2);
    // },
    editItem(item) {
      this.editedIndex = this.students.indexOf(item);
      this.add = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      console.log(item);
      this.editedIndex = this.students.indexOf(item);
      this.add = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.students.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.add = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.add = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.students[this.editedIndex], this.add);
      } else {
        this.students.push(this.add);
      }
      this.close();
    },
    onTopButtonClick() {
      console.log("click");
    },
    onSave() {
      this.students.push({ ...this.add, id: Date.now() });
      this.add = {
        firstName: "",
        lastName: "",
        middleName: "",
        birthdayDate: null,
        sections: [],
      };
    },
  },
};
</script>

<style></style>
