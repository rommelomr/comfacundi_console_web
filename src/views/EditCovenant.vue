<template>
    <v-container>
        <v-card class="mb-4">
            <v-card-title>
                Modificar servicio
                <!--v-breadcrumbs :items="breadcrumbs">
                    <template v-slot:divider>
                        <v-icon small>mdi-chevron-right</v-icon>
                    </template>
                </v-breadcrumbs-->
            </v-card-title>
        </v-card>
        
            <v-card-text>
                <v-row>
                    
                    <v-col cols="12">
                        <v-card>
                            <v-card-title class="d-block">
                                <v-row class="pb-0">
                                    <v-col cols="5">
                                        <v-text-field
                                            :append-icon="'mdi-content-save'"
                                            @click:append="saveName"
                                            v-model="covenant.name"
                                        ></v-text-field>
                                        <label v-if="!covenant.enabled" class="red--text subtitle-1">(Inhabilitado)</label>
                                        <v-btn v-if="!covenant.enabled" text x-small class="green--text" @click="enableCovenant(covenant.id)">
                                            Habilitar
                                        </v-btn>
                                        <v-btn v-else text x-small class="red--text" @click="disableCovenant(covenant.id)">
                                            Inhabilitar
                                        </v-btn>
                                    </v-col>
                                </v-row>

                            </v-card-title>
                        
                            <v-divider></v-divider>

                            <v-card-text>
                                <p class="mt-2"><b>Subservicios:</b></p>

                                <v-chip
                                    v-for="(subcovenant, i) in covenant.subcovenants"
                                    :key="subcovenant+i"
                                    class="mx-1 my-1"
                                    @click="setCovenant(subcovenant.id)"
                                >
                                    {{subcovenant.name}}
                                </v-chip>
                                <div class="d-flex flex-row-reverse">

                                    <v-btn color="green" text @click="$router.push('/convenios/agregar/'+covenant.id)">
                                        <span class="d-none d-lg-block">Agregar subservicio</span>
                                        <v-icon small class="d-block d-lg-none">mdi-plus-box</v-icon>
                                    </v-btn>
                                    
                                </div>
                                
                                <v-divider></v-divider>  

                                <p class="mt-2"><b>Título:</b></p>
                                <v-row class="pb-0">
                                    <v-col cols="5">
                                        <v-text-field
                                            :append-icon="'mdi-content-save'"
                                            @click:append="saveTitle"
                                            v-model="covenant.title"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-divider></v-divider>

                                <v-row class="py-4">
                                    
                                    <v-col cols="6" class="align-self-center">
                                        <v-file-input
                                            label="Imagen del convenio"
                                            outlined
                                            prepend-icon="mdi-camera"
                                            v-model="covenant.new_image"
                                            @change="previewImage(covenant.new_image,'image_url')"
                                        ></v-file-input>
                                        <center>
                                            <v-btn text color="blue" @click="saveImage(covenant.id)">
                                                Guardar imagen
                                            </v-btn>
                                        </center>
                                    </v-col>
                                    <v-col cols="6">
                                        <center>

                                            <v-img
                                                width="190"
                                                :src="covenant.image_url"
                                            ></v-img>

                                        </center>
                                    </v-col>
                                </v-row>


                                <v-divider></v-divider>

                                <p><b>Descripción</b></p>

                                <p></p>
                                <v-textarea

                                    outlined
                                    v-model="covenant.description"

                                ></v-textarea>
                                <div class="d-flex flex-row-reverse">
                                    <v-btn text @click="saveDescription(covenant.id)" color="blue">
                                        <span class="d-none d-lg-block">Guardar cambios</span>
                                        <v-icon small class="d-block d-lg-none">mdi-content-save</v-icon>
                                    </v-btn>
                                </div>
                                <v-divider></v-divider>
                                    <p class="mt-2"><b>Precio:</b></p>
                                    <v-text-field
                                        outlined
                                        label="Actualizar el precio"
                                        v-model="covenant.price"
                                    ></v-text-field>
                                <div class="d-flex flex-row-reverse">
                                    <v-btn text @click="savePrice(covenant.id)" color="blue">
                                        <span class="d-none d-lg-block">Guardar cambios</span>
                                        <v-icon small class="d-block d-lg-none">mdi-content-save</v-icon>
                                    </v-btn>
                                </div>
                                <v-divider></v-divider>
                                    <v-row class="py-4">
                                        <v-col cols="6" class="align-self-center">
                                            <v-file-input
                                                label="Ícono del servicio"
                                                outlined
                                                prepend-icon="mdi-camera"
                                                v-model="covenant.new_icon"
                                                @change="previewImage(covenant.new_icon,'icon_url')"
                                            ></v-file-input>
                                            <center>
                                                <v-btn text color="blue" @click="saveIcon(covenant.id,covenant.icon)">
                                                    Guardar icono
                                                </v-btn>
                                            </center>
                                        </v-col>
                                        <v-col cols="6">
                                            <center>
                                                <v-img
                                                    width="190"
                                                    :src="covenant.icon_url"
                                                >
                                                </v-img>
                                            </center>
                                        </v-col>
                                    </v-row>

                                <v-divider></v-divider>
                                    
                                    <p class="mt-2"><b>Tablas:</b></p>
                                    <v-row class="py-4">
                                        <v-col
                                            v-for="(table,i) in covenant.tables"
                                            :key="'table' + i"
                                            cols="3"
                                            class="align-self-center"
                                        >
                                            <v-card>
                                                <v-img
                                                    @click="openOverlay(table.table)"
                                                    :src="table.table"
                                                >
                                                </v-img>
                                                <v-card-actions class="justify-center">
                                                    <v-btn x-small text color="red" @click="deleteTable(table.id, i)">Eliminar tabla</v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-col>
                                        <v-col cols="12">

                                            <p v-if="covenant.tables.length == 0">No hay tablas guardadas</p>
                                            <div v-if="table_input_is_displayed">
                                                <v-file-input
                                                    outlined
                                                    multiple
                                                    label="Agregar imágenes de tablas"
                                                    v-model="new_tables"
                                                    :rules="[required]"
                                                ></v-file-input>
                                                <v-btn text x-small color="green" @click="addTables">Guardar</v-btn>
                                                <v-btn text x-small color="red" @click="table_input_is_displayed = false">Cancelar</v-btn>
                                            </div>
                                            <div v-if="!table_input_is_displayed" class="d-flex flex-row-reverse">
                                                
                                                <v-btn color="green" text @click="table_input_is_displayed = true">

                                                    <span class="d-none d-lg-block">Agregar tabla</span>

                                                    <v-icon small class="d-block d-lg-none">mdi-plus-box</v-icon>

                                                </v-btn>
                                            </div>
                                        </v-col>
                                    </v-row>

                                <v-divider></v-divider>                                                 
                            
                                <p class="mt-2"><b>Direcciones</b></p>
                                <ul>
                                    <li
                                        v-for="(address,i) in covenant.addresses"
                                        :key="'addresses_'+i"
                                    >{{address.name}} <v-btn text color="red" x-small @click="deleteAddress(address.id,i)"><v-icon small>mdi-close-box</v-icon></v-btn>
                                    <addPhones
                                        :address="{'phones':address.phones,'index':i,'id':address.id}"
                                        @add:phone="addPhone"
                                        @delete:phone="deletePhone"

                                    />
                                    </li>
                                </ul>
                                <p v-if="covenant.addresses.length == 0">No hay direcciones guardadas</p>
                                <div v-if="address_input_is_displayed">
                                    <v-text-field
                                        outlined
                                        label="Nueva Dirección"
                                        v-model="new_address"
                                        :rules="[required]"
                                    ></v-text-field>
                                    <v-btn text x-small color="green" @click="addAddress">Guardar</v-btn>
                                    <v-btn text x-small color="red" @click="address_input_is_displayed = false">Cancelar</v-btn>
                                </div>
                                <div v-if="!address_input_is_displayed" class="d-flex flex-row-reverse">
                                    
                                    <v-btn color="green" text @click="address_input_is_displayed = true">

                                        <span class="d-none d-lg-block">Agregar dirección</span>

                                        <v-icon small class="d-block d-lg-none">mdi-plus-box</v-icon>

                                    </v-btn>
                                </div>

                                <v-divider></v-divider>
                                <p class="mt-2"><b>Enlaces</b></p>
                                <p v-if="covenant.links.length == 0">No hay enlaces guardados</p>
                                <addLinks
                                    :links="covenant.links"
                                    @add:link="addLink"
                                    @delete:link="deleteLink"
                                />
                            </v-card-text>

                            <v-divider></v-divider>

                        </v-card>
                    </v-col>
                    
                    
                </v-row>
            </v-card-text>
            <snackbar
                v-if="snackbar.is_displayed"
                :data="snackbar"
            >
            </snackbar>
            <v-overlay v-model="overlay.is_displayed">
                <center>

                    <v-img
                        width="50vw"
                        :src="overlay.image"
                    >
                        <v-btn style="float:right" color="red" @click="closeOverlay">
                            Cerrar
                        </v-btn>
                    </v-img>
                </center>
            </v-overlay>   
    </v-container>
</template>

<script>

import AddPhones from '../components/AddPhones.vue';
import AddLinks from '../components/AddLinks.vue';
import { mapGetters, mapMutations } from 'vuex';
import SnackBar from '../components/SnackBar.vue';

export default {

    name: 'EditCovenant',
    components:{
        'AddPhones':AddPhones,
        'AddLinks':AddLinks,
        'snackbar':SnackBar
    },
    data:()=>({
        overlay:{
            image: '',
            is_displayed: false
        },
        loading:false,

        address_input_is_displayed:false,
        table_input_is_displayed: false,
        new_tables: [],
        new_address:'',

        snackbar:{
            is_displayed:false,
            text_color:'',
            text:''
        },

        tree_view_items:[],
        covenant:{
            id:null,
            enabled:null,
            name:null,
            title:null,
            icon_url:null,
            new_icon:null,
            image_url:null,
            new_image:null,
            price:null,
            tables:[],
            description:null,
            links:[],
            addresses:[],
            subcovenants:[],
            
        },
        tree_view_items_opened:[],
        breadcrumbs:[],

    }),

    computed:{
        isEnabled(){
            return this.covenant.enabled ? 'inhabilitar':'habilitar';
        }
    },
    watch: {
        async '$route' () {
                    
            this.setCovenant(this.$route.params.id);
            this.setTreeView();
            this.setBreadCrumb();
            this.$routeByRol(this.getUserFromStore());  
        }
    },
    mounted(){
        
        this.setCovenant(this.$route.params.id);
        this.setTreeView();
        this.setBreadCrumb();
        this.$routeByRol(this.getUserFromStore());

    },
    methods:{
        ...mapMutations([
        'CLEAR_USER_DATA',
        'CLEAR_COVENANTS',
        ]),
        setImageToBase64(file,prop,is_tables){
            return new Promise((resolve,reject)=>{
            
                let reader = new FileReader();

                reader.readAsDataURL(file[prop]);

                reader.onload = () => {

                    if(is_tables != undefined){
                        this.new_tables[prop] = reader.result;
                    }else{

                        this.files[prop] = reader.result;
                    }
                    resolve();
                };

                reader.onerror = () => {
                    reject();
                };

            });
        },
        async addTables(){
            
            for(let i in this.new_tables){
                
                
                await this.setImageToBase64(this.new_tables,i,true);

            }
                this.axios.post('/add_tables',{
                    covenant_id: this.covenant.id,
                    tables: this.new_tables
                }).then((r) => {
                    console.log(r.data);
                    this.snackbar.text = "Tablas añadidas correctamente"
                    this.snackbar.text_color = "green"
                    this.$router.go();
                })
                .catch((e) => {
                    console.log(e.response)
                    this.snackbar.text = "Ha ocurrido un error inesperado"
                    this.snackbar.text_color = "red"
                    e.response.status == 401 ? this.logout():null
                    e.response.status == 413 ? alert():null
                }).finally(() => {
                    
                    this.snackbar.is_displayed = true;

                });
        
           },
        deleteTable(table_id, table_index){
            this.snackbar.text = 'cargando';
            this.snackbar.is_displayed = true;
            this.axios.post('/delete_table', {
                table_id: table_id
            }).then(() => {
                this.snackbar.is_displayed = false;
                this.covenant.tables.splice(table_index,1);
            }).catch((e) => {
                this.snackbar.is_displayed = false;
                console.log(e.response);
                this.snackbar.text_color = "red";
                this.snackbar.text = "Ha ocurrido un error inesperado";
                e.response.status == 401 ? this.logout():null;
                this.snackbar.is_displayed = true;
            });
        },
        openOverlay(table){
            this.overlay.image = table;
            this.overlay.is_displayed = true;
        },
        
        closeOverlay(){
            this.overlay.image = '';
            this.overlay.is_displayed = false;
        },

        saveName(){
            this.axios.post('/update_covenant_name',{
                id: this.covenant.id,
                name: this.covenant.name
            })
            .then( (r) => {
                console.log(r)
                this.snackbar.text = "Nombre modificado exitosamente"
                this.snackbar.text_color = 'green';
            }).catch( (e) => {
                this.snackbar.text = "Ha ocurrido un error inesperado"
                this.snackbar.text_color = 'red';
                console.log(e.response)
                e.response.status == 401 ? this.logout():null
            }).finally( () => {
                this.snackbar.is_displayed = true;
            });
        },
        saveTitle(){
            this.axios.post('/update_covenant_title',{
                id: this.covenant.id,
                title: this.covenant.title
            })
            .then( (r) => {
                console.log(r)
                this.snackbar.text = "Título modificado exitosamente"
                this.snackbar.text_color = 'green';
            }).catch( (e) => {
                this.snackbar.text = "Ha ocurrido un error inesperado"
                this.snackbar.text_color = 'red';
                console.log(e.response)
                e.response.status == 401 ? this.logout():null
            }).finally( () => {
                this.snackbar.is_displayed = true;
            });
        },
        
        ...mapGetters([
            'getUserFromStore'
        ]),
        addLink(props){

            this.axios.post('/save_link',{
                covenant_id:this.covenant.id,
                url: props.url,
                button:props.button,

            }).then((r)=>{
                
                console.log(r.data);
                this.snackbar.text = "Enlace agregado correctamente";
                this.snackbar.text_color = "green";
                this.covenant.links.push({
                    id:r.data.id,
                    link:props.url,
                    button:props.button
                }); 

            }).catch((e)=>{

                this.snackbar.text = "Ha ocurrido un error inseperado";
                this.snackbar.text_color = "red";
                console.log(e.response);
                e.response.status == 401 ? this.logout():null
                    

            }).finally(()=>{

                this.snackbar.is_displayed = true;
                
            });
            

        },
        deleteLink(props){

            this.axios.post('/delete_link',{
                link_id:props.link_id
            }).then(()=>{

                this.snackbar.text = "Enlace eliminado correctamente";
                this.snackbar.text_color = "green";
                this.covenant.links.splice(props.link_index,1);

            }).catch((e)=>{
                this.snackbar.text = "Ha ocurrido un error inesperado";
                this.snackbar.text_color = "red";

                console.log(e.response);
                e.response.status == 401 ? this.logout():null

            }).finally(()=>{

                this.snackbar.is_displayed = true;

            });

        },
        addAddress(){
            this.axios.post('/save_address',{
                covenant_id:this.covenant.id,
                address: this.new_address,

            }).then((r)=>{
                console.log(r.data);
                if(r.data){
                    
                    this.snackbar.text = "Dirección agregada correctamente";
                    this.snackbar.text_color = "green";

                    this.covenant.addresses.push({
                        id:r.data.address_id,
                        name:this.new_address,
                        phones:[]
                    });
                    this.address_input_is_displayed = false;
                    this.new_address = '';

                }

            }).catch((e)=>{
                this.snackbar.text = "Ha ocurrido un error inseperado."
                this.snackbar.text_color = "red";
                console.log(e.response);
                e.response.status == 401 ? this.logout():null

            }).finally(()=>{

                this.snackbar.is_displayed = true;

            });
            
        },
        
        deletePhone(e){
            
            //enviar id del telefono al servidor y borrar el telefono
            let phone_id = this.covenant.addresses[e.address_index].phones[e.phone_index].id;

            this.axios.post('/delete_phone',{
                phone_id: phone_id
            }).then((r)=>{
                r
                this.covenant.addresses[e.address_index].phones.splice(e.phone_index,1);
                this.snackbar.text = "Teléfono borrado correctamene";
                this.snackbar.text_color = "green";
            }).catch((e)=>{
                
                this.snackbar.text = "Ha ocurrido un error inesperado";
                this.snackbar.text_color = "red";

                console.log(e.response);
                e.response.status == 401 ? this.logout():null

            }).finally(()=>{
                this.snackbar.is_displayed = true;
            });
            
        },
        addPhone(e){
            
            //Enviar el telefono telefono y el id del convenio al servidor
            console.log(e);
            this.axios.post('/add_phone',{

                address_id:e.address_id,
                phone:e.phone
                
            }).then((r)=>{
                console.log(r);
                
                this.snackbar.text = "Telefono agregado correctamente";
                this.snackbar.text_color = "green";
                
                this.covenant.addresses[e.address_index].phones.push({id:r.data.phone_id,phone_number:e.phone});


            }).catch((e)=>{
                
                this.snackbar.text = "Ocurrió un error inesperado";
                this.snackbar.text_color = "red";

                console.log(e.response)
                e.response.status == 401 ? this.logout():null
            }).finally(()=>{

                this.snackbar.is_displayed = true;

            });
            
        },

        setImageToFileReader(file,prop){
            
            return new Promise((resolve,reject)=>{
            
                let reader = new FileReader();
                reader.readAsDataURL(file[prop]);
    
                reader.onload = () => {
                    console.log();
                    this.covenant[prop] = reader.result;
                    resolve();
                };

                reader.onerror = () => {
                    reject();
                };

            });
            
        },

        async saveImage(covenant_id){
            //Env
            covenant_id;
            if(this.covenant.new_image != null){

                await this.setImageToFileReader(this.covenant,'new_image');
                
                this.axios.post('/save_covenant_image',{
                    covenant_id:covenant_id,
                    base64_image:this.covenant.new_image,
    
                }).then((r)=>{
                    console.log(r.data);
                    if(r.data == true){
                        this.snackbar.text = "Imagen guardada correctamente";
                        this.snackbar.text_color = "green";
                    }
    
                }).catch((e)=>{
                    this.snackbar.text = "La imagen no pudo ser guardada";
                    this.snackbar.text_color = "red";
                    
                    console.log(e.response);
                    e.response.status == 401 ? this.logout():null
    
                }).finally(()=>{
                    this.snackbar.is_displayed = true;
                });

            }
        },
        async saveIcon(covenant_id){


            if(this.covenant.new_icon != null){

                await this.setImageToFileReader(this.covenant,'new_icon');
                
                this.axios.post('/save_covenant_icon',{
                    covenant_id:covenant_id,
                    fileReaderFormat:this.covenant.new_icon
                }).then((r)=>{
                    if(r.data == true){

                        this.snackbar.text = "Icono guardado correctamente"
                        this.snackbar.text_color = "green";
                    }
                    
                }).catch((e)=>{
                    this.snackbar.text_color = 'red';
                    this.snackbar.text = 'El ícono no pudo ser guardado';

                    console.log(e.response);
                    e.response.status == 401 ? this.logout():null
                }).finally(()=>{
                    this.snackbar.is_displayed = true;
                });

            }
        },
        previewImage(new_image,prop){
            
            this.covenant[prop]= URL.createObjectURL(new_image);
        },
        updateImage(covenant_id){


            alert('updateImage '+covenant_id);
        },

        deleteAddress(address_id,address_index){
            //request
            //Enviar dirección e id de la dirección
            

            this.axios.post('/delete_address',{
                address_id:address_id
            }).then(()=>{
                this.snackbar.text = "Dirección borrada correctamente";
                this.snackbar.text_color = "green";
                this.covenant.addresses.splice(address_index,1);
            }).catch((e)=>{
                this.snackbar.text = "Ha ocurrido un error inesperado";
                this.snackbar.text_color = "red";
                console.log(e.response);
                e.response.status == 401 ? this.logout():null
            });

        },

        disableCovenant(covenant_id){
            
            this.axios.post('/disable_covenant',{
                id:covenant_id
            }).then((r)=>{

                console.log(r.data);
                this.snackbar.text = 'Convenio inhabilitado';
                this.snackbar.text_color = "green";
                this.covenant.enabled = false;
                
            }).catch((e)=>{
                this.snackbar.text = 'Ha ocurrido un error inesperado';
                this.snackbar.text_color = "red";
                console.log(e.data)

            }).finally(()=>{

                this.snackbar.is_displayed = true;

            });
        },

        enableCovenant(covenant_id){
            
            this.axios.post('/restore_covenant',{
                id:covenant_id
            }).then((r)=>{

                console.log(r.data);
                this.snackbar.text = 'Convenio habilitado nuevamente';
                this.snackbar.text_color = "green";
                this.covenant.enabled = true;
                
            }).catch((e)=>{
                this.snackbar.text = 'Ha ocurrido un error inesperado';
                this.snackbar.text_color = "red";
                console.log(e.data)

            }).finally(()=>{

                this.snackbar.is_displayed = true;

            });
        },

        saveDescription(covenant_id){

            if(this.covenant.description != ''){

                this.axios.post('/add_description_to_covenant',{
                    id:covenant_id,
                    description:this.covenant.description,

                }).then((r)=>{
                    if(r.data.status == 200){

                        this.snackbar.text = r.data.message;
                        this.snackbar.text_color = "green";
                    }
                    
                }).catch((e)=>{
                    this.snackbar.text = 'Ha ocurrido un error inesperado';
                    this.snackbar.text_color = "red";
                    console.log(e.response);
                    e.response.status == 401 ? this.logout():null

                }).finally(()=>{

                    this.snackbar.is_displayed = true;
                });
                
            }else{
                
                this.snackbar.text = 'La descripción no puede estar vacía';
                this.snackbar.text_color = "yellow";
                this.snackbar.is_displayed = true;
            }


        },
        
        savePrice(covenant_id){

            if(this.covenant.price != ''){

                this.axios.post('/add_price_to_covenant',{
                    id:covenant_id,
                    price:this.covenant.price,

                }).then((r)=>{
                    
                    if(r.data.status == 200){
                        this.snackbar.text_color = 'green';
                        this.snackbar.text = r.data.message;
                    }
                }).catch((e)=>{

                    this.snackbar.text_color = 'red';
                    this.snackbar.text = "Ocurrió un error al guardar el precio"
                    console.log(e.response);
                    e.response.status == 401 ? this.logout():null

                }).finally(()=>{

                    this.snackbar.is_displayed = true;
                });


            }else{
                
                this.snackbar.text = 'La descripción no puede estar vacía';
                this.snackbar.text_color = "yellow";
                this.snackbar.is_displayed = true;
            }



        },

        setBreadCrumb(){
            let breadcrumbs = [
                {text:"Convenio 1"},
                {text:"Convenio 2"},
                {text:"Convenio 3"}
            ];
            this.breadcrumbs = breadcrumbs;
        },
        setTreeView(){


            let tree_view_items = [
                {
                    id:1,
                    name:'Convenio',
                    children:[
                        {id:2,name:'Subconvenio 2',
                        children:[
                            {id:21,name:'Subconverio 21',
                            children:[
                                {id:22,name:'Subconvenio 22',
                                children:[
                                    {id:23,name:'Subconvenio 23',
                                    children:[
                                        {id:24,name:'Subconvenio 24',
                                        children:[
                                            {id:25,name:'Subconvenio 25',
                                            children:[
                                                {id:26,name:'Subconvenio 26',
                                                children:[
                                                    {id:27,name:'Subconvenio 27'}
                                    
                                                ]}
                                            ]}
                                        ]}
                                    ]}                
                                ]}
                            ]}
                        ]},
                        {id:3,name:'Subconvenio 3'},
                        {id:4,name:'Subconvenio 4'},
                        {id:5,name:'Subconvenio 5'},
                    ],
                },
                {
                    id:6,
                    name:'Convenio 2',
                    children:[
                        {id:7,name:'Subconvenio 7'},
                        {id:8,name:'Subconvenio 8'},
                        {id:9,name:'Subconvenio 9'},
                        {id:10,name:'Subconvenio 10'},
                    ],
                },
                {
                    id:11,
                    name:'Convenio 3',
                    children:[
                        {id:12,name:'Subconvenio 12'},
                        {id:13,name:'Subconvenio 13'},
                        {id:14,name:'Subconvenio 14'},
                        {id:15,name:'Subconvenio 15'},
                    ],
                },
                {
                    id:16,
                    name:'Convenio 4',
                    children:[
                        {id:17,name:'Subconvenio 17'},
                        {id:18,name:'Subconvenio 18'},
                        {id:19,name:'Subconvenio 19'},
                        {id:20,name:'Subconvenio 20'},
                    ],
                    
                }
            ];

            this.tree_view_items = tree_view_items;

            let tree_view_items_opened = [1,6];

            this.tree_view_items_opened = tree_view_items_opened;

        },

        setCovenant(id){
            //let covenant_id = this.$route.query.id;
            //alert(covenant_id);
            this.axios.get('/covenants/'+id)
            .then((r)=>{
                console.log(r.data);                
                this.covenant.id = r.data.data.id;
                this.covenant.enabled = r.data.data.status == 'e';
                this.covenant.name = r.data.data.name;
                this.covenant.title = r.data.data.title;
                
                this.covenant.icon_url = r.data.data.icon == '' ? 'https://cdn.pixabay.com/photo/2016/11/01/18/38/background-1789175_960_720.png' : r.data.data.icon; //ur;
                
                //this.covenant.image_url = r.data.data.information == null ? 'https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_960_720.png' : r.data.data.information.image, //ur;

                if((r.data.data.information != null) && (r.data.data.information.image != '')){
                    this.covenant.image_url = r.data.data.information.image;
                }else{
                    this.covenant.image_url = 'https://cdn.pixabay.com/photo/2013/04/01/21/30/photo-99135_960_720.png';
                }
 //               this.covenant.image_url = 'https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_960_720.png';
                this.covenant.price = r.data.data.information == null ? '' : r.data.data.information.price;
                this.covenant.description = r.data.data.information == null ? '' : r.data.data.information.description;
                this.covenant.links = r.data.data.links;
                this.covenant.addresses=r.data.data.addresses;
                this.covenant.tables = r.data.data.tables;
 
                this.covenant.subcovenants = r.data.data.children_covenants;

                //this.covenant.phones = this.data.data.phones;
            })
            .catch((e)=>{
                this.snackbar.text = 'Ha ocurrido un error inesperado y el convenio no se pudo cargar';
                this.snackbar.text_color = "red";
                console.log(e.response);
                e.response.status == 401 ? this.logout():null
            })
            .finally(()=>{
                window.scroll(0,0);
                this.$router.push('/convenios/'+id);
            });

        },
        
        validatePhoneFormat(number){

            let patt = '^[0-9 -]+$';
            
            return number.match(patt) ? true : 'Numero de telefono inválido. Formato: 123 - 456 7890';

        },

        required(field){
            return field != '' || 'Este campo no puede estar vacio'
        },
        logout(){
            this.CLEAR_USER_DATA();
            this.CLEAR_COVENANTS();

            this.snackbar.text_color = 'red';
            this.snackbar.text = 'Debe iniciar sesión para realizar esta acción';

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


}

</script>
<style>

    .scroll{
        overflow-y:scroll;
    }

</style>