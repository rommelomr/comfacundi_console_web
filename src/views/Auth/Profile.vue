<template>
    <v-container>
        <v-row>
            <v-col cols="12" lg="6" offset-lg="3">
                <v-card>

                    <v-card-title>Mi perfil</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-text-field
                            outlined
                            label="Nombre"
                            readonly
                            :value="user.name"
                        ></v-text-field>
                        <v-text-field
                            outlined
                            label="Número de documento"
                            readonly
                            :value="user.document_number"
                        ></v-text-field>
                        <v-form ref="form">

                            <v-text-field
                                outlined
                                label="Nombre de usuario"
                                v-model="user.username"
                                :rules="rules.username"
                            ></v-text-field>
                            
                            <v-text-field
                                outlined
                                label="Cambiar contraseña"
                                v-model="user.password"
                                :rules="rules.password"
                                type="password"
                            ></v-text-field>
                            
                            <v-text-field
                                outlined
                                label="Repetir contraseña"
                                v-model="user.password_confirm"
                                :rules="[comparePasswords]"
                                type="password"
                            ></v-text-field>

                        </v-form>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions class="d-flex flex-row-reverse">
                        <v-btn text color="green" @click="saveChanges">Guardar</v-btn>
                    </v-card-actions>
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
import { mapGetters } from 'vuex';

//Aquí importo la libreria de axios

import SnackBar from '../../components/SnackBar.vue';

export default {

    name:'Profile',
    components:{
        'snackbar':SnackBar
    },
    data:()=>({
        user:{
            name:'',
            username:'',
            document_number:'',
            password:'',
            password_confirm:''
        },
        snackbar:{
            is_displayed:false,
            text:'',
            text_color:''
        },
        rules:{
            username:[
                v => !!v || 'Debe ingresar un nombre de usuario',
                v => /^[a-z0-9._]+$/.test(v) || 'Caracteres válidos: letras minúsculas, números, punto (.) y guión bajo (_).',
                v => v.length >= 6 || 'Mínimo 6 caracteres.'
            ],
            password:[
                v => !!v || 'Debe ingresar una contraseña',
                //v => /(?=.*[a-z]{1})(?=.*[A-Z]{1})(?=.*[0-9]{1})/.test(v) || 'La contraseña debe contener al menos una letra y...'
                //v => /(?=.*[a-z]{1})(?=.*[0-9]{1})(?=.*[!@.*$%&()=?¿¡!]{1})[.]{8,}/.test(v) || 'La contraseña debe contener al menos una letra, un número y uno de los siguientes símbolos: !@.*$%&()=?¿¡!',
                v => v.length >= 8 || 'Mínimo 8 caracteres',
            ]
        }
    }),
    mounted(){
        

        this.setUser();
        
        this.$routeByRol(this.getUserFromStore());
    },
    methods:{
        saveProfile(){
            return this.axios.post('/save_profile',{

                username:this.user.username,
                password:this.user.password

            }).then(()=>{

                this.snackbar.text = 'Datos guardados correctamente';
                this.snackbar.text_color = 'green';
            }).catch((e)=>{
                console.log(e.response)
                this.snackbar.text = e.response.statusText;
                this.snackbar.text_color = 'red';

            }).finally(()=>{
                
                this.snackbar.is_displayed = true;

            });
        },
        ...mapGetters([
            'getUserFromStore'
        ]),
        async saveChanges(){

            await this.saveProfile();

        },
        comparePasswords(v){
            return v == this.user.password || 'Las contraseñas no coinciden'
        },
        setUser(){
            
            this.axios.get('/profile')
            .then((r)=>{
                this.user.name = r.data.name;
                this.user.document_number = r.data.document_number;
                this.user.username = r.data.username;
            })
            .catch((e)=>{

                console.log(e)
            });

        }
    }
}

</script>
