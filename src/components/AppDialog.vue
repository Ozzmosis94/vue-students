<template>
  <v-dialog v-model="dialog" max-width="700px">
    <template v-if="buttonTitle" v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        dark
        class="mb-2"
        v-bind="attrs"
        v-on="on"
        @click="$emit('click')"
      >
        {{ buttonTitle }}
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <slot />
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close"> Отмена </v-btn>
        <v-btn :disabled="disabled" color="blue darken-1" text @click="save">
          {{ successText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    buttonTitle: {
      type: String,
      default: "",
    },
    formTitle: {
      type: String,
      default: "",
    },
    successText: {
      type: String,
      default: "ОК",
    },
  },
  methods: {
    save() {
      this.$nextTick(() => this.$emit("success"));
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => this.$emit("close"));
    },
  },
};
</script>

<style></style>
