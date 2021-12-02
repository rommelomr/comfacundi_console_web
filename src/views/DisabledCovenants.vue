<template>
    <v-container>
        <v-card>
            <v-card-title>
                Servicios inhabilitados
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="searcher"
                    label="Buscar"
                    clearable
                ></v-text-field>

            </v-card-title>
            <v-divider></v-divider>
                <v-list>
                <v-list-item-group>
                    <v-list-item
                        v-for="(item, i) in disabled_covenants"
                        :key="i"
                    >
                        <v-list-item-content>
                            <v-list-item-title>
                                
                                <p>{{item.covenant}}</p>
                                <div>

                                    <v-btn text @click="selectCovenant(i,'eliminar')"><v-icon>mdi-delete</v-icon></v-btn>
                                    <v-btn text @click="selectCovenant(i,'restaurar')"><v-icon>mdi-restore</v-icon></v-btn>
                                </div>

                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
                </v-list>
                
        </v-card>
        <v-dialog v-model="dialog"
            max-width="600"
        >
            <v-card>
                <v-card-title>
                    ¿Está seguro que desea {{dialog_option}} este convenio?
                </v-card-title>
                <v-card-text>

                    <span v-if="(dialog_option == 'eliminar')" class="red--text">Esta accion no se podrá deshacer</span>

                </v-card-text>
                <v-card-actions class="d-flex justify-end">
                    <v-btn class="white--text ma-2" @click="confirmDialogOption(true)" color="green">Si, lo estoy</v-btn>
                    <v-btn class="white--text ma-2" @click="confirmDialogOption(false)" color="#E57373">Mejor no</v-btn>
                </v-card-actions>

            </v-card>
        </v-dialog>
        <snackbar
            v-if="snackbar.is_displayed"
            :data="snackbar"
        />
    </v-container>
</template>
<script>
import { mapGetters } from 'vuex';

    import SnackBar from '../components/SnackBar.vue';

    export default {

        name:'DisabledCovenants',
        components:{
            'snackbar':SnackBar
        },
        data:()=>({
            snackbar:{
                is_displayed:false,
                text_color:'',
                text:'',
            },

            dialog:false,
            searcher:'',
            page:3,
            disabled_covenants:[
                
            ],
            dialog_option:'',
            covenant_id:0,
        }),
        mounted(){
            this.setDisabledCovenants();
            this.$routeByRol(this.getUserFromStore());
        },
        methods:{
            setDisabledCovenants(){
                this.axios.get('/disabled_covenants')
                .then((r)=>{
                    
                    for(let i in r.data){
                        this.disabled_covenants.push({
                            id:r.data[i].id,
                            covenant:r.data[i].name
                        })
                    }
                    console.log(this.disabled_covenants);

                }).catch((e)=>{
                    console.log(e.response);

                });
            },
            ...mapGetters([
                'getUserFromStore'
            ]),
            openDialog(is_opened){
                this.dialog = is_opened;
            },
            selectCovenant(covenant_id,option){
                this.dialog_option=option;
                this.covenant_id = covenant_id;
                this.dialog=true;
            },

            deleteCovenant(covenant_index){
                //enviar post al servidor con el id para eliminar el convenio
                this.axios.post('/delete_covenant_definitely',{
                    id:this.disabled_covenants[covenant_index].id
                }).then((r)=>{
                    
                    this.snackbar.text = 'Convenio eliminado permanentemente';
                    this.snackbar.text_color = 'green';
                    console.log(r.data);

                }).catch((e)=>{
                    console.log(e.response);

                }).finally(()=>{
                    
                    this.disabled_covenants.splice(covenant_index,1);
                });

                this.snackbar.is_displayed = true;
            },
            restoreCovenant(covenant_index){

                this.axios.post('/restore_covenant',{
                    id:this.disabled_covenants[covenant_index].id
                }).then((r)=>{
                    
                    this.snackbar.text = 'Convenio restaurado';
                    this.snackbar.text_color = 'green';
                    console.log(r.data);

                }).catch((e)=>{
                    console.log(e.response);

                }).finally(()=>{
                    
                    this.disabled_covenants.splice(covenant_index,1);
                });

                this.snackbar.is_displayed = true;
            },
            confirmDialogOption(confirm){

                this.dialog = false;
                
                if(confirm){
                    switch(this.dialog_option){
                        case 'eliminar':{
                            this.deleteCovenant(this.covenant_id);
                            break;
                        }
                        case 'restaurar':{
                            this.restoreCovenant(this.covenant_id);
                            break;

                        }
                        
                    }
                }else{
                    this.covenant_id = 0;
                    this.dialog_option = '';
                }

            },
            changePage(p){
                alert(p);
            },
            nextPage(p){
                
                alert(p);
            },
            previousPage(p){
                
                alert(p);
            }
        }


    }

</script>
