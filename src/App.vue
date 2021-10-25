<template>
  <v-app>
    <v-app-bar
      app
      color="white"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="@/assets/logo.png"
          transition="scale-transition"
          width="200"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        text
        color="#1a4e78"
        @click.stop="drawer = !drawer"
      >
        <span class="mr-2">Menú</span>
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      bottom
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
                Servicios
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item
            v-for="(service, i) in services"
            :key="i"
          >
            <v-list-item-title @click="menuItemClic(service.route)"><v-btn text color="#1a4e78"><v-icon>{{service.icon}}</v-icon> {{service.name}}</v-btn></v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>
<style>
  .dark-blue{
    color:#1a4e78
  }
  .medium-blue{
    color:#4e9fc1
  }
  
</style>
<script>

export default {
  name: 'App',

  data: () => ({
    drawer:false,
    services:[
      {name:"Turismo",icon:"mdi-wallet-travel",route:"turismo"},
      {name:"Créditos",icon:"mdi-credit-card",route:"creditos"},
      {name:"Educación",icon:"mdi-school",route:"educacion"},
      {name:"Recreación y deporte",icon:"mdi-football",route:"recreacion-y-deporte"},
      {name:"Subsidios",icon:"mdi-currency-usd",route:"subsidios"},
      {name:"Vivienda",icon:"mdi-home",route:"vivienda"},
      {name:"Agencia de empleo",icon:"mdi-account-box",route:"agencia-de-empleo"},
      {name:"Convenios",icon:"mdi-group",route:"convenios"},
      
    ]
  }),
  methods:{
    menuItemClic(route){
      alert(route);
      this.drawer = !this.drawer;
      this.redirect(route);
    },
    redirect(route){
      this.$router.push(route);
    }
  }
};
</script>
