<template>
  <card>
    <div>
      <div>
        <h4 class="title">
          <i class="bi bi-bandaid"></i>
          {{ $t('user_health_card.health_tracking') }}
        </h4>
        <div class="user-info">
          <h5>{{ $t('user_health_card.diet') }} {{ user.diet }}</h5>
          <h5>{{ $t('user_health_card.allergies') }}</h5>
          <ul>
            <li v-for="allergy in user.allergies" :key="allergy">{{ allergy }}</li>
          </ul>
          <h5>{{ $t('user_health_card.health_conditions') }}</h5>
          <ul>
            <li v-for="condition in user.healthConditions" :key="condition">{{ condition }}</li>
          </ul>
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
      user: {
        diet: "",
        allergies: [],
        healthConditions: []
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
      ]
    };
  },
  computed: {
    healthUpdated() {
      return this.$store.state.healthInfoUpdated;
    }
  },
  watch: {
    healthUpdated(newVal) {
      if (newVal) {
        this.fetchUserData();
        this.$store.commit('setUserInfoUpdated', false);
      }
    }
  },
  methods: {
    getLabel(options, value) {
      const option = options.find(option => option.value === value);
      return option ? option.label : value;
    },
    async fetchUserData() {
      const username = localStorage.getItem("nutrioUser");
      const token = localStorage.getItem("token");

      if (!username || !token) {
        console.error("Username or token not found in storage.");
        return;
      }

      const urlUser = `usersBasic/${username}`;
      try {
        const userData = await axios.get(urlUser);
        const userId = userData.data.id;
        const urlHealthTracker = `healthTrackersBasic/${userId}`;

        const response = await axios.get(urlHealthTracker);
        this.user.diet = this.getLabel(this.dietOptions, response.data.diet);
        this.user.allergies = response.data.knownAllergies.map(allergy => this.getLabel(this.allergyOptions, allergy));
        this.user.healthConditions = response.data.healthConditions.map(condition => this.getLabel(this.healthConditionOptions, condition));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  },
  mounted() {
    this.fetchUserData();
  }
};
</script>

<style scoped>
.author h4.title {
  font-size: 1.25rem;
  color: #333;
}

.user-info h5 {
  margin-top: 10px;
  color: #555;
}

.user-info ul {
  list-style-type: none;
  padding: 0;
}

.user-info li {
  padding: 5px 0;
  border-bottom: 1px solid #eee;
}
</style>
