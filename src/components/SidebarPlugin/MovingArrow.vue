<template>
  <div class="moving-arrow" :style="arrowStyle"></div>
</template>

<script>
export default {
  name: "MovingArrow",
  props: {
    moveY: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    /**
     * Styles to animate the arrow
     * @returns {{transform: string}}
     */
    arrowStyle() {
      return {
        transform: `translate3d(0px, ${this.moveY}px, 0px)`,
      };
    },
  },
};
</script>

<style lang="scss">
$bg-nude: #f4f3ef !default;

:root {
  --arrow-position-left: 243px;
  --arrow-position-top: 95px;
}

.moving-arrow {
  border-right: 17px solid $bg-nude;
  border-top: 17px solid transparent;
  border-bottom: 17px solid transparent;
  display: inline-block;
  position: absolute;
  left: var(--arrow-position-left);
  top: var(--arrow-position-top);
  transition: all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1);
}

@media (max-width: 992px) {
  .moving-arrow {
    display: none;
  }
}
</style>
