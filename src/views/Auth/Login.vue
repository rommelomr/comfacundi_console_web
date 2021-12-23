<template>
  <v-container>
    <v-row class="text-center mt-16">
      <v-col cols="12" md="8" offset-md="2">
        <v-card>
            <v-card-title class="justify-center">
              <span class="display-1">Iniciar sesión</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-text-field
                label="Nombre de usuario"
                outlined
                v-model="username"
              ></v-text-field>
              <v-text-field
                label="Contraseña"
                outlined
                v-model="password"
                type="password"
              ></v-text-field>
              <v-btn text color="green" @click="login">Iniciar sesión</v-btn>
            </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <snackbar
      v-if="snackbar.is_displayed"
      :data="snackbar"
    />
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

  import SnackBar from '../../components/SnackBar.vue';

  export default {
    name: 'Login',
    components:{
      'snackbar' : SnackBar
    },
    data:()=>({
      username:'',
      password:'',
      snackbar:{
        is_displayed:false,
        text:'',
        text_color:''
      }
    }),
    mounted(){
      
      this.$routeByRol(this.getUserFromStore());
    },
    methods:{
      ...mapMutations([
        'STORE_USER_DATA'
      ]),
      ...mapGetters([
        'getUserFromStore'
      ]),
      login(){

        
        
        if(this.username != '' && this.password != ''){

          this.snackbar.text = 'cargando';
          this.snackbar.text_color = 'black';
          
          this.snackbar.is_displayed = true;

          this.axios.post('/login',{
            username:this.username,
            password:this.password
          }).then(r=>{
            
            console.log(r.data)
            
            this.STORE_USER_DATA({
              auth_token:r.data.token,
              name:r.data.user.name,
              username:r.data.user.username,
              rol:r.data.user.rol
            });

            this.snackbar.is_displayed = false;
            this.snackbar.text='Inicio de sesión exitoso';
            this.snackbar.text_color = 'green';
            //guardar token para la cabecera

          }).catch(e=>{
            console.log(e);
            
            this.snackbar.is_displayed = false;
            this.snackbar.text = 'Error '+e.response.status+': '+e.response.data.message;
            this.snackbar.text_color = 'red';
          
            
            
          }).finally(()=>{
            this.snackbar.is_displayed = true;
            window.location = '/';

          });
        }else{
          this.snackbar.text = 'Debe ingresar su nombre de usuario y contraseña';
          this.snackbar.text_color = 'red';
          this.snackbar.is_displayed = true;
        }
      },
      
    }
  }
</script>
