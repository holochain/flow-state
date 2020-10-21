<template>
  <v-card class="ma-1 pa-2" outlined dark elevation="5">
    <v-toolbar dense dark outlined rounded>
      <v-toolbar-title class="title">{{ project.name }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-avatar
        size="30"
        v-for="person in project.people"
        :key="person"
        class="ml-1"
      >
        <v-img :src="avatar(person)"></v-img>
      </v-avatar>
    </v-toolbar>
    <v-img
      class="white--text align-end ma-2"
      max-width="400"
      :src="project.preview"
    >
    </v-img>
    <div v-if="details">
      <v-card-text v-html="project.shortStory"> </v-card-text>
    </div>
    <v-progress-linear :value="progress" height="20" rounded color="info">
      <template>
        <strong class="mr-2 ml-2 white--text text--darken-2">
          {{ completedItems }} of
        </strong>
        <strong class="ml-0 white--text text--darken-2">
          {{ projectChecklistItems.length }}
        </strong>
      </template>
    </v-progress-linear>
    <v-card-actions class="pa-0 pt-2">
      <v-toolbar dense dark outlined rounded elevation="5" class="pl-2">
        <v-btn icon small :to="`/kanban/${project.uuid}`">
          <v-icon>mdi-view-column-outline</v-icon>
        </v-btn>
        <slot> </slot>
        <v-spacer></v-spacer>
        <v-icon @click="$emit('delete-project', project)" color="warning">
          mdi-delete-outline</v-icon
        >
        <v-icon @click="openProjectDetail">
          mdi-details
        </v-icon>
      </v-toolbar>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Project",
  props: ["project", "details"],
  computed: {
    ...mapState("portfolio", ["people"]),
    projectChecklistItems() {
      console.log(this.project.kanbanColumns);
      const projectItems = this.project.kanbanColumns
        .reduce((arr2, column) => arr2.concat(column.cards), [])
        .reduce((arr3, card) => arr3.concat(card.checklistItems), []);
      return projectItems;
    },
    completedItems() {
      return this.projectChecklistItems.filter(item => item.done).length;
    },
    progress() {
      return (this.completedItems / this.projectChecklistItems.length) * 100;
    },
    remainingItems() {
      return this.projectChecklistItems.length - this.completedItems;
    },
    projectApplication() {
      if (this.project.instance) {
        if (this.project.instance.startsWith("http")) {
          return {
            url: this.project.instance
          };
        }
        return {
          route: this.project.instance
        };
      }
      return "";
    }
  },
  methods: {
    openProjectDetail() {
      this.$emit("open-project-detail", this.project);
    }
  }
};
</script>
