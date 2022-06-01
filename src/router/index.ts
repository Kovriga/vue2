import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Login from "@/components/Login.vue";
import DashBoard from "@/components/DashBoard.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [

    {
        name: 'login',
        path: '/',
        component: Login,
        meta: {
            auth: true,
            title: 'Вход',
        },
    },
    {
        name: 'dashBoard',
        path: '/dash-boar',
        component: DashBoard,
        meta: {
            auth: true,
            title: 'Главная страница',
        },

    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
