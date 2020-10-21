<template>
  <v-card class="fill-height ma-1 pa-2" outlined dark elevation="5">
    <v-toolbar dense dark outlined rounded>
      <v-text-field
        class="mt-7 ml-n3 title"
        v-if="isEditingColumn"
        autofocus
        dense
        dark
        outlined
        v-model="column.name"
        label="Name of the column"
      />
      <v-toolbar-title v-else class="title">{{ column.name }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon v-if="!isEditingColumn" @click="cardDetailsOpen = true">
        mdi-plus-box-outline
      </v-icon>
      <v-icon
        :key="`icon-${isEditingColumn}`"
        @click="
          isEditingColumn = !isEditingColumn;
          saveKanbanColumn();
        "
        :color="isEditingColumn ? 'success' : 'info'"
        v-text="
          isEditingColumn ? 'mdi-content-save' : 'mdi-square-edit-outline'
        "
      >
      </v-icon>
      <v-icon @click="deleteKanbanColumn()" color="warning"
        >mdi-delete-outline</v-icon
      >
    </v-toolbar>
    <draggable
      v-model="cards"
      :animation="200"
      ghost-class="ghost"
      group="kanban-column"
      class="column pa-n1 pt-1"
      style="overflow: auto;"
    >
      <div v-for="card in cards" :key="card.uuid">
        <kanban-card
          :key="card.uuid"
          :kanbanCard="card"
          :details="details"
          @open-kanban-card="openKanbanCard"
          @delete-kanban-card="deleteCard"
          @save-checklist-item="saveChecklistItem"
        />
      </div>
    </draggable>
    <slot></slot>
    <v-navigation-drawer
      v-model="cardDetailsOpen"
      fixed
      dark
      class="black overflow-auto pa-0"
      right
      :width="this.$vuetify.breakpoint.mdAndUp ? 700 : 500"
    >
      <v-card height="100%" width="100%" tile flat class="pa-0 ma-0">
        <v-system-bar window dark>
          <v-icon v-if="showDetails">mdi-details</v-icon>
          <v-icon v-if="showChat">mdi-comment-outline</v-icon>
          <span v-if="showDetails">Kanban Card Detail</span>
          <span v-if="showChat">Kanban Card Messages</span>
          <v-spacer></v-spacer>
          <v-icon
            v-if="!showDetails && isEditingCard"
            @click="
              showDetails = true;
              showChat = false;
            "
          >
            mdi-details
          </v-icon>
          <v-icon
            v-if="showDetails && !isEditingCard"
            @click="isEditingCard = true"
          >
            mdi-square-edit-outline
          </v-icon>
          <v-icon v-if="showDetails && isEditingCard" @click="saveCard">
            mdi-content-save
          </v-icon>
          <v-icon
            v-if="showDetails && isEditingCard"
            @click="reset(); cardDetailsOpen = false"
          >
            mdi-cancel
          </v-icon>
          <v-icon
            v-if="!showChat"
            @click="
              showChat = true;
              showDetails = false;
            "
          >
            mdi-comment-outline
          </v-icon>
          <v-icon @click="cardDetailsOpen = false">
            mdi-close-box-outline
          </v-icon>
        </v-system-bar>
        <v-row no-gutters justify="center">
          <v-col>
            <v-toolbar dark dense outlined rounded>
              <v-toolbar-title
                v-if="!isEditingCard"
                class="title mt-1 ml-n2 mb-1 pl-2"
                >{{ actionCard.name }}</v-toolbar-title
              >
              <v-text-field
                v-if="isEditingCard"
                dense
                dark
                outlined
                class="title ml-n3 mt-6 pt-0 pl-n2"
                v-model="actionCard.name"
                label="Name"
              />
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-form>
              <v-card-text
                v-if="!isEditingCard"
                v-html="actionCard.description"
              />
              <tiptap-vuetify
                v-if="isEditingCard"
                :key="actionCard.uuid"
                v-model="actionCard.description"
                :extensions="extensions"
                :toolbar-attributes="{ color: 'info' }"
              />
              <check-list :card="actionCard" :summary="false" width="100%">
              </check-list>
              <!-- <tagger
                :selectedTags="actionCard.tags"
                :tags="tags"
                @tag="tag"
                class="pl-0 pt-0 pb-0"
              />
              <people-selector
                v-if="isEditing"
                :people="people"
                :selectedPeople="actionCard.assignees"
                @people-selected="peopleSelected"
              /> -->
            </v-form>
          </v-col>
        </v-row>
      </v-card>
    </v-navigation-drawer>
    <confirm-action-dialog
      :isOpen="deleteCardDialog"
      :message="`delete ${this.actionCard.name}`"
      @confirm="confirmDeleteCard"
      @cancel="cancelDeleteCard"
    />
  </v-card>
</template>
<script>
import { v4 as uuidv4 } from "uuid";
import { mapActions } from "vuex";
import draggable from "vuedraggable";
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
  name: "KanbanColumn",
  components: {
    draggable,
    TiptapVuetify,
    KanbanCard: () => import("./KanbanCard.vue"),
    CheckList: () => import("./CheckList.vue"),
    ConfirmActionDialog: () =>
      import("@/components/core/ConfirmActionDialog.vue")
  },
  props: ["column", "details"],
  data() {
    return {
      isEditingColumn: false,
      isEditingCard: true,
      help: false,
      convertCardDialog: false,
      deleteCardDialog: false,
      action: "create",
      actionCard: {
        uuid: uuidv4(),
        name: "",
        description: "",
        order: 0,
        tags: [],
        reactions: [],
        messages: [],
        checklistItems: [],
        assignees: [],
        labels: []
      },
      cardDetailsOpen: false,
      showDetails: true,
      showChat: false,
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
      "saveKanbanCard",
      "updateCardOrder",
      "deleteKanbanCard"
    ]),
    saveKanbanColumn() {
      if (!this.isEditingColumn) {
        this.$emit("save-kanban-column", this.column);
      }
    },
    deleteKanbanColumn() {
      this.$emit("delete-kanban-column", this.column);
    },
    saveCard() {
      this.saveKanbanCard({
        action: this.action,
        card: this.actionCard,
        column: this.column
      }).then(() => {
        if (this.action === "create") {
          this.column.kanbanCards.push(this.actionCard);
        } else {
          this.column.kanbanCards = this.column.kanbanCards.map(c =>
            c.uuid !== this.actionCard.uuid ? c : { ...c, ...this.actionCard }
          );
        };
        this.reset();
      });
      
    },
    saveChecklistItem(card) {
      this.saveKanbanCard({
        action: "update",
        card: card,
        column: this.column
      });
    },
    deleteCard(kanbanCard) {
      this.actionCard = kanbanCard;
      this.deleteCardDialog = true;
    },
    confirmDeleteCard() {
      this.deleteKanbanCard(this.actionCard).then(() => this.reset());
      this.column.kanbanCards = this.column.kanbanCards.filter(
        card => card.uuid !== this.actionCard.uuid
      );
      this.deleteCardDialog = false;
    },
    cancelDeleteCard() {
      this.deleteCardDialog = false;
    },
    openKanbanCard(card) {
      this.actionCard = JSON.parse(JSON.stringify(card));
      this.action = "update";
      this.cardDetailsOpen = true;
    },
    reset() {
      this.actionCard = {
        uuid: uuidv4(),
        name: "",
        description: "",
        order: 0,
        tags: [],
        reactions: [],
        messages: [],
        checklistItems: [],
        assignees: []
      };
      this.cardDetailsOpen = false;
      this.isEditingCard = true;
    }
  },
  computed: {
    articles() {
      return this.$store.state.portfolio.articles;
    },
    cards: {
      get() {
        return this.column.kanbanCards;
      },
      set(cards) {
        const reorderedCards = cards.map((card, index) => ({
          ...card,
          order: index,
          parent: this.column.uuid
        }));
        this.column.kanbanCards = [...reorderedCards];
        this.updateCardOrder(reorderedCards);
      }
    }
  },
  created() {
    if (this.column.name === "") {
      this.isEditingColumn = true;
    }
  }
};
</script>
<style scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.column {
  box-sizing: border-box;
  overflow-y: auto;
  height: calc(100vh - 125px);
}
</style>
