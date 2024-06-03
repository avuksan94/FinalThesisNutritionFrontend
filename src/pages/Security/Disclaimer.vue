<template>
    <div class="disclaimer-box" v-if="isVisible">
      <h4>Disclaimer</h4>
      <p>
        Nutrio is still in the early stages of development. Please use the app at your own responsibility.
        The information provided by Nutrio is not intended to replace professional advice, diagnosis, or treatment.
        Always consult with a qualified and licensed physician or other medical care provider, and follow their advice
        without delay regardless of anything read on this application.
      </p>
      <button @click="acceptDisclaimer">I Understand</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isVisible: true 
      };
    },
    methods: {
      acceptDisclaimer() {
        this.isVisible = false;
        this.$emit('disclaimerAccepted');
      }
    }
  };
  </script>
  
  
  <style scoped>
  .disclaimer-box {
    width: 500px;
    background-color: #f4f3ef;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 8px;
    margin: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .disclaimer-box h4 {
    color: #333;
  }
  
  .disclaimer-box p {
    color: #666;
    font-size: 14px;
    line-height: 1.6;
  }
  
  button {
    background-color: #3db17c;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 4px;
    margin-top: 10px;
  }
  
  button:hover {
    background-color: #369f68;
  }
  </style>
  