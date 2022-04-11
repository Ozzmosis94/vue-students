<template>
  <v-data-table
    :headers="headers"
    :items="items"
    v-bind="options"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title> {{ title }}</v-toolbar-title>

        <v-divider class="mx-4" inset vertical></v-divider>

        <template v-if="topButton">
          <v-spacer></v-spacer>

          <slot name="dialog"></slot>
        </template>
      </v-toolbar>
    </template>
    <template
      v-for="slotName in Object.keys($scopedSlots)"
      v-slot:[slotName]="slotScope"
    >
      <slot :name="slotName" v-bind="slotScope"></slot>
    </template>
    <!-- <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5"
          >Вы действительно хотите удалить студента?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">Отмена</v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm"
            >ОК</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
    <!-- <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template> -->
  </v-data-table>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    items: {
      type: Array,
      default: () => [],
    },
    headers: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Object,
      default: () => {},
    },
    topButton: {
      type: String,
      default: "",
    },
  },
  mounted() {
    console.log(this.$scopedSlots);
  },
};
</script>

<style></style>
