<template>
  <custom-pop-up v-if="popup.isVisible" :title="popup.title" :message="popup.message" :confirm="popup.confirm"
    :isVisible="popup.isVisible" @confirmed="handlePopupConfirm" @cancelled="handlePopupCancel"></custom-pop-up>
  <div class="need-space" v-if="ingredients.length > 0">
    <div class="row justify-content-center">
      <div v-if="isLoading" class="pixel-spinner">
        <div class="pixel-spinner-inner"></div>
      </div>
    </div>
    <div class="row justify-content-center">
      <button class="orange-button" @click="generateItems">
        {{ $t('generate_meal_plan.generate_message') }}
      </button>
    </div>
    <br><br>
    <div>
      <SelectButton v-model="selectedIngredients" :options="ingredients" optionLabel="name" multiple />
    </div>
  </div>
  <div v-else>
    <NothingHereAddIngredientsComponent />
  </div>
</template>
  
<script>
import SelectButton from 'primevue/selectbutton';
import axios from 'axios';
import NothingHereAddIngredientsComponent from '../PlaceHolderComponents/NothingHereAddIngredientsComponent.vue';
import CustomPopUp from '../Notification/CustomPopUp.vue';

export default {
  components: {
   SelectButton,
   NothingHereAddIngredientsComponent,
   CustomPopUp
  },
  data() {
    return {
      isLoading: false,
      selectedIngredients: [],
      ingredients: [],
      popup: {
        isVisible: false,
        title: '',
        message: '',
        confirm: false
      }
    };
  },
  mounted() {
    this.fetchUserIngredients();
  },
  methods: {
    fetchUserIngredients() {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('nutrioUser');
      if (!username || !token) {
        console.error("Username or token not found in storage.");
        return;
      }
      axios.get(`/ingredientTrackersByUsername/${username}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(response => {
        this.ingredients = response.data.map(ing => ({
          name: `${ing.name} (${ing.quantity} ${ing.unit})`,
          code: ing.id
        }));
      }).catch(error => {
        console.error("Error fetching all user ingredients:", error);
      });
    },
    async generateItems() {
      if (this.selectedIngredients.length === 0) {
        //alert(this.$t('warning_messages.select_ingredients'));
        this.setPopUpMessages('INFO', this.$t('warning_messages.select_ingredients'));
        return;
      }
      const token = localStorage.getItem("token");
      const username = localStorage.getItem("nutrioUser");
      if (!token) {
        alert("You are not logged in.");
        return;
      }
      this.isLoading = true;
      try {
        var headers = {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
        };
        const ingredientsData = this.selectedIngredients.map(ing => `${ing.name} ${ing.quantity || ''} ${ing.unit || ''}`.trim());
        const response = await axios.post(`/mealPlansGenByUsername/${username}`, JSON.stringify(ingredientsData), { headers });
        console.log(response);
        this.$store.commit('setMealPlanData', response.data);
        this.isLoading = false;
      } catch (error) {
        console.error('Error generating meal plan:', error);
        this.isLoading = false;
        //alert(this.$t('warning_messages.something_went_wrong'));
        this.setPopUpMessages('ERROR', this.$t('warning_messages.something_went_wrong'));
      }
    },
    handlePopupConfirm() {
      this.popup.isVisible = false;
    },
    handlePopupCancel() {
      this.popup.isVisible = false;
    },
    setPopUpMessages(messageLevel, message) {
      this.popup.isVisible = true;
      this.popup.title = messageLevel;
      this.popup.message = message;
      this.popup.confirm = false;
    }
  }
}
</script>
  
<style scoped>
.need-space{
  margin-bottom: 30px;
}

:deep .p-selectbutton {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); 
  gap: 10px; 
}

:deep .p-selectbutton .p-button {
  border-radius: 50px;
  border: 2px solid #dddddd;
  padding: 5px 10px;
  font-size: 16px;
  line-height: 1.5;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: #333;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: background-color 0.3s, color 0.3s;
  text-align: center;
}

:deep .p-selectbutton .p-button:hover {
  background-color: #f8f8f8;
}

:deep .p-selectbutton .p-button.p-highlight {
  background-color: orange;
  color: white;
  border-color: orange;
}

.orange-button {
  background-color: orange;
  border: none;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
}

.orange-button:hover {
  background-color: darkorange;
}
</style>
