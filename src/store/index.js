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
    ADD_STUDENT(state, payload) {
      state.students.push(payload);
    },
    REMOVE_STUDENT(state, payload) {
      state.students = state.students.filter(student => student.id !== payload.id);
    },
    EDIT_STUDENT(state, payload) {
      let findStudent =  state.students.find(student => student.id === payload.id);

      console.log(findStudent, payload)

      if (findStudent) {
        findStudent = { ...findStudent, payload }
      }

      console.log(findStudent)
    },
    SET_SECTIONS(state, payload) {
      state.sections = payload;
    },
  },
  actions: {
    setStudents({ commit }, payload) {
      commit("SET_STUDENTS", payload);
    },
    addStudent({ commit }, payload) {
      commit("ADD_STUDENT", payload);
    },
    removeStudent({ commit }, payload) {
      commit("REMOVE_STUDENT", payload);
    },
    editStudent({ commit }, payload) {
      commit("EDIT_STUDENT", payload);
    },
    updateSections({ commit }, payload) {
      commit("SET_SECTIONS", payload);
    },
  },
  modules: {},
});
