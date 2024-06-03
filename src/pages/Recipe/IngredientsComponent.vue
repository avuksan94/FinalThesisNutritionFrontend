<template>
    <div class="form-container">
    <div class="row ">
        <UpdateIngredient v-if="currentIngredient" :selectedIngredient="currentIngredient"
            @ingredientUpdated="refreshIngredients" @updateComplete="refreshIngredients"  @closeForm="closeForm"/>
    </div>
    <div class="card">
        <DataTable v-if="ingredients && ingredients.length" :value="ingredients"
        sortMode="multiple"
        paginator :rows="10"
            :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
            <Column field="name" :header="$t('ingredients.ingredient_name')" sortable></Column>
            <Column field="quantity" :header="$t('ingredients.ingredient_quantity')" sortable></Column>
            <Column field="unit" :header="$t('ingredients.ingredient_unit')" sortable></Column>
            <Column field="notes" :header="$t('ingredients.ingredient_notes')" sortable></Column>
            <Column>
                <template #body="slotProps">
                    <div class="row justify-content-center">
                        <Button icon="bi bi-pencil" class="blue-button" @click="editIngredient(slotProps.data)"></Button>
                        <Button icon="bi bi-eraser" class="red-button" @click="deleteIngredient(slotProps.data)"></Button>
                    </div>
                </template>
            </Column>
        </DataTable>
        <p v-else>{{ $t('ingredients.empty_warning') }}</p>
    </div>
    </div>
</template>
  
<script>
import { mapState, mapActions } from 'vuex';
import axios from 'axios';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import UpdateIngredient from '../Recipe/IngredientUpdateComponent.vue';

export default {
    components: {
        DataTable,
        Column,
        Button,
        UpdateIngredient
    },
    computed: {
        ...mapState(['ingredients', 'currentIngredient'])
    },
    methods: {
        ...mapActions(['closeUpdateForm']),
        fetchUserIngredients() {
            const username = localStorage.getItem("nutrioUser");
            const token = localStorage.getItem("token");

            if (!username || !token) {
                console.error("Username or token not found in storage.");
                return;
            }

            const allUserIngredients = `/ingredientTrackersByUsername/${username}`;
            axios.get(allUserIngredients, {
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(response => {
                this.$store.commit('setIngredients', response.data);
            }).catch(error => {
                console.error("Error fetching all user ingredients:", error);
            });
        },
        async deleteIngredient(ingredient) {
            const username = localStorage.getItem("nutrioUser");
            const token = localStorage.getItem("token");

            if (!username || !token) {
                console.error("Username or token not found in storage.");
                return;
            }

            try {
                await axios.delete(`/ingredientTrackers/${ingredient.id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                this.fetchUserIngredients(); 
            } catch (error) {
                console.error("Error deleting ingredient:", error);
            }
        },
        editIngredient(ingredient) {
            this.$store.commit('setCurrentIngredient', { ...ingredient });
        },
        refreshIngredients() {
            this.fetchUserIngredients();
            this.closeUpdateForm();
        },
        closeForm() {
            this.closeUpdateForm();
        }
    },
    mounted() {
        this.fetchUserIngredients();
    }
};
</script>  
  
<style scoped>
.form-container {
    margin: 20px auto;
    padding: 30px;
}
.red-button,
.blue-button {
    font-size: 16px;
    cursor: pointer;
    border-radius: 50%;
    outline: none;
    color: white;
    border: none;
    transition: background-color 0.3s;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin-right:10px;
}

.red-button {
    background-color: red;

    &:hover {
        background-color: darkred;
    }
}

.blue-button {
    background-color: orange;
    &:hover {
        background-color: darkorange;
    }
    &:focus {
        box-shadow: 0 0 0 2px rgba(255, 165, 0, 0.5);
    }
}
</style>
