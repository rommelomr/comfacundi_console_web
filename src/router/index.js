import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Auth/Login.vue';
import NotFoundPage from '../views/NotFoundPage.vue';
import Users from '../views/Auth/Users.vue';
import EditCovenant from '../views/EditCovenant.vue';
import CreateCovenant from '../views/CreateCovenant.vue';
import DisabledCovenants from '../views/DisabledCovenants.vue';
import Profile from '../views/Auth/Profile.vue';

Vue.use(VueRouter)

/*
  Visibility type indicates that a page can be displayed to
  only logged users (private), such as a dashboard; or only
  not logged users (outside), such as the login view. In other
  case, the view can be displayed for all type of user.

  "roles" indicate which types of user can access to the view.
  If te values is an empty array, means that all roles can
  access to that view
*/

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      visibility:{
        type:'private',
        roles:['o']
      }
    }
  },
  {
    path: '/login',
    name: 'login',
    component:Login,
    meta:{
      visibility:{
        type:'outside',
      }
    }
  },
  {
    path: '/usuarios',
    name: 'users',
    component:Users,
    meta:{
      visibility:{
        type:'private',
        roles:['a']
      }
    }
  },
  {
    path: '/convenios/agregar/:id',
    name: 'CreateCovenant',
    component:CreateCovenant,
    meta:{
      visibility:{
        type:'private',
        roles:['o']
      }
    }
  },
  {
    path: '/convenios/inhabilitados',
    name: 'DisabledCovenants',
    component:DisabledCovenants,
    meta:{
      visibility:{
        type:'private',
        roles:['o']
      }
    }
  },
  {
    path: '/convenios/:id',
    name: 'EditCovenant',
    component:EditCovenant,
    meta:{
      visibility:{
        type:'private',
        roles:['o']
      }
    }
  },
  {
    path: '/perfil',
    name: 'Profile',
    component:Profile,
    meta:{
      visibility:{
        type:'private',
        roles:[]
      }
    }
  },
  {
    path: '/*',
    name: 'NotFoundPage',
    component:NotFoundPage
  }
  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
