<template>
  <v-app  style="background:#1a4e78">
    <v-app-bar
      app
      color="white"
      dark
      v-if="$route.name!='login'"
    >
      <div class="d-flex align-center">
        
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="@/assets/logo.png"
          transition="scale-transition"
          width="200"
          @click="redirect('/')"
        />
      </div>
      <v-spacer></v-spacer>

      <v-btn
        text
        color="#1a4e78"
        @click.stop="drawer = !drawer"
      >
        <span class="mr-2">Menú <v-icon>mdi-menu</v-icon></span>
      </v-btn>
    </v-app-bar>

    <v-main>
      
      
      <router-view/>
    </v-main>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
        >
          
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h6 dark-blue">
                {{stored_user.name}}
              </v-list-item-title>
                <sub>{{stored_user.rol == 'a' ? 'Administrador':'Operador'}}</sub>
            </v-list-item-content>
          </v-list-item>
      
          <v-divider></v-divider>

            <v-list-item
              v-for="(account_item, j) in account_items"
              :key="'account'+j"
              @click="MenuItemClick(account_item.route)"
            >
              <v-list-item-title class="dark-blue" >{{account_item.name}}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-title class="dark-blue" >Cerrar sesión</v-list-item-title>
            </v-list-item>
            
          <v-divider></v-divider>
          <div v-if="stored_user.rol == 'o'">

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="text-h6 dark-blue">
                  Servicios
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
        
            <v-divider></v-divider>
        
            <v-list-item
              v-for="(convenant, i) in covenants"
              :key="'covenants'+i"
              @click="MenuItemClick(convenant.route)"
            >
              <v-list-item-title class="dark-blue" >{{convenant.name}}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="MenuItemClick('/convenios/inhabilitados')">
              <v-list-item-title class="dark-blue">Convenios inhabilitados</v-list-item-title>
            </v-list-item>

            <v-divider></v-divider>

          </div>

          <div v-else-if="stored_user.rol == 'a'">

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="text-h6 dark-blue">
                  Administración
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
        
            <v-divider></v-divider>
              <v-list-item @click="MenuItemClick('/usuarios')">
                <v-list-item-title class="dark-blue" >{{"Gestionar Usuarios"}}</v-list-item-title>
              </v-list-item>
          </div>
          
          
      
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <snackbar
      v-if="snackbar.is_displayed"
      :data="snackbar"
    />
  </v-app>
</template>
<style>

  .dark-blue{
    color:#1a4e78 !important;
  }
  .medium-blue{
    color:#4e9fc1 !important;
  }
  
</style>
<script>

import {mapActions,mapGetters, mapMutations} from 'vuex';
import SnackBar from './components/SnackBar.vue';

export default {
  components:{ 'snackbar': SnackBar },
  name: 'App',

  data: () => ({
    stored_user:{},
    drawer:false,
    snackbar:{
      is_displayed:false,
      text:'',
      text_color:''
    },
    account_items:[
      {name:"Mi perfil",route:"/perfil"},
      
    ],
    
  }),
  computed:{
    ...mapGetters({
      covenants:'getCovenants'
    })
  },
  beforeMount(){
    
    this.getCovenants() == [] ? this.storeCovenants():null;
    
    this.authToken() != '' ? this.axios.defaults.headers.common['Authorization'] = 'Bearer '+this.authToken():null;
    
  },
  mounted(){
    
    
    this.stored_user = this.getUserFromStore();
    

  },
  methods:{

    ...mapActions([
      'storeCovenants'
    ]),
    ...mapGetters([
      'authToken',
      'getCovenants',
      'getUserFromStore'
    ]),
    ...mapMutations([
      'CLEAR_USER_DATA',
      'CLEAR_COVENANTS',
    ]),
    MenuItemClick(route){
      this.drawer = !this.drawer;
      this.$router.push(route);
      console.log(this.$route.name);
      if(this.$route.name == 'EditCovenant'){
        location.reload();
      }
    },
    logout(){
      console.log();
      this.CLEAR_USER_DATA();
      this.CLEAR_COVENANTS();

      this.snackbar.text_color = 'blue';
      this.snackbar.text = '¡Hasta luego!';

      this.snackbar.is_displayed = true;
      
      this.axios.get('/logout')
      .then((r)=>{
        console.log(r.data);

      }).catch((e)=>{
        console.log(e.response)
      }).finally(()=>{
        this.$router.push('/login');
      });
    }
  }
};
</script>
