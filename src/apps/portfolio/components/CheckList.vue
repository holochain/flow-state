<template>
  <div>
    <v-card :color="color" flat>
      <draggable
        v-model="checklistItems"
        :animation="200"
        ghost-class="ghost"
        class="pa-0 ma-0"
      >
        <template v-for="item in checklistItems">
          <v-list-item :key="item.uuid">
            <v-list-item-action class="pl-0 ml-0">
              <v-checkbox
                v-model="item.done"
                :color="(item.done && 'grey') || 'white'"
                @click="$emit('save-checklist-item', card)"
              >
                <template v-slot:label>
                  <div
                    :class="(item.done && 'grey--text') || 'white--text'"
                    class="ml-1"
                    v-text="item.title"
                  ></div>
                </template>
              </v-checkbox>
            </v-list-item-action>
            <v-spacer></v-spacer>
            <v-icon color="warning" @click="deleteChecklistItem(item)">
              mdi-delete-outline
            </v-icon>
          </v-list-item>
        </template>
      </draggable>
      <v-row align="center" class="ml-1 mr-1 mb-1" width="100%">
        <v-progress-linear :value="progress" height="20" rounded color="info">
          <template>
            <strong class="mr-1 ml-5 white--text text--darken-2">
              {{ completedItems }} of
            </strong>
            <strong class="ml-0 white--text text--darken-2">
              {{ card.checklistItems.length }}
            </strong>
          </template>
        </v-progress-linear>
      </v-row>
      <v-text-field
        v-if="!summary"
        class="ml-3 mr-1 white--text"
        v-model="itemTitle"
        label="Add a checklist item"
        @keydown.enter="saveChecklistItem()"
        append-icon="mdi-plus-box-outline"
        @click:append="saveChecklistItem()"
      />
      <slot></slot>
    </v-card>
  </div>
</template>
<script>
import { v4 as uuidv4 } from "uuid";
import draggable from "vuedraggable";
export default {
  name: "CheckList",
  components: {
    draggable
  },
  props: ["card", "summary", "color"],
  data() {
    return {
      itemTitle: "",
      itemUuid: ""
    };
  },
  methods: {
    saveChecklistItem() {
      const checklistItem = this.card.checklistItems.find(
        i => i.uuid === this.itemUuid
      );
      if (checklistItem === undefined) {
        this.card.checklistItems.push({
          uuid: uuidv4(),
          title: this.itemTitle,
          done: false,
          order: this.card.checklistItems.length
        });
      }
      this.itemTitle = "";
      this.$emit("save-checklist-item", this.card);
    },
    deleteChecklistItem(checklistItem) {
      this.card.checklistItems = this.card.checklistItems.filter(
        i => i.uuid !== checklistItem.uuid
      );
      this.$emit("save-checklist-item", this.card);
    }
  },
  computed: {
    checklistItems: {
      get() {
        return this.card.checklistItems;
      },
      set(checklistItems) {
        const reorderedChecklist = checklistItems.map((item, index) => ({
          ...item,
          order: index
        }));
        this.card.checklistItems = [...reorderedChecklist];
      }
    },
    completedItems() {
      return this.card.checklistItems.filter(item => item.done).length;
    },
    progress() {
      return (this.completedItems / this.card.checklistItems.length) * 100;
    },
    remainingItems() {
      return this.card.checklistItems.length - this.completedItems;
    }
  }
};
</script>
<style scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
