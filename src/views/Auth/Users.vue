<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="6">
                <v-card>
                    <v-card-title class="justify-center">Registrar Usuario</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-form
                            ref="form"
                        >
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-text-field
                                        label="Nombre Completo"
                                        outlined
                                        :rules="rules.name"
                                        v-model="new_user.full_name"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field
                                        label="Nombre de usuario"
                                        outlined
                                        :rules="rules.username"
                                        v-model="new_user.username"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="4" class="pt-0">
                                    <v-select
                                        :items="document_types"
                                        v-model="new_user.document_type"
                                        outlined
                                        :rules="rules.document_type"
                                        label="Tipo de documento"
                                    ></v-select>
                                </v-col>
                                <v-col cols="8"  class="pt-0"> 
                                    <v-text-field
                                        label="Numero de documento"
                                        outlined
                                        v-model="new_user.document_number"
                                        :rules="rules.document_number"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-select
                                        :items="roles"
                                        v-model="new_user.rol"
                                        outlined
                                        label="rol"
                                    ></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" class="pt-0">
                                    
                                    <v-text-field
                                        v-model="new_user.password.value"
                                        :append-icon="new_user.password.is_shown ? 'mdi-eye' : 'mdi-eye-off'"
                                        :rules="rules.password"
                                        :type="new_user.password.is_shown ? 'text' : 'password'"
                                        label="Contraseña"
                                        outlined
                                        @click:append="new_user.password.is_shown = !new_user.password.is_shown"
                                    ></v-text-field>

                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" class="pt-0" align="center">
                                    <v-btn
                                        color="blue"
                                        class="white--text"
                                        @click="registerUser"
                                    >
                                        Registrar
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                        
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="6">
                <v-card>
                    <v-card-title class="justify-center">Usuarios registrados</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        
                        <v-data-table
                            :headers="headers"
                            :items="items"
                            :items-per-page="items_per_page"
                            
                            :server-items-length="50"
                            class="elevation-1"
                            
                        >
                            
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-col>
            
        </v-row>
        <v-dialog
            v-model="dialog"
            max-width="400"
            scrollable
        >
            <v-card>
                <v-card-title>Modificar Usuario <v-spacer></v-spacer><v-btn text @click="dialog=false"><v-icon>mdi-close</v-icon></v-btn></v-card-title>
                <v-divider class="mb-4"></v-divider>
                <v-card-text>
                    <v-row>
                        <v-col
                            cols="12"
                        >
                            <v-row>
                                <v-col cols="12">

                                    <v-text-field
                                        label="Nombre Completo"
                                        outlined
                                        v-model="edit_user.full_name"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-text-field
                                        label="Nombre de usuario"
                                        outlined
                                        v-model="edit_user.username"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="4">
                                    <v-select
                                        label="Tipo de documento"
                                        :items="document_types"
                                        outlined
                                        v-model="edit_user.document_type"
                                    ></v-select>
                                </v-col>
                                <v-col cols="8">
                                    <v-text-field
                                        label="Número de documento"
                                        v-model="edit_user.document_number"
                                        outlined
                                    ></v-text-field>
                                </v-col>
                                
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        label="Contraseña"
                                        v-model="edit_user.password"
                                        outlined
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-switch
                                        v-model="edit_user.status"
                                        :label="`Estado: ${userStatus}`"
                                    ></v-switch>
                                </v-col>
                            </v-row>                            
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions class="d-flex flex-row-reverse">
                    <v-btn text color="red" small @click="closeDialog">Cancelar</v-btn>
                    <v-btn text color="green" small @click="updateUser">Guardar</v-btn>
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

import SnackBar from '../../components/SnackBar.vue';

export default {
    name:'Users',
    components:{
        'snackbar':SnackBar
    },
    data:()=>({
        rules:{
            name:[
                v => !!v || 'Debe ingresar un nombre.',
                v => /^[a-zA-ZáéíóúÁÉÍÓÚ ]+$/.test(v) || 'El nombre tiene caracteres no válidos.'
            ],
            username:[
                v => !!v || 'Debe ingresar un nombre de usuario',
                v => /^[a-z0-9._]+$/.test(v) || 'Caracteres válidos: letras minúsculas, números, punto (.) y guión bajo (_).',
                v => v.length >= 6 || 'Mínimo 6 caracteres.'
            ],
            document_type:[
                v => !!v || 'Debe seleccionar un tipo de documento.'
            ],
            document_number:[
                v => !!v || 'Debe ingresar un número de documento',
                v => /^[0-9]+$/.test(v) || 'Solo se aceptan números.'
            ],
            password:[
                v => !!v || 'Debe ingresar una contraseña',
                //v => /(?=.*[a-z]{1})(?=.*[A-Z]{1})(?=.*[0-9]{1})/.test(v) || 'La contraseña debe contener al menos una letra y...'
              //  v => /(?=.*[a-z]{1})(?=.*[0-9]{1})(?=.*[!@.*$%&()=?¿¡!]{1})/.test(v) || 'La contraseña debe contener al menos una letra, un número y uno de los siguientes símbolos: !@.*$%&()=?¿¡!',
                v => v.length >= 8 || 'Mínimo 8 caracteres',
            ],
            

        },
        dialog:false,
        headers:[
            {text:'Nombre',value:'full_name'},
            {text:'Nombre de usuario',value:'username'},
            {text:'Estado',value:'status'},
        ],
        new_user:{
            full_name:'',
            username:'',
            password:{
                value:'',
                is_shown:false
            },
            rol:'a',
            document_type:'CC',
            document_number:'123456789',
        },
        edit_user:{
            full_name:'',
            username:'',
            password:'',
            document_type:'',
            document_number:'',
            status:'',
        },
        document_types:['CC','CE'],
        roles:[
            {text:'Administrador', value:'a'},
            {text:'Operador', value:'o'},
        ],
        items:[],
        items_per_page:5,

        snackbar:{
            is_displayed:false,
            text:'',
            text_color:''
        }
    }),
    mounted(){
        this.$routeByRol(this.getUserFromStore());
        this.setUsers();
    },
    computed:{
        userStatus(){
            return this.edit_user.status ? 'activo' : 'inactivo';
        }
        
    },
    methods:{
        setUsers(){
            this.axios.get('/users')
            .then((r)=>{
                console.log(r);
                this.items = r.data
            }).catch((e)=>{
                console.log(e.response);
            });
        },
        ...mapGetters([
            'getUserFromStore'
        ]),
        closeDialog(){

            this.dialog = false;
            this.cleanEditForm();
            
        },
        cleanEditForm(){
            for(let i in this.edit_user){
                this.edit_user[i]='';
            }
            console.log(this.edit_user);
        },
        registerUser(){
            if(this.$refs.form.validate()){
                
                //Enviar datos de usuario al servidor
                this.axios.post('/users',{

                    name:this.new_user.full_name,
                    username:this.new_user.username,
                    document_number:this.new_user.document_type+' '+this.new_user.document_number,
                    rol:this.new_user.rol,
                    password:this.new_user.password.value

                }).then(()=>{
                    
                    this.$refs.form.reset();
                    this.snackbar.text = 'Usuario agregado correctamente';
                    this.snackbar.text_color = 'green';
                    this.items.push({
                        full_name:this.new_user.full_name,
                        username:this.new_user.username,
                        document_type:this.new_user.document_type,
                        document_number:this.new_user.document_number,
                        status:1,
                    })

                }).catch((e)=>{
                    
                    if(e.response.status == 422){
                        this.snackbar.text = e.response.data.errors[Object.keys(e.response.data.errors)[0]][0];

                    }else{
                        console.log(e.response)
                        this.snackbar.text = 'Error interno del servidor';
                    }
                    this.snackbar.text_color = 'red';

                }).finally(()=>{

                    this.snackbar.is_displayed = true;
                });
                
            }
            
        },
        updateUser(){
            //Enviar datos de usuario al servidor
            let status = 1;

            if(status == 1){

                this.snackbar.text = 'Usuario actualizado correctamente';
                this.snackbar.text_color = 'green';

            }else{

                this.snackbar.text = '[Mostrar error de servidor]';
                this.snackbar.text_color = 'red';

            }
            
            this.snackbar.is_displayed = true;
            
        },
        
        editUser(user_clicked){
            
            this.edit_user.full_name = user_clicked.full_name;
            this.edit_user.username = user_clicked.username;
            this.edit_user.password = user_clicked.password;
            this.edit_user.document_type = user_clicked.document_type;
            this.edit_user.document_number = user_clicked.document_number;
            this.edit_user.status = user_clicked.status;
            this.dialog = true;
        },
        pageUpdated(){
            alert('Se pulsó una flecha de la tabla');
        },
        itemsPerPageUpdated(){
            alert('Se actualizó el numero de registros por pagina');
        },

    }
    
}
</script>
