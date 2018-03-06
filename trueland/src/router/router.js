import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/view/index.vue'
import { VueRouter } from '../../node_modules/.3.0.1@vue-router/types/router';


const router = [
    {
        path:'/foo',
        component:Index,
        name:'index'
    },{
        path:'/hl',
        component:HelloWorld,
        name:'hl'
    }
];

const router = new VueRouter({
    routes
});