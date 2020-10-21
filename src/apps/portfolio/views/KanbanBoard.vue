<template>
  <v-card width="100%" class="fill-height pl-0 pt-0">
    <v-app-bar app dark dense clipped-left tile elevation="5">
      <v-app-bar-nav-icon
        small
        @click.stop="$emit('open-nav-bar')"
      ></v-app-bar-nav-icon>
      <v-btn icon small @click="$router.go(-1)">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-avatar v-if="!loading" size="30">
        <img :src="project.preview" />
      </v-avatar>
      <v-toolbar-title v-if="!loading" class="title ml-2"
        >Kanban Board for {{ project.name }}</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <!-- <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="action"
            icon
            v-bind="attrs"
            v-on="on"
            @click="tagCloud = !tagCloud"
            small
          >
            <v-icon v-if="tagCloud">mdi-view-column-outline</v-icon>
            <v-icon v-else>mdi-cloud-tags</v-icon>
          </v-btn>
        </template>
        <span v-if="tagCloud">Show the Kanban Board</span>
        <span v-else>Show the Kanban Tag Cloud</span>
      </v-tooltip> -->
      <v-tooltip bottom v-if="!tagCloud">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="action"
            icon
            v-bind="attrs"
            v-on="on"
            @click="addColumn"
            small
          >
            <v-icon>mdi-plus-box-outline</v-icon>
          </v-btn>
        </template>
        <span>Add a column to the Kanban Board</span>
      </v-tooltip>
      <v-tooltip bottom v-if="!tagCloud">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="action"
            icon
            v-bind="attrs"
            v-on="on"
            @click="details = !details"
            small
          >
            <v-icon>mdi-details</v-icon>
          </v-btn>
        </template>
        <span v-if="!details">Show card details.</span>
        <span v-if="details">Hide card details.</span>
      </v-tooltip>
    </v-app-bar>
    <v-row v-if="!loading" no-gutters class="fill-height pl-1 pr-1 pb-2">
      <v-col
        v-for="column in project.kanbanColumns"
        :key="column.uuid"
        :cols="layoutCols"
        class="pl-0 pt-1 mr-0"
      >
        <kanban-column
          :column="column"
          :details="details"
          :key="column.uuid"
          @delete-kanban-column="deleteColumn"
          @save-kanban-column="saveColumn"
        />
      </v-col>
    </v-row>
    <confirm-action-dialog
      :isOpen="deleteColumnDialog"
      :message="`delete column ${this.deleteColumn.name}`"
      @confirm="confirmDeleteColumn"
      @cancel="cancelDeleteColumn"
    />
  </v-card>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import { mapActions, mapState } from "vuex";
export default {
  name: "KanbanBoard",
  components: {
    KanbanColumn: () => import("../components/KanbanColumn.vue"),
    ConfirmActionDialog: () =>
      import("@/components/core/ConfirmActionDialog.vue")
  },
  data() {
    return {
      loading: true,
      tagCloud: false,
      details: false,
      actionColumn: {
        name: ""
      },
      deleteColumnDialog: false
    };
  },
  methods: {
    ...mapActions("portfolio", [
      "setProject",
      "saveKanbanColumn",
      "deleteKanbanColumn"
    ]),
    addColumn() {
      const newColumn = {
        uuid: uuidv4(),
        name: "",
        order: this.project.kanbanColumns.length,
        kanbanCards: []
      };
      this.project.kanbanColumns.push(newColumn);
    },
    saveColumn(column) {
      console.log({ project: this.project, column });
      this.saveKanbanColumn({ project: this.project, column });
    },
    deleteColumn(column) {
      console.log("delete-kanban-column", column);
      this.actionColumn = column;
      this.deleteColumnDialog = true;
    },
    confirmDeleteColumn() {
      this.project.kanbanColumns = this.project.kanbanColumns.filter(
        column => column.uuid !== this.actionColumn.uuid
      );
      this.deleteKanbanColumn(this.actionColumn);
      this.deleteColumnDialog = false;
    },
    cancelDeleteColumn() {
      this.deleteColumnDialog = false;
    }
  },
  computed: {
    ...mapState("portfolio", ["project"]),
    layoutCols() {
      if (this.project.kanbanColumns.length === 1) {
        return 6;
      }
      const r = Math.round(12 / this.project.kanbanColumns.length);
      if (r > 3) {
        return r;
      } else {
        return 3;
      }
    }
  },
  created() {
    this.setProject(this.$route.params.uuid).finally(
      () => (this.loading = false)
    );
  }
};
</script>
