import { FormGroupInput, Card, Button } from "../components/index";
const GlobalComponents = {
  install(Vue) {
    Vue.component("fg-input", FormGroupInput);
    Vue.component("card", Card);
    Vue.component("p-button", Button);
  },
};

export default GlobalComponents;
