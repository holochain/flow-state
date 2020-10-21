import Vue from "vue";
import Vuetify from "vuetify/lib";
import { TiptapVuetifyPlugin } from "tiptap-vuetify";
import "tiptap-vuetify/dist/main.css";

const vuetify = new Vuetify();
Vue.use(Vuetify);
Vue.use(TiptapVuetifyPlugin, {
  vuetify,
  iconsGroup: "mdi"
});

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: "#7311F1",
        accent: "#3BBAED",
        secondary: "#424345",
        success: "#4CAF50",
        info: "#2196F3",
        warning: "#FB8C00",
        error: "#FF5252"
      },
      light: {
        primary: "#1976D2",
        accent: "#E91E63",
        secondary: "#30B1DC",
        success: "#4CAF50",
        info: "#2196F3",
        warning: "#FB8C00",
        error: "#FF5252"
      }
    }
  }
});
