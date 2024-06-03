<template>
  <div v-if="visible" :class="['notification', `notification-${type}`]" :style="notificationStyle">
    <span class="notification-icon" v-html="icon"></span>
    {{ message }}
    <p @click="hideNotification"></p>
  </div>
</template>
  
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'info' 
    },
    icon: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: 'normal' 
    },
    duration: {
      type: Number,
      default: 1000 
    }
  },
  computed: {
    notificationStyle() {
      return {
        backgroundColor: this.color,
        fontSize: this.size === 'small' ? '12px' : this.size === 'large' ? '18px' : '14px'
      };
    }
  },
  methods: {
    hideNotification() {
    const notificationElement = this.$el;
    notificationElement.classList.add('hide');
    setTimeout(() => {
      this.$emit('update:visible', false);
    }, 200); 
  }
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.hideNotification();
        }, this.duration);
      }
    }
  }
};
</script>
  
  
<style scoped>
.notification {
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}

.notification.hide {
  opacity: 0;
}

.notification-icon {
  margin-right: 10px;
}

.notification-info {
  background-color: #357bb4;
}

.notification-success {
  background-color: #3eb27c;
}

.notification-warning {
  background-color: #ffc107;
}

.notification-error {
  background-color: #f44336;
}</style>
  