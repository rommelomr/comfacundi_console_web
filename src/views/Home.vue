<template>
  <v-container>
    <v-row class="text-center mt-3">
      <v-col class="mb-4">
        <v-card>
          <v-card-text>

            <span class="display-1 font-weight-bold">
              Bienvenido a Comfacundi Console
            </span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import {mapActions,mapGetters} from 'vuex';
  export default {
    name: 'Home',
    mounted(){
      this.storeCovenants();
      this.$routeByRol(this.getUserFromStore());
    },
    
    computed:{
      ...mapGetters({
        covenants:'getCovenants',
      })
    },
    methods:{
      ...mapGetters([
        'getUserFromStore'
      ]),
      ...mapActions([
        'storeCovenants'
      ]),
    }
  }
</script>
