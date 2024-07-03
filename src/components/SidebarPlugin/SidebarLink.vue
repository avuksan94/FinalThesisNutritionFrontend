<template>
  <component
    :is="tag"
    @click="hideSidebar"
    class="nav-item"
    v-bind="$attrs"
  >
    <a class="nav-link">
      <slot>
        <i v-if="icon" :class="icon"></i>
        <p>{{ name }}</p>
      </slot>
    </a>
  </component>
</template>

<script>
export default {
  name: "sidebar-link",
  inheritAttrs: false,
  inject: {
    autoClose: {
      default: true,
    },
    addLink: {
      default: () => {},
    },
    removeLink: {
      default: () => {},
    },
  },
  props: {
    name: String,
    icon: String,
    tag: {
      type: String,
      default: "router-link",
    },
  },
  methods: {
    hideSidebar() {
      if (this.autoClose) {
        this.$sidebar.displaySidebar(false);
        console.log("Hiding sidebar -- from SidebarLink.vue");
      }
    },
    isActive() {
      return this.$el.classList.contains("active");
    },
  },
  mounted() {
    this.addLink?.(this);
  },
  beforeUnmount() { 
    this.$el.parentNode?.removeChild(this.$el);
    this.removeLink?.(this);
  },
};
</script>

<style scoped>

</style>
