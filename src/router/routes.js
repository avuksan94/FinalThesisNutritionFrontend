import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// USER pages
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import GenerateRecipe from "@/pages/GenerateRecipe.vue";
import MyRecipes from "@/pages/MyRecipes.vue";
import MyMealPlans from "@/pages/MyMealPlans.vue";
import GenerateMealPlan from "@/pages/GenerateMealPlan.vue";
import UserNutrition from "@/pages/UserNutrition.vue";
import CookBook from "@/pages/CookBook.vue";
import LogIn from "@/pages/Security/LogIn.vue";
import Register from "@/pages/Security/Register.vue"
import Disclaimer from "@/pages/Security/Disclaimer.vue";
import HealthConditionsSetup from "@/pages/HealthConditionsSetup.vue";
import MyIngredients from "@/pages/MyIngredients.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: LogIn,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/disclaimer",
    name: "disclaimer",
    component: Disclaimer,
  },
  {
    path: "/health-conditions-setup",
    name: "health conditions setup",
    component: HealthConditionsSetup,
  },
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard,
        meta: { title: 'routes.dashboard' }
      },
      {
        path: "stats",
        name: "User Profile",
        component: UserProfile,
        meta: { title: 'routes.user_profile' }
      },
      {
        path: "my-meal-plans",
        name: "My meal plans",
        component: MyMealPlans,
        meta: { title: 'routes.my_meal_plans' }
      },
      {
        path: "my-recipes",
        name: "My recipes",
        component: MyRecipes,
        meta: { title: 'routes.my_recipes' }
      },
      {
        path: "generate-recipe",
        name: "Generate recipes",
        component: GenerateRecipe,
        meta: { title: 'routes.generate_recipes' }
      },
      {
        path: "generate-meal-plan",
        name: "Generate meal plan",
        component: GenerateMealPlan,
        meta: { title: 'routes.generate_meal_plan' }
      },
      {
        path: "cookbook",
        name: "All recipes",
        component: CookBook,
        meta: { title: 'routes.cookbook' }
      },
      {
        path: "nutrition",
        name: "User nutrition",
        component: UserNutrition,
        meta: { title: 'routes.user_nutrition' }
      },
      {
        path: "my-ingredients",
        name: "User ingredients",
        component: MyIngredients,
        meta: { title: 'routes.user_ingredients' }
      }
    ],
  },
  { path: "/:pathMatch(.*)*", component: NotFound },
];

export default routes;

