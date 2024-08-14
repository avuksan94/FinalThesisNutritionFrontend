<template>
    <div class="card">
      <div class="flex row">
        <img src="@/assets/img/foodPics/WheresThaData.webp" alt="Guide Image" />
        <img src="@/assets/img/foodPics/WheresThaData2.webp" alt="Guide Image" />
        <img src="@/assets/img/foodPics/WheresThaData3.webp" alt="Guide Image" />
      </div>
      
      <h4>{{ $t('instructions.message_one') }}</h4>
      <a href="https://drive.google.com/file/d/1QBnAJa2MddLKBGZ5Qvr59Bvdze6FURdz/view?usp=sharing" target="_blank">
        <small>{{ $t('instructions.message_three')  }}</small>
      </a>
    </div>
  </template>
  
  <script>
  export default {
    name: "InstructionCard"
  }
  </script>
  
  <style scoped>
  .card {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 1px solid #ddd;
    padding: 20px;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  img {
    margin-right: 10px;
    width: 150px; 
    height: 150px;
    border-radius: 8px; 
  }
  
  h4 {
    text-align: center;
    margin: 0;
    margin-top: 10px; 
  }
  
  a {
    text-decoration: none;
    color: #007bff; 
    margin-top: 10px; 
  }
  
  a:hover {
    text-decoration: underline; 
  }
  
  a small {
    display: block;
  }
  </style>
  