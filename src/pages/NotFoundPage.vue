<template>
  <div class="card full-screen">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <img src="@/assets/img/foodPics/404NotFound.webp" alt="Image not found" />
      </div>
      <h4>
        {{ $t('not_found.message_one') }}
      </h4>
      <h4>
        {{ $t('not_found.message_two') }}
      </h4>
    </div>
  </div>
</template>


<script>
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh; 
  padding: 20px;
  border-radius: 0;
  margin: 0; 
  background-color: white; 
  box-shadow: none; 
}

.container-fluid {
  width: 100%; 
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

img {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  margin-bottom: 10px;
}

h4 {
  text-align: center;
  margin: 0;
}

a {
  text-decoration: none;
  color: #000;
}

a small {
  display: block;
}
</style>
