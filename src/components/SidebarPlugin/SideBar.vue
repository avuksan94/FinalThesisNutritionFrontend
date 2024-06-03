<template>
  <div class="sidebar" :class="{'is-active': showSidebar}" :data-background-color="backgroundColor" :data-active-color="activeColor">
    <div class="sidebar-wrapper" id="style-3">
      <div class="logo">
        <a href="#" class="simple-text">
          Nutrio App
        </a>
      </div>
      <ul class="nav">
        <slot name="links"></slot>
      </ul>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue';
import MovingArrow from "./MovingArrow.vue";
import SidebarLink from "./SidebarLink.vue";

export default {
  components: {
    MovingArrow,
    SidebarLink
  },
  props: {
    title: String,
    backgroundColor: {
      type: String,
      default: "black",
      validator: (value) => ["white", "black", "darkblue"].includes(value)
    },
    activeColor: {
      type: String,
      default: "success",
      validator: (value) => ["primary", "info", "success", "warning", "danger"].includes(value)
    },
  },
  setup() {
    const sidebarStore = inject('sidebarStore');
    return {
      showSidebar: sidebarStore.showSidebar
    };
  }
};
</script>
