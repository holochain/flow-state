<template>
  <v-card>
    <v-row class="pa-1">
      <v-col>
        <vue-word-cloud
          style="height: 50vh; width: 100%;"
          :words="tagWeights"
          :color="([text]) => color(text)"
          font-family="Roboto"
        >
          <template slot-scope="{ text, weight, word }">
            <div
              :title="weight"
              style="cursor: pointer;"
              @click="listEntries(word)"
            >
              {{ text }}
            </div>
          </template>
        </vue-word-cloud>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left" width="50px"></th>
                <th class="text-left">Card</th>
                <th class="text-left">Assignees</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="card in taggedCards" :key="card.name">
                <td class="text-left">
                  <v-icon @click="openKanbanCardDetail(card)">
                    mdi-details
                  </v-icon>
                </td>
                <td>{{ card.name }}</td>
                <td>
                  <v-avatar
                    size="30"
                    v-for="assignee in card.assignees"
                    :key="assignee.agentPubKey"
                  >
                    <v-img :src="avatar(assignee)"></v-img>
                  </v-avatar>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import VueWordCloud from "vuewordcloud";
export default {
  name: "Tagcloud",
  components: {
    [VueWordCloud.name]: VueWordCloud
  },
  props: ["tagWeights"],
  data() {
    return {
      words: [],
      taggedCards: []
    };
  },
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
    avatar(agentPubKey) {
      const person = this.people.find(f => f.agentPubKey === agentPubKey);
      if (person === undefined) return "";
      return person.avatar;
    },
    listEntries(word) {
      this.taggedCards = word[2];
    },
    openKanbanCardDetail(card) {
      this.$emit("open-kanban-card-detail", card, false);
    }
  },
  computed: {
    people() {
      return this.$store.state.community.people;
    }
  }
};
</script>
