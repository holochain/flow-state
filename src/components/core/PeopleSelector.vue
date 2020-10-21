<template>
  <v-autocomplete
    v-model="selected"
    :disabled="isUpdating"
    :items="people"
    dark
    dense
    filled
    outlined
    chips
    item-text="name"
    item-value="agentPubKey"
    label="Select your team"
    persistent-hint
    multiple
    ripple
    small
    color="primary"
    class="pt-n3"
  >
    <template v-slot:selection="data">
      <v-chip
        v-bind="data.attrs"
        :input-value="data.selected"
        close
        close-icon="mdi-close"
        dark
        label
        ripple
        outlined
        @click="data.select"
        @click:close="remove(data.item)"
        class="mt-2 mb-1"
      >
        <v-avatar left>
          <v-img :src="data.item.avatar"></v-img>
        </v-avatar>
        {{ data.item.name }}
      </v-chip>
    </template>
    <template v-slot:item="data">
      <template v-if="typeof data.item !== 'object'">
        <v-list-item-content v-text="data.item"></v-list-item-content>
      </template>
      <template v-else>
        <v-list-item-avatar>
          <img :src="data.item.avatar" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-html="data.item.name"></v-list-item-title>
        </v-list-item-content>
      </template>
    </template>
  </v-autocomplete>
</template>
<script>
export default {
  name: "PeopleSelector",
  props: ["people", "selectedPeople"],
  data() {
    return {
      isUpdating: false
    };
  },
  methods: {
    remove(item) {
      const index = this.selected.indexOf(item.agentPubKey);
      if (index >= 0) this.selected.splice(index, 1);
    }
  },
  computed: {
    selected: {
      get() {
        return this.selectedPeople;
      },
      set(val) {
        this.$emit("people-selected", val);
      }
    }
  },
  watch: {
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000);
      }
    }
  }
};
</script>
