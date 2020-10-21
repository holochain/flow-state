<template>
  <v-container fluid>
    <v-combobox
      v-model="model"
      :filter="filter"
      :hide-no-data="!search"
      :items="tags"
      :search-input.sync="search"
      hide-selected
      label="Search for a tag"
      multiple
      small-chips
      solo
    >
      <template v-slot:no-data>
        <v-list-item>
          <span class="subheading">Create</span>
          <v-chip :color="color(search)" label outlined>
            {{ search }}
          </v-chip>
        </v-list-item>
      </template>
      <template v-slot:selection="{ attrs, item, parent, selected }">
        <v-chip
          v-if="item === Object(item)"
          v-bind="attrs"
          :input-value="selected"
          label
          outlined
          :color="color(item.text)"
          small
          class="ml-1"
        >
          <span class="pr-2">
            {{ item.text }}
          </span>
          <v-icon small @click="parent.selectItem(item)">mdi-close</v-icon>
        </v-chip>
      </template>
      <template v-slot:item="{ index, item }">
        <v-text-field
          v-if="editing === item"
          v-model="editing.text"
          autofocus
          flat
          background-color="transparent"
          hide-details
          solo
          @keyup.enter="edit(index, item)"
        ></v-text-field>
        <v-chip v-else :color="color(item.text)" dark label outlined small>
          {{ item.text }}
        </v-chip>
        <v-spacer></v-spacer>
        <v-list-item-action @click.stop>
          <v-btn icon @click.stop.prevent="edit(index, item)">
            <v-icon>{{ editing !== item ? "mdi-pencil" : "mdi-check" }}</v-icon>
          </v-btn>
        </v-list-item-action>
      </template>
    </v-combobox>
  </v-container>
</template>

<script>
export default {
  name: "Tagger",
  props: ["selectedTags", "tags"],
  data: () => ({
    activator: null,
    attach: null,
    editing: null,
    index: -1,
    menu: false,
    x: 0,
    search: null,
    y: 0
  }),
  methods: {
    color(tag) {
      if (tag === null) return;
      var hash = 0;
      for (var i = 0; i < tag.length; i++) {
        hash = tag.charCodeAt(i) + ((hash << 5) - hash);
      }
      var colour = "#";
      for (i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 0xff;
        colour += ("00" + value.toString(16)).substr(-2);
      }
      return colour;
    },
    edit(index, item) {
      if (!this.editing) {
        this.editing = item;
        this.index = index;
      } else {
        this.editing = null;
        this.index = -1;
      }
    },
    filter(item, queryText, itemText) {
      if (item.header) return false;
      const hasValue = val => (val != null ? val : "");
      const text = hasValue(itemText);
      const query = hasValue(queryText);
      return (
        text
          .toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      );
    }
  },
  computed: {
    model: {
      get() {
        const tagItems = [];
        this.selectedTags.forEach(tag => {
          tagItems.push({
            text: tag
          });
        });
        return tagItems;
      },
      set(value) {
        this.$emit("tag", value);
      }
    }
  },
  watch: {
    model(val, prev) {
      if (val.length === prev.length) return;
      this.model = val.map(v => {
        if (this.tags.find(t => t.text === v.text) === undefined) {
          this.tags.push(v);
        }
        return v;
      });
    }
  }
};
</script>
