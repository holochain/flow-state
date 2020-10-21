import Vue from "vue";
import Vuex from "vuex";
import portfolio from "@/apps/portfolio/portfolio";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    initialiseDexie({ state }) {
      state.db.version(1).stores({
        projects: "uuid,name,parent",
        kanbanColumns: "uuid,name,parent",
        kanbanCards: "uuid,name,parent"
      });
    }
  },
  modules: {
    portfolio
  }
});
