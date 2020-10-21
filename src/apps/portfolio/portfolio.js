import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    portfolio: {
      uuid: "aad9e8b3-4889-4cb4-ad70-3da65fe6ce49",
      name: "Eat Sleep Code Repeat"
    },
    people: {},
    projects: {},
    project: {
      name: "",
      preview: "",
      people: [],
      shortStory: "",
      longStory: "",
      kanbanColumns: []
    },
    tags: []
  },
  getters: {
    avatar: ({ state }, person) => {
      const friend = state.portfolio.people.find(f => f.uuid === person);
      if (friend === undefined) {
        return "";
      } else {
        return friend.avatar;
      }
    }
  },
  actions: {
    fetchProjects({ rootState, commit }, payload) {
      const portfolio = { ...payload };
      rootState.db.projects
        .where("parent")
        .equals(portfolio.uuid)
        .toArray(projects => {
          commit("setProjects", projects);
        });
      //  fetch from holochain in parallel to dexie
      //  .then(projects => {
      //    rootState.db.projects.bulkPut(projects).then(() => {
      //      commit("setProjects", projects);
      //    });
      //  });
    },
    saveProject({ rootState, commit }, payload) {
      const project = { ...payload.project, parent: payload.portfolio.uuid };
      rootState.db.projects.put(project).then(() => {
        if (payload.action === "create") {
          commit("createProject", project);
        } else {
          commit("updateProject", project);
        }
      });
      // send to Holochain
      // .then(project => {
      // rootState.db.projects
      // .put(project)
      // .then(() => {
      //     commit("updateProject", project);
      //   }
    },
    deleteProject({ rootState, commit }, payload) {
      const project = { ...payload };
      console.log("deleteProject", project);
      rootState.db.projects.delete(project.uuid).then(() => {
        commit("deleteProject", project);
      });
      // delete from Holochain
    },
    setProject({ rootState, commit }, payload) {
      rootState.db.projects.get(payload).then(project => {
        rootState.db.kanbanColumns
          .where("parent")
          .equals(project.uuid)
          .toArray(columns => {
            project.kanbanColumns = columns.sort(function(a, b) {
              return a.order - b.order;
            });
            commit("setProject", project);
            columns.forEach(column => {
              rootState.db.kanbanCards
                .where("parent")
                .equals(column.uuid)
                .toArray(cards => {
                  column.kanbanCards = cards.sort(function(a, b) {
                    return a.order - b.order;
                  });
                  commit("setProject", project);
                });
            });
          });
      });
    },
    saveKanbanColumn({ rootState }, payload) {
      const column = { ...payload.column, parent: payload.project.uuid };
      console.log(column);
      rootState.db.kanbanColumns
        .put(column)
        .then(result => console.log(result));
      // send to Holochain
      // .then(project => {
      // rootState.db.projects
      // .put(project)
      // .then(() => {
      //     commit("updateProject", project);
      //   }
    },
    deleteKanbanColumn({ rootState }, payload) {
      const column = { ...payload };
      rootState.db.kanbanColumns.delete(column.uuid);
      // delete from Holochain
    },
    saveKanbanCard({ rootState }, payload) {
      const card = { ...payload.card, parent: payload.column.uuid };
      rootState.db.kanbanCards.put(card);
      // send to Holochain
      // .then(project => {
      // rootState.db.projects
      // .put(project)
      // .then(() => {
      //     commit("updateKanbanCard", project);
      //   }
    },
    deleteKanbanCard({ rootState }, payload) {
      const card = { ...payload };
      rootState.db.kanbanCards.delete(card.uuid);
      // delete from Holochain
    },
    updateCardOrder({ rootState }, payload) {
      rootState.db.kanbanCards
        .bulkPut(payload)
        .then(result => console.log(result));
      // send to Holochain
    }
  },
  mutations: {
    setProjects(state, payload) {
      state.projects = payload;
    },
    createProject(state, payload) {
      state.projects.push(payload);
    },
    updateProject(state, payload) {
      state.projects = state.projects.map(p =>
        p.uuid !== payload.uuid ? p : { ...p, ...payload }
      );
    },
    deleteProject(state, payload) {
      state.projects = state.projects.filter(p => p.uuid !== payload.uuid);
    },
    setProject(state, payload) {
      state.project = payload;
      state.projectName = payload.name;
      state.projectPreview = payload.preview;
    }
  },
  modules: {}
};
