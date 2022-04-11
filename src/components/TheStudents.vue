<template>
  <app-table
    :headers="headers"
    :items="students"
    :title="title"
    :options="options"
    top-button="Добавить студента"
    @top-button-click="onTopButtonClick"
  >
    <template v-slot:dialog>
      <app-dialog @save="onSave">
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="add.firstName"
                label="Имя"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="add.lastName"
                label="Фамилия"
                hint="example of helper text only on focus"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="add.middleName"
                label="Отчество"
                hint="example of persistent helper text"
                persistent-hint
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-date-picker v-model="add.birthdayDate"></v-date-picker>
            </v-col>
            <v-col cols="12">
              <v-combobox
                v-model="add.sections"
                :items="sections"
                item-text="name"
                label="Combobox"
                multiple
                outlined
                dense
              ></v-combobox>
            </v-col>
          </v-row>
        </v-container>
      </app-dialog>
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
  </app-table>
</template>

<script>
import AppTable from "./AppTable.vue";
import AppDialog from "./AppDialog.vue";

export default {
  components: { AppTable, AppDialog },
  data() {
    return {
      dialogDelete: false,
      editedIndex: -1,
      options: {
        itemsPerPage: 5,
        footerProps: { "items-per-page-text": "Студентов на странице" },
      },
      add: {
        firstName: "",
        lastName: "",
        middleName: "",
        birthdayDate: null,
        sections: [],
      },
      headers: [
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
      students: [
        {
          id: 0,
          firstName: "Илья",
          lastName: "Косомбеков",
          middleName: "Анатольевич",
          birthdayDate: new Date(),
          sections: [
            {
              id: 0,
              name: "Футбол",
            },
            {
              id: 1,
              name: "Волейбол",
            },
          ],
        },
        {
          id: 1,
          firstName: "Иasdлья",
          lastName: "Косasdомбеков",
          middleName: "Анasdатольевич",
          birthdayDate: new Date("1999"),
          sections: [
            {
              id: 0,
              name: "Футбол",
            },
            {
              id: 1,
              name: "Волейбол",
            },
          ],
        },
      ],
      sections: [
        {
          id: 0,
          name: "Футбол",
        },
        {
          id: 1,
          name: "Волейбол",
        },
      ],
    };
  },
  computed: {
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
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      console.log(item);
      this.editedIndex = this.students.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.students.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.students[this.editedIndex], this.editedItem);
      } else {
        this.students.push(this.editedItem);
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
      }
    },
  },
};
</script>

<style></style>
