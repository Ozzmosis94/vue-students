import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    students: [
      {
        id: 0,
        firstName: "Илья",
        lastName: "Косомбеков",
        middleName: "Анатольевич",
        birthdayDate: "2022-04-12",
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
        birthdayDate: "2022-04-12",
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
  },
  mutations: {
    SET_STUDENTS(state, payload) {
      state.students = payload;
    },
    SET_SECTIONS(state, payload) {
      state.sections = payload;
    },
  },
  actions: {
    updateStudents({ commit }, payload) {
      commit("SET_STUDENTS", payload);
    },
    updateSections({ commit }, payload) {
      commit("SET_SECTIONS", payload);
    },
  },
  modules: {},
});
