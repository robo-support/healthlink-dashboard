import Vue from "vue";
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import App from "./App.vue";
import VueRouter from "vue-router"; 
import store from './store.js';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.prototype.$http = axios;

import Login from "./components/views/auth/Login.vue";
import Dashboard from "./components/views/Dashboard.vue";

Vue.use(VueRouter);
Vue.use(BootstrapVue);


const routes = [ 
	{ 
		name: "login", 
		path: "/", 
		component: Login
	}, 
	{
		name: "dashboard", 
		path: "/dashboard", 
		component: Dashboard
	}
]



const router = new VueRouter({ 
	routes, 
	mode: "history"
});

Vue.router = router;

// terminal console for production tips
Vue.config.productionTip = false;



new Vue({
	el: "#app",
	store,
	render: h => h(App),
	router, 
	root: "/"
});
