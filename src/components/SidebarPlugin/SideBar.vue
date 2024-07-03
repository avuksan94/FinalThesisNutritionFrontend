<template>
  <div class="sidebar" :data-background-color="backgroundColor" :data-active-color="activeColor">
    <div class="sidebar-wrapper" id="style-3">
      <div class="logo">
        <a href="#" class="simple-text">
         Nutrio App
        </a>
      </div>
      <ul class="nav">
        <slot name="links">
          <sidebar-link
            v-for="(link, index) in sidebarLinks"
            :key="index"
            :to="link.path"
            :name="link.name"
            :icon="link.icon"
          >
          </sidebar-link>
        </slot>
      </ul>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, provide, watch, onMounted, ref, computed } from 'vue';
import MovingArrow from "./MovingArrow.vue";
import SidebarLink from "./SidebarLink.vue";

export default defineComponent({
  components: {
    MovingArrow,
    SidebarLink,
  },
  props: {
    title: {
      type: String,
      default: "Paper Dashboard",
    },
    backgroundColor: {
      type: String,
      default: "black",
      validator: value => ["white", "black", "darkblue"].includes(value),
    },
    activeColor: {
      type: String,
      default: "success",
      validator: value => ["primary", "info", "success", "warning", "danger"].includes(value),
    },
    sidebarLinks: {
      type: Array,
      default: () => [],
    },
    autoClose: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const links = reactive([]);

    provide('autoClose', props.autoClose);
    provide('addLink', (link) => {
      links.push(link);
    });
    provide('removeLink', (link) => {
      const index = links.indexOf(link);
      if (index > -1) {
        links.splice(index, 1);
      }
    });

    const linkHeight = 65;
    const activeLinkIndex = ref(0);

    function findActiveLink() {
      links.forEach((link, index) => {
        if (link.isActive()) {
          activeLinkIndex.value = index;
        }
      });
    }

    watch(() => props.$route, findActiveLink, {
      immediate: true,
    });

    onMounted(findActiveLink);

    return {
      arrowMovePx: computed(() => linkHeight * activeLinkIndex.value),
    };
  }
});
</script>

<style scoped>

</style>
