<template>
  <v-card height="100%" width="100%" class="pl-1 pt-1 pr-1">
    <v-app-bar app dense dark clipped-left tile elevation="5">
      <v-avatar size="30">
        <img :src="require('@/assets/icons/e-s-c-r-logo.png')" />
      </v-avatar>
      <v-toolbar-title class="title ml-2">
        Welcome to Flow State</v-toolbar-title
      >
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-row :no-gutters="this.$vuetify.breakpoint.smAndDown">
      <v-col>
        <v-card
          max-width="380"
          class="mx-auto pa-2"
          :outlined="this.$vuetify.breakpoint.mdAndUp"
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title"
                >Get your Agent Key</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-img
            :src="require('@/assets/icons/e-s-c-r-logo.png')"
            width="150"
            class="mx-auto"
          ></v-img>
          <v-card-text>
            <p>
              To gain access to FlowState you will need to retrieve the Agent
              Key created for you. Paste the invite key into the box below and
              press Initialise Me 😎
            </p>
            <p>
              If you don't have an invite press Request Invite ❤️ and we will be
              in contact with you.
            </p>
          </v-card-text>
          <v-textarea
            outlined
            label="Paste your invite code here."
            hint="It looks like  'a1d8f9c6-35d5-48a2-b8bb-94d1bcdf03f6'"
            persistent-hint
            v-model="uuid"
          ></v-textarea>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="deep-purple accent-4">
              Request Invite ❤️
            </v-btn>
            <v-btn text @click="getAgentKey" color="deep-purple accent-4">
              Initialise Me 😎
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      uuid: ""
    };
  },
  methods: {
    getAgentKey() {
      console.log(this.uuid);
      axios
        .post("http://localhost:5401/getAgentKey", { uuid: this.uuid })
        .then(response => console.log(response.data));
    }
  }
};
</script>
