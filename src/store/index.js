import Vue from 'vue'
import Vuex from 'vuex'
import VuexPeristence from 'vuex-persist';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:{
      auth_token:'',
      name:'',
      username:'',
      rol:''
      
    },
    covenants:[]
  },
  mutations: {
    SET_COVENANTS(state, covenants){
      state.covenants = covenants;
    },
    STORE_USER_DATA(state, user_data){
      
      Vue.set(state,'user',user_data);

    },
    CLEAR_COVENANTS(state){

      Vue.set(state,'covenants',[]);

    },
    CLEAR_USER_DATA(state){
      
      Vue.set(state,'user',{
        auth_token:'',
        name:'',
        username:'',
        rol:'',
      })
    }
    
    
  },
  getters:{
    getCovenants(state){
      return state.covenants;
    },
    authToken(state){
      return state.user.auth_token;
    },
    getUserFromStore(state){
      return state.user;
    }

  },
  actions: {

    storeCovenants({ commit }){

      if(this.state.covenants.length == 0){
        
        //EMULATING REQUEST COVENANTS FROM DB
        let covenants = [];
        Vue.axios.get('/covenants')
        .then((r)=>{
          console.log(r);
          for(let i in r.data.data){
            covenants.push({
              name:r.data.data[i].name,
              route:'/convenios/'+r.data.data[i].id
            });
          }
        }).catch((e)=>{
          console.log(e.response);
          console.log('Los convenios no han sido cargados de la base de datos');
        }).finally(()=>{
          
          commit('SET_COVENANTS',covenants);

        });
        
      }


    },
  },
  modules: {
  },
  plugins:[
    new VuexPeristence({
      storage:window.localStorage
    }).plugin
  ]
})
