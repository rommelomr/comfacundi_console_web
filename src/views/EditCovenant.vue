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
                        <v-card
                            :loading="loading"
                            class="mx-auto my-auto"   
                        >
                            <template slot="progress">
                                <v-progress-linear
                                    color="deep-purple"
                                    height="10"
                                    indeterminate
                                ></v-progress-linear>
                            </template>

                            <v-card-title>

                                <div v-if="!covenant.enabled">

                                    {{covenant.name}} <label >(Inhabilitado)</label>
                                    <v-btn text x-small class="green--text" @click="enableCovenant(covenant.id)">
                                        Habilitar
                                    </v-btn>
                                </div>
                                <div v-else>
                                    {{covenant.name}} 
                                    <v-btn text x-small class="red--text" @click="disableCovenant(covenant.id)">
                                        Inhabilitar
                                    </v-btn>
                                </div>

                            </v-card-title>
                        
                            <v-divider></v-divider>

                            <v-card-text>
                                <v-row class="py-4">
                                    
                                    <v-col cols="6" class="align-self-center">
                                        <v-file-input
                                            label="Imagen del convenio"
                                            outlined
                                            prepend-icon="mdi-camera"
                                            v-model="covenant.new_icon"
                                            @change="previewImage(covenant.new_icon,'image_url')"
                                        ></v-file-input>

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
                                                label="Ícono del convenio"
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

                                <p class="mt-2"><b>Subconvenios:</b></p>

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
                                        <span class="d-none d-lg-block">Agregar subconvenio</span>
                                        <v-icon small class="d-block d-lg-none">mdi-plus-box</v-icon>
                                    </v-btn>
                                    
                                </div>
                                
                                <v-divider></v-divider>                                                   
                            
                                <p class="mt-2"><b>Direcciones</b></p>
                                <ul>
                                    <li
                                        v-for="(address,i) in covenant.addresses"
                                        :key="'addresses_'+i"
                                    >{{address.name}} <v-btn text color="red" x-small @click="deleteAddress(i)"><v-icon small>mdi-close-box</v-icon></v-btn>
                                    <addPhones
                                        :address="{'phones':address.phones,'index':i}"
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
                                        @keyup="addAddress"
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
            <v-snackbar
                :color="snackbar.text_color"
                v-model="snackbar.is_displayed"
                :dark="snackbar.is_dark"
                text
            >
                {{ snackbar.text }}
                <v-btn
                    :color="snackbar.text_color"
                    
                    text
                    @click="snackbar.is_displayed = false"
                >
                    Cerrar
                </v-btn>
            
            </v-snackbar>
    </v-container>
</template>

<script>

import AddPhones from '../components/AddPhones.vue';
import AddLinks from '../components/AddLinks.vue';
import { mapGetters } from 'vuex';

export default {

    name: 'EditCovenant',
    components:{
        'AddPhones':AddPhones,
        'AddLinks':AddLinks,
    },
    data:()=>({
        loading:false,

        address_input_is_displayed:false,
        new_address:'',

        snackbar:{
            is_displayed:false,
            is_dark:false,
            background:'',
            text_color:'',
            text:'',
            dark_backgrounds:['yellow','white']
        },

        tree_view_items:[],
        covenant:{
            id:null,
            enabled:null,
            name:null,
            icon_url:null,
            new_icon:null,
            image_url:null,
            new_image:null,
            price:null,
            description:null,
            links:[],
            addresses:[],
            subcovenants:[],
            phones:[]
        },
        tree_view_items_opened:[],
        breadcrumbs:[],

    }),

    computed:{
        isEnabled(){
            return this.covenant.enabled ? 'inhabilitar':'habilitar';
        }
    },
    mounted(){
        
        this.setCovenant(this.$route.params.id);
        this.setTreeView();
        this.setBreadCrumb();
        this.$routeByRol(this.getUserFromStore());

        this.axios.get('/app_covenants/agreements').then((r)=>{
            console.log(r.data)
        }).catch((e)=>{

            console.log(e.response)

        });
    },
    methods:{
        ...mapGetters([
            'getUserFromStore'
        ]),
        deletePhone(e){
            
            //enviar id del telefono al servidor y borrar el telefono
            let status = 1;
            if(status == 1){
                this.setSnackbarText('Teléfono eliminado satisfactoriamente','green')
                this.covenant.addresses[e.address_index].phones.splice(e.phone_index,1);
            }else{
                this.setSnackbarText('[Mostrar error del servidor]','red')
            }
            this.setSnackbarDisplay();

        },
        addPhone(e){
            
            //Enviar el telefono telefono y el id del convenio al servidor
            let status = 1;

            if(status == 1){

                this.covenant.addresses[e.index].phones.push(e.phone);
                //Al atributo id, colocarle el id que el servidor manda para en caso de que se tenga
                //que borrar sin haber recargado la página
                this.setSnackbarText('Dirección guardada satisfactoriamente','green');

            }else{

                this.setSnackbarText('[Mostrar error del servidor]','red');

            }

            this.setSnackbarDisplay();

            
        },
        setSnackbarText(text,text_color){

            this.snackbar.text = text;

            if(text_color == null){
                
                this.snackbar.text_color = 'black';

            }else{

                this.snackbar.text_color = text_color;
            }

            this.snackbar.is_dark = this.snackbar.dark_backgrounds.includes(text_color);

        },

        setSnackbarDisplay(bool){
            
            this.snackbar.is_displayed = bool == null ? true : bool;

        },
        
        saveIcon(covenant_id,icon){

            let status = 1;
            covenant_id;icon;
            

            if(this.covenant.new_icon!=null){

                //Aquí se envía el icono al servidor y retorna un objeto con el status    

                if(status == 1){

                    this.setSnackbarText('icono modificado correctamente','green');

                }else{

                    this.setSnackbarText('Mostrar error de server','red');
                    
                }

                //colocar la imagen en la previsualización
            }else{

                this.setSnackbarText('ERROR: No se ha seleccionado ningun ícono','red');

            }

            this.setSnackbarDisplay();
        },
        previewImage(new_image,prop){
            
            this.covenant[prop]= URL.createObjectURL(new_image);
        },
        updateImage(covenant_id){


            alert('updateImage '+covenant_id);
        },

        deleteAddress(address_id){
            //request
            //Enviar dirección e id de la dirección
            let status = 1;
            if(status == 1){
                this.setSnackbarText('Direccion eliminada satisfactoriamente','green');
            }else{
                this.setSnackbarText('[mostrar error del servidor]','red');
            }
            this.setSnackbarDisplay();
            this.covenant.addresses.splice(address_id,1)
        },

        disableCovenant(covenant_id){
            
            this.axios.post('/disable_covenant',{
                id:covenant_id
            }).then((r)=>{

                console.log(r.data);
                this.setSnackbarText('Convenio inhabilitado','green');
                this.covenant.enabled = false;
                
            }).catch((e)=>{

                console.log(e.data)

            }).finally(()=>{

                this.setSnackbarDisplay();

            });
        },

        enableCovenant(covenant_id){
            
            this.axios.post('/restore_covenant',{
                id:covenant_id
            }).then((r)=>{

                console.log(r.data);
                this.setSnackbarText('Convenio habilitado nuevamente','green');
                this.covenant.enabled = true;
                
            }).catch((e)=>{

                console.log(e.data)

            }).finally(()=>{

                this.setSnackbarDisplay();

            });
        },

        saveDescription(covenant_id){

            if(this.covenant.description != ''){

                this.axios.post('/add_description_to_covenant',{
                    id:covenant_id,
                    description:this.covenant.description,

                }).then((r)=>{
                    console.log(r.data);
                }).catch((e)=>{
                    console.log(e.response);

                });
                let status = 1;

                if(status == 1){
                    
                    this.setSnackbarText('Descripción guardada correctamente','green')
                    
                }else{
                    this.setSnackbarText('[Colocar error del servidor]','red');
                }

            }else{

                this.setSnackbarText('La descripción no puede estar vacía','red')
            }
            this.setSnackbarDisplay()


        },
        
        savePrice(covenant_id){

            if(this.covenant.description != ''){

                this.axios.post('/add_price_to_covenant',{
                    id:covenant_id,
                    price:this.covenant.price,

                }).then((r)=>{
                    console.log(r.data);
                }).catch((e)=>{
                    console.log(e.response);

                });
                let status = 1;

                if(status == 1){
                    
                    this.setSnackbarText('Descripción guardada correctamente','green')
                    
                }else{
                    this.setSnackbarText('[Colocar error del servidor]','red');
                }

            }else{

                this.setSnackbarText('La descripción no puede estar vacía','red')
            }
            this.setSnackbarDisplay()


        },
        
        savePriceasdfasdf(covenant_id,covenant_price){
            covenant_id,covenant_price;
            if(this.covenant.price!=''){

                //Enviar request
                let status = 1;

                if(status == 1){
                    this.setSnackbarText('Precio guardado correctamente','green');
                }

            }else{

                this.setSnackbarText('Debe indicar un precio','red');

            }
            this.setSnackbarDisplay();

        },
        addAddress(e){
            if(e.key == 'Enter' || e.type == 'click'){
                //enviar id del convenio al servidor
                
                let status = 1;
                if(status == 1){
                    
                    this.covenant.addresses.push({
                        name:this.new_address,
                        phones:[]
                    });

                    this.new_address = null;
                    this.address_input_is_displayed = false;
                    this.setSnackbarText('Dirección agregada satisfactoriamente','green');

                }else{
                    
                    this.setSnackbarText('[Mostrar error de servidor]','red');


                }
                this.setSnackbarDisplay();
            }
        },
        addLink(data){
            //enviar id del convenio al servidor para agregar el link

            let status = 1;
            if(status == 1){
data
                this.setSnackbarText('Enlace agregado satisfactoriamente','green');

            }else{

                this.setSnackbarText('[Mostrar error del servidor]','red');

            }

            this.setSnackbarDisplay();

        },

        deleteLink(link_index){
            //Enviar id del link al servidor para borrarlo

            let status = 1;
            if(status == 1){

                this.covenant.links.splice(link_index,1);
                this.setSnackbarText('Enlace eliminado satisfactoriamente','green');

            }else{

                this.setSnackbarText('[MOSTAR ERROR DEL SERVIDOR]','red');

            }

            this.setSnackbarDisplay();
            
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

                console.log(r);
                //console.log(r.data)
                
                this.covenant.id = r.data.data.id;
                this.covenant.enabled = r.data.data.status == 'e';
                this.covenant.name = r.data.data.name;
                this.covenant.icon_url = 'https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_960_720.png', //ur;
                this.covenant.image_url = 'https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_960_720.png';
                this.covenant.price = r.data.data.information == null ? '' : r.data.data.information.price;
                this.covenant.description = r.data.data.information == null ? '' : r.data.data.information.description;
                //this.covenant.links = r.data.data.links;
                this.covenant.addresses=[

                ];
                /*
                this.covenant.subcovenants=[
                    {id:1,name:'covenant x'},
                    {id:2,name:'covenant y'},
                    {id:3,name:'covenant z'},
                ];
                */
                this.covenant.subcovenants = r.data.data.children_covenants;

                this.covenant.phones = this.data.data.phones;
            })
            .catch((e)=>{
                console.log(e.response);
            })
            .finally(()=>{
                window.scroll(0,0);
            });

        },
        
        validatePhoneFormat(number){

            let patt = '^[0-9 -]+$';
            
            return number.match(patt) ? true : 'Numero de telefono inválido. Formato: 123 - 456 7890';

        },

        required(field){
            return field != '' || 'Este campo no puede estar vacio'
        },   
        
    }


}

</script>
<style>

    .scroll{
        overflow-y:scroll;
    }

</style>