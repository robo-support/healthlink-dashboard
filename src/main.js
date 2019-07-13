import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router"; 
import store from './store.js';
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css";

Vue.prototype.$http = axios;

import Login from "./components/views/auth/Login.vue";
import Dashboard from "./components/views/Dashboard.vue";

Vue.use(VueRouter);


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

const token = localStorage.getItem('token')
if(token) {
	Vue.prototype.$http.defaults.headers.common['Authorization'] = token
	Vue.prototype.$http.defaults.headers.common['Access-Control-Allow-Origin'] = 'healthlink.network*'
}

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
