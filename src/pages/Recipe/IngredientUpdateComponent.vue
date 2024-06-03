<template>
    <div class="form-container" v-if="editableIngredient">
        <form @submit.prevent="submitUpdate" class="form-grid">
            <div class="p-field">
                <label for="name">{{ $t('ingredients_add_component.ingredient_name') }}</label>
                <input type="text" id="name" v-model="editableIngredient.name"
                    :placeholder="$t('ingredients_add_component.ingredient_name_placeholder')" class="input-style" />
            </div>
            <div class="p-field">
                <label for="quantity">{{ $t('ingredients_add_component.ingredient_quantity') }}</label>
                <input type="number" id="quantity" v-model.number="editableIngredient.quantity" class="input-style" />
            </div>
            <div class="p-field">
                <label for="unit">{{ $t('ingredients_add_component.ingredient_unit') }}</label>
                <Dropdown id="dietDropdown" v-model="editableIngredient.unit" :options="measurementOptions"
                    optionLabel="label" optionValue="value"
                    :placeholder="$t('ingredients_add_component.ingredient_unit_placeholder')" />
            </div>
            <div class="p-field">
                <label for="notes">{{ $t('ingredients_add_component.ingredient_notes') }}</label>
                <textarea id="notes" v-model="editableIngredient.notes" rows="3" class="textarea-style"></textarea>
            </div>
            <div class="button-container">
                <button type="submit" class="green-button">{{ $t('ingredients_add_component.ingredient_save') }}</button>
                <button type="button" class="cancel-button"
                    @click="$emit('closeForm')">{{ $t('ingredients_add_component.ingredient_cancel') }}</button>
            </div>
        </form>
    </div>
</template>
  
<script>
import axios from 'axios';
import Dropdown from 'primevue/dropdown';

export default {
    props: ['selectedIngredient'],
    data() {
        return {
            editableIngredient: { ...this.selectedIngredient },
            measurementOptions: [
                { label: this.$t('measurement.empty'), value: '' },
                { label: this.$t('measurement.gram'), value: this.$t('measurement.gram') },
                { label: this.$t('measurement.kilogram'), value: this.$t('measurement.kilogram') },
                { label: this.$t('measurement.milligram'), value: this.$t('measurement.milligram') },
                { label: this.$t('measurement.ounce'), value: this.$t('measurement.ounce') },
                { label: this.$t('measurement.pound'), value: this.$t('measurement.pound') },
                { label: this.$t('measurement.milliliter'), value: this.$t('measurement.milliliter') },
                { label: this.$t('measurement.liter'), value: this.$t('measurement.liter') },
                { label: this.$t('measurement.teaspoon'), value: this.$t('measurement.teaspoon') },
                { label: this.$t('measurement.tablespoon'), value: this.$t('measurement.tablespoon') },
                { label: this.$t('measurement.fluid_ounce'), value: this.$t('measurement.fluid_ounce') },
                { label: this.$t('measurement.cup'), value: this.$t('measurement.cup') },
                { label: this.$t('measurement.pint'), value: this.$t('measurement.pint') },
                { label: this.$t('measurement.quart'), value: this.$t('measurement.quart') },
                { label: this.$t('measurement.gallon'), value: this.$t('measurement.gallon') },
                { label: this.$t('measurement.pinch'), value: this.$t('measurement.pinch') },
                { label: this.$t('measurement.dash'), value: this.$t('measurement.dash') },
                { label: this.$t('measurement.scoop'), value: this.$t('measurement.scoop') },
                { label: this.$t('measurement.pack'), value: this.$t('measurement.pack') },
                { label: this.$t('measurement.slice'), value: this.$t('measurement.slice') },
                { label: this.$t('measurement.piece'), value: this.$t('measurement.piece') },
                { label: this.$t('measurement.can'), value: this.$t('measurement.can') },
                { label: this.$t('measurement.jar'), value: this.$t('measurement.jar') },
                { label: this.$t('measurement.bottle'), value: this.$t('measurement.bottle') },
                { label: this.$t('measurement.bag'), value: this.$t('measurement.bag') },
                { label: this.$t('measurement.box'), value: this.$t('measurement.box') }
            ]
        };
    },
    components: {
        Dropdown
    },
    watch: {
        selectedIngredient: {
            handler(newValue) {
                this.editableIngredient = { ...newValue };
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        async submitUpdate() {
            if (!this.editableIngredient.id) {
                alert('Invalid ingredient data');
                return;
            }
            const updateUrl = `/ingredientTrackers/${this.editableIngredient.id}`;
            try {
                const response = await axios.put(updateUrl, this.editableIngredient);
                if (response.status === 200) {
                    this.$emit('updateComplete');
                } else {
                    console.error('Failed to update ingredient with status:', response.status);
                    alert(`Failed to update ingredient. Server responded with status: ${response.status}`);
                }
            } catch (error) {
                console.error('Failed to update ingredient:', error);
                alert('Failed to update ingredient. Please check console for more details.');
            }
        },
        closeForm() {
            this.$emit('closeForm');
        }
    }
};
</script>
  
  
<style scoped>
.form-container {
    max-width: 800px;
    margin: 20px auto;
    padding: 30px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: white;
}

.form-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
}

.p-field {
    display: flex;
    flex-direction: column;
}

.input-style,
.textarea-style {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
}

.textarea-style {
    grid-column: span 2;
}

.button-container {
    grid-column: span 2;
    display: flex;
    justify-content: center;
}

.cancel-button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    outline: none;
    color: white;
    border: none;
    transition: background-color 0.3s;
    width: 50%;
    background-color: #f44336;
    transition: background-color 0.3s;
    margin-left: 10px;

    &:hover {
        background-color: darkred;
    }
}

.green-button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    outline: none;
    color: white;
    border: none;
    transition: background-color 0.3s;
    width: 50%;
    background-color: #28a745;
    transition: background-color 0.3s;
    width: 50%;

    &:hover {
        background-color: darkgreen;
    }
}
</style>
