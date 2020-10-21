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
        Flow State Portfolios</v-toolbar-title
      >
      <v-spacer></v-spacer>
    </v-app-bar>
  </v-card>
</template>
<script>
export default {
  name: "Home"
};
</script>
