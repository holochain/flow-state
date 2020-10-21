<template>
  <div>
    <v-card
      class="mt-1 mb-1 pa-2 darken-1"
      :color="cardColor"
      outlined
      dark
      elevation="5"
    >
      <v-toolbar
        dense
        dark
        outlined
        rounded
        :color="cardColor"
        class="darken-1"
      >
        <v-toolbar-title class="title">{{ kanbanCard.name }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-icon v-for="emoji in kanbanCard.reactions" :key="emoji">
          {{ emoji }}
        </v-icon>
        <!-- <v-icon v-if="kanbanCard.channelUuid" @click="openKanbanCardChat">
          mdi-comment-multiple-outline
        </v-icon>
        <v-icon
          v-else
          @click="openKanbanCardChat"
          @delete-kanban-card-checklist-item="() => {}"
        >
          mdi-comment-outline
        </v-icon> -->
      </v-toolbar>
      <v-card-text
        v-html="kanbanCard.description"
        v-if="details"
        class="pl-1 pr-1"
      />
      <check-list
        :card="kanbanCard"
        :summary="true"
        @save-checklist-item="saveChecklistItem"
        v-if="details"
        :color="cardColor"
        class="ml-n1 mr-n1"
      />
      <div class="mt-1 ml-n1 mr-n1">
        <v-chip
          v-for="(tag, index) in kanbanCard.tags"
          :key="index"
          class="ml-1"
          :color="color(tag)"
          label
          small
        >
          {{ tag }}
        </v-chip>
      </div>
      <v-card-actions class="pa-0 pt-1">
        <v-toolbar
          dense
          dark
          outlined
          rounded
          elevation="5"
          :color="cardColor"
          class="darken-1"
        >
          <!-- <v-avatar
            size="30"
            v-for="assignee in kanbanCard.assignees"
            :key="assignee.agentPubKey"
            class="mr-1"
          >
            <v-img :src="avatar(assignee)"></v-img>
          </v-avatar> -->
          <v-spacer></v-spacer>
          <v-icon @click="$emit('open-kanban-card', kanbanCard)">
            mdi-details
          </v-icon>
          <v-icon @click="deleteCard" color="warning">
            mdi-delete-outline
          </v-icon>
        </v-toolbar>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {
  components: {
    CheckList: () => import("./CheckList.vue")
    // Messages: () => import("@/components/public-messages/Messages.vue")
  },
  props: ["kanbanCard", "details"],
  data() {
    return {
      cardDetailsDrawerOpen: false,
      showDetails: false,
      showChat: false,
      showHistory: false,
      channel: undefined,
      isEditing: false
    };
  },
  computed: {
    people() {
      return this.$store.state.community.people;
    },
    cardColor() {
      if (this.details) return "";
      return "secondary";
    },
    allChannels() {
      return this.$store.state.publicmessages.channels;
    }
  },
  methods: {
    deleteCard() {
      this.$emit("delete-kanban-card", this.kanbanCard);
    },
    cardToArticle() {
      this.$emit("convert-kanban-card-to-article", this.kanbanCard);
    },
    avatar(agentPubKey) {
      const friend = this.people.find(f => f.agentPubKey === agentPubKey);
      if (friend === undefined) {
        return "";
      } else {
        return friend.avatar;
      }
    },
    saveChecklistItem(card) {
      this.$emit("save-checklist-item", card);
    }
  },
  created() {
    if (this.kanbanCard.uuid === "") {
      this.showDetails = true;
      this.cardDetailsDrawerOpen = true;
      this.isEditing = true;
    }
  }
};
</script>
<style scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.v-navigation-drawer {
  z-index: 999998 !important;
  height: calc(100% - 30px);
}
</style>
