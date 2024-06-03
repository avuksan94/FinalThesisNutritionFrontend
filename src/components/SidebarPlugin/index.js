import { reactive } from 'vue';
import Sidebar from "./SideBar.vue";
import SidebarLink from "./SidebarLink.vue";

const SidebarStore = reactive({
  showSidebar: false,
  sidebarLinks: [],
  displaySidebar(value) {
    this.showSidebar = value;
  },
});

const SidebarPlugin = {
  install(app) {
    app.provide('sidebarStore', SidebarStore);

    app.config.globalProperties.$sidebar = SidebarStore;

    app.component("side-bar", Sidebar);
    app.component("sidebar-link", SidebarLink);
  },
};

export default SidebarPlugin;
