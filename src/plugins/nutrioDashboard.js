// paperDashboard.js
import SidebarPlugin from "../components/SidebarPlugin/index";
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import "es6-promise/auto";
// CSS assets
import "bootstrap/dist/css/bootstrap.css";
import "@/assets/sass/paper-dashboard.scss";
import "@/assets/css/themify-icons.css";
import '@/assets/css/spinnerAnimation.css';

import 'bootstrap-icons/font/bootstrap-icons.css';

export default {
  install(app) {
    console.log("Starting to install SidebarPlugin");
    app.use(SidebarPlugin);
    console.log("SidebarPlugin installed");

    console.log("Starting to install GlobalComponents");
    app.use(GlobalComponents);
    console.log("GlobalComponents installed");

    console.log("Starting to install GlobalDirectives");
    app.use(GlobalDirectives);
    console.log("GlobalDirectives installed");
  },
};
