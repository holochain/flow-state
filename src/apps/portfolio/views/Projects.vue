<template>
  <v-card height="100%" width="100%" class="pl-1 pt-1 pr-1">
    <v-app-bar app dense dark clipped-left tile elevation="5">
      <v-app-bar-nav-icon small @click.stop="$emit('open-nav-bar')" />
      <v-btn icon small @click="$router.go(-1)">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-avatar size="30">
        <img :src="require('@/assets/icons/e-s-c-r-logo.png')" />
      </v-avatar>
      <v-toolbar-title class="title ml-2">
        {{ portfolio.name }} Projects</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="action"
            icon
            v-bind="attrs"
            v-on="on"
            @click="projectDetailsOpen = true"
            small
          >
            <v-icon>mdi-plus-box-outline</v-icon>
          </v-btn>
        </template>
        <span>Add a project</span>
      </v-tooltip>
      <v-tooltip bottom>
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
        <span>Show the description of the project.</span>
      </v-tooltip>
    </v-app-bar>
    <v-row no-gutters height="100%">
      <v-col
        v-for="project in projects"
        :key="project.uuid"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <project
          :key="project.uuid"
          :project="project"
          :details="details"
          @open-project-detail="openProjectDetail"
          @delete-project="showDeleteDialog"
        >
          <!-- <crispr-tools-actions :project="project" /> -->
        </project>
      </v-col>
    </v-row>
    <confirm-action-dialog
      :isOpen="deleteDialog"
      :message="`delete ${this.actionProject.name}`"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
    <v-navigation-drawer
      v-model="projectDetailsOpen"
      fixed
      dark
      class="black overflow-visible pa-0"
      right
      width="500"
    >
      <v-card height="100%" width="100%" tile class="pa-0 ma-0">
        <v-system-bar window dark>
          <v-icon>mdi-dna</v-icon>
          <span>Project Details</span>
          <v-spacer></v-spacer>
          <v-icon v-if="!isEditing" @click="isEditing = true"
            >mdi-square-edit-outline</v-icon
          >
          <v-icon v-if="isEditing" @click="cancel">mdi-cancel</v-icon>
          <v-icon v-if="isEditing" @click="save">mdi-content-save</v-icon>
          <v-icon @click="cancel">mdi-close-box-outline</v-icon>
        </v-system-bar>
        <v-row no-gutters justify="center">
          <v-col>
            <v-form>
              <v-toolbar dark dense outlined rounded>
                <v-toolbar-title v-if="!isEditing">
                  {{ actionProject.name }}
                </v-toolbar-title>
                <v-toolbar-title v-if="isEditing">
                  <v-text-field
                    dense
                    dark
                    outlined
                    class="title mt-6 pt-0 pl-n2"
                    v-model="actionProject.name"
                    label="Name"
                  />
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-avatar
                  size="30"
                  v-for="person in actionProject.people"
                  :key="person"
                  class="ml-1"
                >
                  <v-img :src="avatar(person)"></v-img>
                </v-avatar>
              </v-toolbar>
              <v-img
                v-if="!isEditing"
                height="300"
                contain
                :src="actionProject.preview"
              >
              </v-img>
              <v-image-input
                v-if="isEditing"
                v-model="actionProject.preview"
                :image-quality="1"
                clearable
                image-format="jpeg,png"
                :image-width="200"
                :image-height="200"
                dark
                image-min-scaling="contain"
                class="ml-15 pl-10"
              />
              <v-card-text
                v-if="!isEditing"
                v-html="actionProject.shortStory"
              />
              <tiptap-vuetify
                v-if="isEditing"
                v-model="actionProject.shortStory"
                :extensions="extensions"
                :toolbar-attributes="{ color: 'info' }"
              />
              <v-card-text v-if="!isEditing" v-html="actionProject.longStory" />
              <tiptap-vuetify
                v-if="isEditing"
                v-model="actionProject.longStory"
                :extensions="extensions"
                :toolbar-attributes="{ color: 'info' }"
              />
              <people-selector
                v-if="isEditing"
                :people="portfolio.people"
                :selectedPeople="actionProject.people"
                @people-selected="peopleSelected"
              />
            </v-form>
          </v-col>
        </v-row>
      </v-card>
    </v-navigation-drawer>
  </v-card>
</template>
<script>
import { v4 as uuidv4 } from "uuid";
import { mapState, mapActions } from "vuex";
import VImageInput from "vuetify-image-input/a-la-carte";
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History
} from "tiptap-vuetify";
export default {
  name: "Projects",
  components: {
    Project: () => import("../components/Project.vue"),
    TiptapVuetify,
    VImageInput,
    PeopleSelector: () => import("@/components/core/PeopleSelector.vue"),
    ConfirmActionDialog: () =>
      import("@/components/core/ConfirmActionDialog.vue")
  },
  data() {
    return {
      details: false,
      isEditing: true,
      projectDetailsOpen: false,
      actionProject: {
        uuid: uuidv4(),
        name: "",
        preview: "",
        people: [],
        shortStory: "",
        longStory: "",
        kanbanColumns: []
      },
      action: "create",
      deleteDialog: false,
      extensions: [
        History,
        Blockquote,
        Link,
        Underline,
        Strike,
        Italic,
        ListItem,
        BulletList,
        OrderedList,
        [
          Heading,
          {
            options: {
              levels: [1, 2, 3]
            }
          }
        ],
        Bold,
        Code,
        HorizontalRule,
        Paragraph,
        HardBreak
      ]
    };
  },
  methods: {
    ...mapActions("portfolio", [
      "fetchProjects",
      "saveProject",
      "deleteProject"
    ]),
    openProjectDetail(project) {
      this.isEditing = false;
      this.action = "update";
      this.actionProject = { ...project };
      this.projectDetailsOpen = true;
    },
    save() {
      this.saveProject({
        action: this.action,
        portfolio: this.portfolio,
        project: this.actionProject
      }).then(() => {
        this.reset();
      });
    },
    cancel() {
      this.reset();
    },
    reset() {
      this.actionProject = {
        name: "",
        preview: "",
        people: [],
        shortStory: "",
        longStory: "",
        kanbanColumns: []
      };
      this.projectDetailsOpen = false;
      this.isEditing = true;
    },
    peopleSelected(people) {
      this.actionProject.people = people;
    },
    showDeleteDialog(project) {
      this.actionProject = project;
      this.deleteDialog = true;
    },
    confirmDelete() {
      console.log(this.actionProject);
      this.deleteProject(this.actionProject);
      this.deleteDialog = false;
    },
    cancelDelete() {
      this.deleteDialog = false;
    }
  },
  computed: {
    ...mapState("portfolio", ["portfolio", "projects"])
  },
  mounted() {
    this.fetchProjects(this.portfolio);
  }
};
</script>
