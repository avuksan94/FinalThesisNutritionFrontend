<template>
    <div class="form-container">
        <div class="row justify-content-center">
            <Button :label="$t('ingredients_add_component.ingredient_add')" icon="pi pi-plus" class="orange-button"
                @click="toggleFormVisibility" />
        </div>
        <div v-show="formVisible" class="p-fluid">
            <br>
            <div class="p-field">
                <label for="name">{{ $t('ingredients_add_component.ingredient_name') }}</label>
                <InputText id="name" v-model="item.name"
                    :placeholder="$t('ingredients_add_component.ingredient_name_placeholder')"
                    :class="{ 'is-invalid': v$.item.name.$error }" />
                <div v-if="v$.item.name.$error" class="error-message">
                    <span v-if="v$.item.name.required.$invalid">{{ $t('ingredients_add_component.error_one') }}</span>
                    <span v-else-if="v$.item.name.maxLength.$invalid">{{ $t('ingredients_add_component.error_two') }}</span>
                    <span v-else-if="v$.item.name.onlyLetters.$invalid">{{ $t('ingredients_add_component.error_three')
                    }}</span>
                </div>
            </div>

            <div class="p-field">
                <label for="quantity">{{ $t('ingredients_add_component.ingredient_quantity') }}</label>
                <InputNumber id="quantity" v-model="item.quantity" incrementButtonIcon="pi pi-plus"
                    decrementButtonIcon="pi pi-minus" />
            </div>

            <div class="p-field">
                <label for="unit">{{ $t('ingredients_add_component.ingredient_unit') }}</label>
                <Dropdown id="dietDropdown" v-model="item.unit" :options="measurementOptions" optionLabel="label"
                    optionValue="value" :placeholder="$t('ingredients_add_component.ingredient_unit_placeholder')" />
            </div>

            <div class="row justify-content-center">
                <Button :label="$t('ingredients_add_component.ingredient_save')" class="green-button" icon="pi pi-check"
                    @click="addItem" />
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import { mapMutations } from 'vuex';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Textarea from 'primevue/textarea';
import Dropdown from 'primevue/dropdown';
import { required, maxLength } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const onlyLetters = (value) => {
    if (value === '') return true;
    return /^[a-zA-ZÀ-ž\s]*$/.test(value);
};


export default {
    components: {
        Button, InputText, InputNumber, Textarea, Dropdown
    },
    data() {
        return {
            formVisible: false,
            item: {
                name: '',
                quantity: 1,
                unit: '',
                notes: ''
            },
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
    validations() {
        return {
            item: {
                name: { required, maxLength: maxLength(50), onlyLetters }
            }
        }
    },
    setup() {
        const v$ = useVuelidate();
        return { v$ };
    },
    methods: {
        ...mapMutations(['addIngredient']),
        toggleFormVisibility() {
            this.formVisible = !this.formVisible;
        },
        addItem() {
            this.v$.$validate().then((valid) => {
                console.log('Validation state:', this.v$.item.name);
                if (valid) {
                    this.addIngredient(this.item);
                    this.resetForm();
                    this.formVisible = false;
                } else {
                    console.error('Validation failed.');
                }
            });
        },
        async addIngredient(ingredientData) {
            const username = localStorage.getItem("nutrioUser");
            const token = localStorage.getItem("token");
            if (!username || !token) {
                console.error("Username or token not found in storage.");
                return;
            }

            const urlUser = `/ingredientTrackerByUsername/${username}`;
            try {
                const response = await axios.post(urlUser, ingredientData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                this.$store.commit('addIngredient', response.data);
            } catch (error) {
                console.error("Error creating ingredient:", error);
            }
        },
        resetForm() {
            this.item = { name: '', quantity: 1, unit: '', notes: '' };
        }
    }
};
</script>

<style scoped>
.p-field {
    margin-bottom: 1rem;
    display: block;
    margin-bottom: 5px;
}

.form-container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: white;
}

.orange-button,
.green-button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    outline: none;
    color: white;
    border: none;
    transition: background-color 0.3s;
    width: 60%;
}

.orange-button {
    background-color: orange;

    &:hover {
        background-color: darkorange;
    }

    &:focus {
        box-shadow: 0 0 0 2px rgba(255, 165, 0, 0.5);
    }
}

.green-button {
    background-color: #28a745;

    &:hover {
        background-color: darkgreen;
    }
}

.error-message {
    color: red;
    font-size: 0.75rem;
    margin-top: 4px;
}

.is-invalid {
    border-color: red;
}

select,
.p-multiselect {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: white;
}
</style>

