<template>
  <div v-if="isVisible" class="popup-overlay">
    <div class="popup">
      <div class="popup-header">
        <h3>{{ title }}</h3>
      </div>
      <div class="popup-body">
        <p>{{ message }}</p>
      </div>
      <div class="popup-footer">
        <button v-if="confirm" @click="confirmAction">Confirm</button>
        <button @click="cancelAction">{{ confirm ? 'Cancel' : 'OK' }}</button>
      </div>
    </div>
  </div>
</template>

  <script>
export default {
  props: {
    title: String,
    message: String,
    confirm: Boolean,
    isVisible: Boolean 
  },
  methods: {
    confirmAction() {
      this.$emit('confirmed');
    },
    cancelAction() {
      this.$emit('cancelled');
    }
  }
}
</script>

<style scoped>
.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75); 
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 90000;
}

.popup {
    background: #f4f3ef; 
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 300px;
    z-index: 1001;
    display: flex;
    flex-direction: column;
    align-items: center; 
}

.popup-header h3, .popup-body p, .popup-footer button {
    text-align: center; 
}

.popup-header {
    width: 100%;
}

.popup-body {
    width: 100%;
}

.popup-footer {
    width: 100%;
    display: flex;
    justify-content: center; 
}

.popup-footer button {
    margin: 0 5px; 
    background-color: #3db17c; 
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;
}

.popup-footer button:hover {
    background-color: #369f68;
}
</style>
