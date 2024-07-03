<template>
  <custom-pop-up v-if="popup.isVisible" :title="popup.title" :message="popup.message" :confirm="popup.confirm"
  :isVisible="popup.isVisible" @confirmed="handlePopupConfirm" @cancelled="handlePopupCancel"></custom-pop-up>
  <card class="card" :title="$t('user_health_form.title')">
    <div class="form-container">
      <div class="row justify-content-center">
        <div v-if="isLoading" class="pixel-spinner">
          <div class="pixel-spinner-inner"></div>
        </div>
      </div>
      <form @submit.prevent="updateHealthConditions">
        <div class="row justify-content-center">
          <div class="form-group">
            <label for="dietDropdown">{{ $t('user_health_card.diet') }}</label>
            <Dropdown
              id="dietDropdown"
              v-model="userHealthInfo.diet"
              :options="dietOptions"
              optionLabel="label"
              :class="{ 'is-invalid': v$.userHealthInfo.diet.$error }"
              :placeholder="$t('user_health_form.diet')"
            />
            <br>
            <span v-if="v$.userHealthInfo.diet.$error" class="error-message">
              {{ $t('edit_health_info_errors.diet') }}
            </span>
          </div>
        </div>

        <div class="form-group">
          <label for="allergies">{{ $t('user_health_card.allergies') }}</label>
          <MultiSelect
            v-model="userHealthInfo.allergies"
            display="chip"
            filter
            :options="allergyOptions"
            optionLabel="label"
            :class="{ 'is-invalid': v$.userHealthInfo.allergies.$error }"
            :placeholder="$t('user_health_form.allergies')"
            :maxSelectedLabels="4"
            :selectAll="false"
            class="w-full"
            @update:modelValue="selected => checkSelection(selected, 'allergies')"
          />
          <span v-if="v$.userHealthInfo.allergies.$error" class="error-message">
            {{ $t('edit_health_info_errors.allergies') }}
          </span>
        </div>

        <div class="form-group">
          <label for="conditions">{{ $t('user_health_card.health_conditions') }}</label>
          <MultiSelect
            v-model="userHealthInfo.healthConditions"
            display="chip"
            filter
            :options="healthConditionOptions"
            optionLabel="label"
            :class="{ 'is-invalid': v$.userHealthInfo.healthConditions.$error }"
            :placeholder="$t('user_health_form.health_conditions')"
            :maxSelectedLabels="4"
            :selectAll="false"
            class="w-full"
            @update:modelValue="selected => checkSelection(selected, 'healthConditions')"
          />
          <span v-if="v$.userHealthInfo.healthConditions.$error" class="error-message">
            {{ $t('edit_health_info_errors.health_conditions') }}
          </span>
        </div>

        <div class="form-actions">
          <p-button type="warning" round @click.native.prevent="updateHealthConditions">
            {{ $t('user_health_form.update_btn') }}
          </p-button>
        </div>
      </form>
    </div>
  </card>
</template>

<script>
import axios from "axios";
import MultiSelect from 'primevue/multiselect';
import Dropdown from 'primevue/dropdown';
import { required, minLength } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import CustomPopUp from '../Notification/CustomPopUp.vue';

export default {
  components: {
    MultiSelect,
    Dropdown,
    CustomPopUp
  },
  data() {
    return {
      popup: {
        isVisible: false,
        title: '',
        message: '',
        confirm: false
      },
      isLoading: false,
      userHealthInfo: {
        diet: null,
        allergies: [],
        healthConditions: [],
      },
      dietOptions: [
        { label: this.$t('global_diets.none'), value: "NONE" },
        { label: this.$t('global_diets.vegan'), value: "VEGAN" },
        { label: this.$t('global_diets.vegetarian'), value: "VEGETARIAN" },
        { label: this.$t('global_diets.ketogenic'), value: "KETOGENIC" },
        { label: this.$t('global_diets.paleo'), value: "PALEO" },
        { label: this.$t('global_diets.gluten_free'), value: "GLUTEN_FREE" },
        { label: this.$t('global_diets.mediterranean'), value: "MEDITERRANEAN" },
        { label: this.$t('global_diets.low_carb'), value: "LOW_CARB" },
        { label: this.$t('global_diets.dairy_free'), value: "DAIRY_FREE" },
      ],
      allergyOptions: [
        { label: this.$t('global_allergies.none'), value: "NONE" },
        { label: this.$t('global_allergies.apple'), value: "APPLE" },
        { label: this.$t('global_allergies.banana'), value: "BANANA" },
        { label: this.$t('global_allergies.beef'), value: "BEEF" },
        { label: this.$t('global_allergies.buckwheat'), value: "BUCKWHEAT" },
        { label: this.$t('global_allergies.carrot'), value: "CARROT" },
        { label: this.$t('global_allergies.celery'), value: "CELERY" },
        { label: this.$t('global_allergies.chicken'), value: "CHICKEN" },
        { label: this.$t('global_allergies.coriander'), value: "CORIANDER" },
        { label: this.$t('global_allergies.corn'), value: "CORN" },
        { label: this.$t('global_allergies.eggs'), value: "EGGS" },
        { label: this.$t('global_allergies.fish'), value: "FISH" },
        { label: this.$t('global_allergies.garlic'), value: "GARLIC" },
        { label: this.$t('global_allergies.gelatin'), value: "GELATIN" },
        { label: this.$t('global_allergies.kiwi_fruit'), value: "KIWI_FRUIT" },
        { label: this.$t('global_allergies.lupin'), value: "LUPIN" },
        { label: this.$t('global_allergies.milk'), value: "MILK" },
        { label: this.$t('global_allergies.mollusks'), value: "MOLLUSKS" },
        { label: this.$t('global_allergies.mutton'), value: "MUTTON" },
        { label: this.$t('global_allergies.mustard'), value: "MUSTARD" },
        { label: this.$t('global_allergies.onions'), value: "ONIONS" },
        { label: this.$t('global_allergies.peach'), value: "PEACH" },
        { label: this.$t('global_allergies.peanuts'), value: "PEANUTS" },
        { label: this.$t('global_allergies.plum'), value: "PLUM" },
        { label: this.$t('global_allergies.poppy_seeds'), value: "POPPY_SEEDS" },
        { label: this.$t('global_allergies.red_meat'), value: "RED_MEAT" },
        { label: this.$t('global_allergies.rice'), value: "RICE" },
        { label: this.$t('global_allergies.sesame'), value: "SESAME" },
        { label: this.$t('global_allergies.sesame_seeds'), value: "SESAME_SEEDS" },
        { label: this.$t('global_allergies.shellfish'), value: "SHELLFISH" },
        { label: this.$t('global_allergies.sulfites'), value: "SULFITES" },
        { label: this.$t('global_allergies.sunflower_seeds'), value: "SUNFLOWER_SEEDS" },
        { label: this.$t('global_allergies.tomato'), value: "TOMATO" },
        { label: this.$t('global_allergies.tree_nuts'), value: "TREE_NUTS" },
        { label: this.$t('global_allergies.wheat'), value: "WHEAT" }
      ],
      healthConditionOptions: [
        { label: this.$t('global_health_conditions.none'), value: "NONE" },
        { label: this.$t('global_health_conditions.acne'), value: "ACNE" },
        { label: this.$t('global_health_conditions.acute_kidney_injury'), value: "ACUTE_KIDNEY_INJURY" },
        { label: this.$t('global_health_conditions.acute_pancreatitis'), value: "ACUTE_PANCREATITIS" },
        { label: this.$t('global_health_conditions.addison_disease'), value: "ADDISON_DISEASE" },
        { label: this.$t('global_health_conditions.arrhythmia'), value: "ARRHYTHMIA" },
        { label: this.$t('global_health_conditions.asthma'), value: "ASTHMA" },
        { label: this.$t('global_health_conditions.bladder_cancer'), value: "BLADDER_CANCER" },
        { label: this.$t('global_health_conditions.breast_cancer'), value: "BREAST_CANCER" },
        { label: this.$t('global_health_conditions.celiac_disease'), value: "CELIAC_DISEASE" },
        { label: this.$t('global_health_conditions.cervical_cancer'), value: "CERVICAL_CANCER" },
        { label: this.$t('global_health_conditions.chronic_fatigue_syndrome'), value: "CHRONIC_FATIGUE_SYNDROME" },
        { label: this.$t('global_health_conditions.chronic_kidney_disease'), value: "CHRONIC_KIDNEY_DISEASE" },
        { label: this.$t('global_health_conditions.chronic_obstructive_pulmonary_disease'), value: "CHRONIC_OBSTRUCTIVE_PULMONARY_DISEASE" },
        { label: this.$t('global_health_conditions.chronic_pancreatitis'), value: "CHRONIC_PANCREATITIS" },
        { label: this.$t('global_health_conditions.cirrhosis'), value: "CIRRHOSIS" },
        { label: this.$t('global_health_conditions.colon_cancer'), value: "COLON_CANCER" },
        { label: this.$t('global_health_conditions.colon_polyps'), value: "COLON_POLYPS" },
        { label: this.$t('global_health_conditions.colonic_dyssynergia'), value: "COLONIC_DYSSYNERGIA" },
        { label: this.$t('global_health_conditions.colorectal_cancer'), value: "COLORECTAL_CANCER" },
        { label: this.$t('global_health_conditions.congestive_heart_failure'), value: "CONGESTIVE_HEART_FAILURE" },
        { label: this.$t('global_health_conditions.coronary_artery_disease'), value: "CORONARY_ARTERY_DISEASE" },
        { label: this.$t('global_health_conditions.crohns_disease'), value: "CROHNS_DISEASE" },
        { label: this.$t('global_health_conditions.cushing_syndrome'), value: "CUSHING_SYNDROME" },
        { label: this.$t('global_health_conditions.depression'), value: "DEPRESSION" },
        { label: this.$t('global_health_conditions.diabetes'), value: "DIABETES" },
        { label: this.$t('global_health_conditions.diabetes_mellitus_type_1'), value: "DIABETES_MELLITUS_TYPE_1" },
        { label: this.$t('global_health_conditions.diabetes_mellitus_type_2'), value: "DIABETES_MELLITUS_TYPE_2" },
        { label: this.$t('global_health_conditions.diverticulitis'), value: "DIVERTICULITIS" },
        { label: this.$t('global_health_conditions.diverticulosis'), value: "DIVERTICULOSIS" },
        { label: this.$t('global_health_conditions.endometrial_cancer'), value: "ENDOMETRIAL_CANCER" },
        { label: this.$t('global_health_conditions.eczema'), value: "ECZEMA" },
        { label: this.$t('global_health_conditions.epilepsy'), value: "EPILEPSY" },
        { label: this.$t('global_health_conditions.fatty_liver_disease'), value: "FATTY_LIVER_DISEASE" },
        { label: this.$t('global_health_conditions.fibromyalgia'), value: "FIBROMYALGIA" },
        { label: this.$t('global_health_conditions.gastritis'), value: "GASTRITIS" },
        { label: this.$t('global_health_conditions.gastroesophageal_reflux_disease'), value: "GASTROESOPHAGEAL_REFLUX_DISEASE" },
        { label: this.$t('global_health_conditions.glomerulonephritis'), value: "GLOMERULONEPHRITIS" },
        { label: this.$t('global_health_conditions.gout'), value: "GOUT" },
        { label: this.$t('global_health_conditions.heart_attack'), value: "HEART_ATTACK" },
        { label: this.$t('global_health_conditions.heart_issues'), value: "HEART_ISSUES" },
        { label: this.$t('global_health_conditions.hepatic_encephalopathy'), value: "HEPATIC_ENCEPHALOPATHY" },
        { label: this.$t('global_health_conditions.hepatic_steatosis'), value: "HEPATIC_STEATOSIS" },
        { label: this.$t('global_health_conditions.hepatitis_a'), value: "HEPATITIS_A" },
        { label: this.$t('global_health_conditions.hepatitis_b'), value: "HEPATITIS_B" },
        { label: this.$t('global_health_conditions.hepatitis_c'), value: "HEPATITIS_C" },
        { label: this.$t('global_health_conditions.hepatitis_d'), value: "HEPATITIS_D" },
        { label: this.$t('global_health_conditions.hepatitis_e'), value: "HEPATITIS_E" },
        { label: this.$t('global_health_conditions.hiv'), value: "HIV" },
        { label: this.$t('global_health_conditions.hyper_and_hypo_thyroidism'), value: "HYPER_AND_HYPO_THYROIDISM" },
        { label: this.$t('global_health_conditions.hypertension'), value: "HYPERTENSION" },
        { label: this.$t('global_health_conditions.insulin_resistance'), value: "INSULIN_RESISTANCE" },
        { label: this.$t('global_health_conditions.interstitial_nephritis'), value: "INTERSTITIAL_NEPHRITIS" },
        { label: this.$t('global_health_conditions.irritable_bowel_syndrome'), value: "IRRITABLE_BOWEL_SYNDROME" },
        { label: this.$t('global_health_conditions.ischemic_colitis'), value: "ISCHEMIC_COLITIS" },
        { label: this.$t('global_health_conditions.islet_cell_tumor'), value: "ISLET_CELL_TUMOR" },
        { label: this.$t('global_health_conditions.kidney_cancer'), value: "KIDNEY_CANCER" },
        { label: this.$t('global_health_conditions.kidney_infection'), value: "KIDNEY_INFECTION" },
        { label: this.$t('global_health_conditions.kidney_stones'), value: "KIDNEY_STONES" },
        { label: this.$t('global_health_conditions.leukemia'), value: "LEUKEMIA" },
        { label: this.$t('global_health_conditions.liver_cancer'), value: "LIVER_CANCER" },
        { label: this.$t('global_health_conditions.lung_cancer'), value: "LUNG_CANCER" },
        { label: this.$t('global_health_conditions.migraine'), value: "MIGRAINE" },
        { label: this.$t('global_health_conditions.multiple_myeloma'), value: "MULTIPLE_MYELOMA" },
        { label: this.$t('global_health_conditions.muscular_dystrophies'), value: "MUSCULAR_DYSTROPHIES" },
        { label: this.$t('global_health_conditions.nephrotic_syndrome'), value: "NEPHROTIC_SYNDROME" },
        { label: this.$t('global_health_conditions.oral_cancer'), value: "ORAL_CANCER" },
        { label: this.$t('global_health_conditions.osteoarthritis'), value: "OSTEOARTHRITIS" },
        { label: this.$t('global_health_conditions.osteopenia'), value: "OSTEOPENIA" },
        { label: this.$t('global_health_conditions.osteoporosis'), value: "OSTEOPOROSIS" },
        { label: this.$t('global_health_conditions.ovarian_cancer'), value: "OVARIAN_CANCER" },
        { label: this.$t('global_health_conditions.pancreatic_cancer'), value: "PANCREATIC_CANCER" },
        { label: this.$t('global_health_conditions.pancreatic_cysts'), value: "PANCREATIC_CYSTS" },
        { label: this.$t('global_health_conditions.pancreatic_divisum'), value: "PANCREATIC_DIVISUM" },
        { label: this.$t('global_health_conditions.pancreatic_insufficiency'), value: "PANCREATIC_INSUFFICIENCY" },
        { label: this.$t('global_health_conditions.pancreatic_pseudocyst'), value: "PANCREATIC_PSEUDOCYST" },
        { label: this.$t('global_health_conditions.peripheral_artery_disease'), value: "PERIPHERAL_ARTERY_DISEASE" },
        { label: this.$t('global_health_conditions.peripheral_neuropathy'), value: "PERIPHERAL_NEUROPATHY" },
        { label: this.$t('global_health_conditions.peptic_ulcer_disease'), value: "PEPTIC_ULCER_DISEASE" },
        { label: this.$t('global_health_conditions.pneumonia'), value: "PNEUMONIA" },
        { label: this.$t('global_health_conditions.polycystic_kidney_disease'), value: "POLYCYSTIC_KIDNEY_DISEASE" },
        { label: this.$t('global_health_conditions.primary_biliary_cholangitis'), value: "PRIMARY_BILIARY_CHOLANGITIS" },
        { label: this.$t('global_health_conditions.psoriasis'), value: "PSORIASIS" },
        { label: this.$t('global_health_conditions.pulmonary_hypertension'), value: "PULMONARY_HYPERTENSION" },
        { label: this.$t('global_health_conditions.rheumatoid_arthritis'), value: "RHEUMATOID_ARTHRITIS" },
        { label: this.$t('global_health_conditions.skin_cancer'), value: "SKIN_CANCER" },
        { label: this.$t('global_health_conditions.stomach_cancer'), value: "STOMACH_CANCER" },
        { label: this.$t('global_health_conditions.testicular_cancer'), value: "TESTICULAR_CANCER" },
        { label: this.$t('global_health_conditions.thyroid_cancer'), value: "THYROID_CANCER" },
        { label: this.$t('global_health_conditions.tuberculosis'), value: "TUBERCULOSIS" },
        { label: this.$t('global_health_conditions.ulcerative_colitis'), value: "ULCERATIVE_COLITIS" },
        { label: this.$t('global_health_conditions.zollinger_ellison_syndrome'), value: "ZOLLINGER_ELLISON_SYNDROME" }
      ],
    };
  },
  validations() {
    return {
      userHealthInfo: {
        diet: { required },
        allergies: { required, minLength: minLength(1) },
        healthConditions: { required, minLength: minLength(1) }
      }
    }
  },
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  methods: {
    checkSelection(selectedItems, modelKey) {
      const noneLabel = modelKey === 'allergies' ? this.$t('global_allergies.none') : this.$t('global_health_conditions.none');
      if (selectedItems.some(item => item.value === 'NONE')) {
        this.userHealthInfo[modelKey] = [{ label: noneLabel, value: "NONE" }];
      }
    },
    async updateHealthConditions() {
      this.v$.$touch();
      if (!this.v$.$invalid) {
        this.isLoading = true;
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("nutrioUser");
        if (!token) {
          alert("You are not logged in.");
          this.isLoading = false;
          return;
        }

        let diet = this.userHealthInfo.diet ? this.userHealthInfo.diet.value : null;
        let knownAllergies = this.userHealthInfo.allergies.map(a => a.value);
        let healthConditions = this.userHealthInfo.healthConditions.map(hc => hc.value);

        const userData = {
          diet: diet,
          knownAllergies: knownAllergies,
          healthConditions: healthConditions
        };

        console.log(userData);
        try {
          await axios.put(`/healthTrackersByUsername/${username}`, userData);
          this.$store.commit('setHealthInfoUpdated', true);
          this.isLoading = false;
          this.$router.go(0);
        } catch (error) {
          console.error("Error updating user health tracker:", error);
          this.isLoading = false;
          //alert(this.$t('warning_messages.failed_tracker'));
          this.setPopUpMessages('ERROR', this.$t('warning_messages.failed_tracker'))
        }
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
};
</script>

<style scoped>
.p-multiselect-header .p-checkbox.p-component {
  display: none !important;
}

.form-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

.loading-spinner {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

select,
.p-multiselect {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
}

.form-actions {
  text-align: center;
  padding-top: 20px;
}

.is-invalid {
  border-color: red;
}

.error-message {
  color: red;
  font-size: 0.75rem;
  margin-top: 4px; 
}
</style>
