<template>
  <v-app>
    <core-app-bar />
    <core-drawer :navOpen="navOpen" @close-nav-bar="navOpen = false" />
    <v-main>
      <v-responsive height="100%">
        <transition name="fade">
          <router-view id="router" @open-nav-bar="navOpen = !navOpen" />
        </transition>
      </v-responsive>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {
    CoreAppBar: () => import("@/components/core/AppBar"),
    CoreDrawer: () => import("@/components/core/Drawer")
  },
  data() {
    return {
      navOpen: false
    };
  },
  created() {
    this.$store
      .dispatch("initialiseDexie")
      .then(this.$store.dispatch("portfolio/fetchProjects"));
    this.$vuetify.theme.dark = true;
  }
};
</script>
<style scoped>
#router {
  height: 100% !important;
}
</style>
