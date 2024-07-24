<template>
  <card>
    <div>
      <div>
        <h4 class="title"> <i class="bi bi-box2-heart"></i>
          {{ $t('health_warning_component.information') }}
        </h4>
        <div class="user-info">
          <div v-if="warningMessage">
            <h5 class="warning-message">{{ $t('health_warning_component.warning_message') }} {{ warningMessage }}</h5>
          </div>
          <div v-if="dietPros && dietPros.length > 0">
            <h5>{{ $t('health_warning_component.diet_pros') }}</h5>
            <ul>
              <li v-for="pro in dietPros" :key="pro">{{ pro }}</li>
            </ul>
          </div>
          <div v-if="dietCons && dietCons.length > 0">
            <h5>{{ $t('health_warning_component.diet_cons') }}</h5>
            <ul>
              <li v-for="con in dietCons" :key="con">{{ con }}</li>
            </ul>
          </div>
          <div v-if="alternativeDiets && alternativeDiets.length > 0">
            <h5>{{ $t('health_warning_component.alternative_diets') }}</h5>
            <ul>
              <li v-for="alter in alternativeDiets" :key="alter">{{ alter }}</li>
            </ul>
          </div>
          <div class="warning-message" v-if="ingredientsToAvoid && ingredientsToAvoid.length > 0">
            <h5 class="warning-message">{{ $t('health_warning_component.ingredients_to_avoid') }}</h5>
            <ul>
              <li v-for="ingredient in ingredientsToAvoid" :key="ingredient">{{ ingredient }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </card>
</template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
          warningMessage: "",
          dietPros: [],
          dietCons: [],
          alternativeDiets: [],
          ingredientsToAvoid: []
      };
    },
    methods: {
      async fetchUserHealthWarning() {
        const username = localStorage.getItem("nutrioUser");
        const token = localStorage.getItem("token");
  
        if (!username || !token) {
          console.error("Username or token not found in storage.");
          return;
        }
  
        const url = `healthWarning/${username}`;
        try {
          const response = await axios.get(url);
          this.warningMessage = response.data.warningMessage;
          this.dietPros = response.data.dietPros;
          this.dietCons = response.data.dietCons;
          this.alternativeDiets = response.data.alternativeDiets;
          this.ingredientsToAvoid = response.data.ingredientsToAvoid;
        } catch (error) {
          console.error("Error fetching user data:", error);
          if (error.response) {
            console.error("Response status:", error.response.status);
          }
        }
      },
    },
    mounted() {
      this.fetchUserHealthWarning();
    }
  };
  </script>
  
<style scoped>

.user-info h5 {
  margin-top: 10px;
  color: #555;
  word-wrap: break-word; 
}

.user-info .warning-message {
  color: white;
  background-color: #d9534f;
  padding: 5px;
  border-radius: 4px;
  word-wrap: break-word;
}

.user-info ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.user-info li {
  padding: 5px 0;
  border-bottom: 1px solid #eee;
  word-wrap: break-word; 
}

p, li, h5, a {
  overflow-wrap: break-word;
}
</style>

  