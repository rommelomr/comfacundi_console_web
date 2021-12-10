<template>
    <v-container>
        <v-card>
            <v-card-title>Agregar subconvenio a: {{parent_covenant}} <v-spacer></v-spacer> <v-btn text><v-icon>mdi-save</v-icon></v-btn></v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12" lg="4">
                        <v-card>
                            <v-card-title class="justify-center">Imagen del convenio</v-card-title>
                            <v-divider></v-divider>
                            <v-img
                                :src="previewImage"
                                width="300"
                                class="mx-auto mt-2"
                            >
                            </v-img>
                            <v-card-text>
                                <v-file-input
                                    outlined
                                    label="Subir imagen al convenio"
                                    v-model="files.image"
                                ></v-file-input>
                            </v-card-text>
                        </v-card>    
                    </v-col>
                    <v-col cols="12" lg="8">
                        <v-card>
                            <v-card-title class="justify-center">Información del convenio</v-card-title>
                            <v-divider></v-divider>
                            <v-card-text>

                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field
                                            outlined
                                            label="Nombre del convenio *"
                                            v-model="covenant.name"
                                        ></v-text-field>
                                        <v-text-field
                                            outlined
                                            label="Título * "
                                            v-model="covenant.title"
                                        ></v-text-field>
                                        
                                        <v-text-field
                                            outlined
                                            label="Precio"
                                            v-model="covenant.price"
                                        >
                                        </v-text-field>
                                        
                                        <v-text-field
                                            outlined
                                            label="Tipo de beneficiario"
                                            v-model="covenant.type_of_beneficiarie"
                                            hint="Por ejemplo: 'Válido para 2 personas'"
                                        >
                                        </v-text-field>
                                        
                                        <v-file-input
                                            outlined
                                            label="Ícono del convenio"
                                            v-model="files.icon"
                                        ></v-file-input>
                                        <v-textarea
                                            outlined
                                            label="Descripción"
                                            v-model="covenant.description"
                                        ></v-textarea>

                                    </v-col>
                                    <!--v-col>
                                        <v-card class="mb-1">
                                            <v-card-text class="pb-0"><b>Direcciones</b></v-card-text>
                                            <v-card-text class="pt-0">

                                                <ul v-if="(covenant.addresses.length!=0)">
                                                    <li
                                                        
                                                        v-for="(address) in covenant.addresses"
                                                        :key="'address'+address.id"
                                                    >
                                                        {{address.name}} <v-btn text x-small color="red" @click="deleteAddress(address.id)"><v-icon small>mdi-close-box</v-icon></v-btn>
                                                        <ul v-if="address.phones.length != 0">
                                                            <li v-for="(phone,i) in address.phones" :key="'phone'+i">
                                                                {{phone.number}} <v-btn text color="red" x-small @click="deletePhone(address.id,phone.id)"><v-icon small>mdi-close-box</v-icon></v-btn>
                                                            </li>
                                                        </ul>
                                                        <div v-else>
                                                            <label v-if="!phoneInputIsDisplayed(address.id)"><v-icon small color="yellow">mdi-alert</v-icon>No hay telefonos asociados a esta dirección</label>
                                                        </div>
                                                            <ul v-if="(phoneInputIsDisplayed(address.id))">
                                                                <v-text-field
                                                                    placeholder="Nuevo telefono"
                                                                    v-model="new_phone.number"
                                                                    :data-address="address.id"
                                                                    @keydown="addPhone"
                                                                    :rules="[validatePhoneFormat]"
                                                                ></v-text-field>
                                                                <v-btn x-small color="green" text test="click" :data-address="address.id" @click="addPhone">Guardar</v-btn>
                                                                <v-btn x-small color="red" text @click="hidePhoneField(address.id)">Cancelar</v-btn>
                                                            </ul>
                                                            <v-btn v-if="!phoneInputIsDisplayed(address.id)" text x-small color="green" @click="setDisplayedPhoneInputBool(address.id,true)">Agregar telefono</v-btn>

                                                    </li>
                                                </ul>
                                                <label v-else-if="!address_input_is_displayed">No hay ninguna dirección.</label>
                                                <ul v-if="(address_input_is_displayed)">
                                                    <li>
                                                        <v-text-field
                                                            v-model="new_address.name"
                                                            placeholder="Nueva direccion"
                                                            @keydown="addAddress"
                                                            :rules="[required]"
                                                        ></v-text-field>
                                                        <v-btn x-small color="green" text @click="addAddress">Guardar</v-btn>
                                                        <v-btn x-small color="red" text @click="hideAddressField()">Cancelar</v-btn>
                                                    </li>
                                                </ul>
                                                <v-btn v-if="!address_input_is_displayed" text x-small color="green" @click="address_input_is_displayed = true">Agregar dirección</v-btn>
                                            </v-card-text>

                                        </v-card>
                                        <v-card>
                                            <v-card-text class="pb-0">
                                                <b>Enlaces</b>
                                            </v-card-text>
                                            
                                            <v-card-text class="pt-0">

                                                <ul v-if="(covenant.links.length!=0)">
                                                    <li        
                                                        v-for="(link,i) in covenant.links"
                                                        :key="'link'+i"
                                                    >
                                                        <a :href="link.url" target="_blank">{{link.url}}.</a> <v-btn text x-small color=red @click="deleteLink(link.id)"><v-icon small>mdi-close-box</v-icon></v-btn>
                                                        <br><b>Botón:</b> {{link.button}}
                                                        
                                                    </li>
                                                </ul>
                                                <label v-else>No hay ningun enlace</label>
                                                <ul v-if="(link_input_is_displayed)">

                                                    <li>

                                                            <v-text-field
                                                                v-model="new_link.url"
                                                                placeholder="Nuevo enlace"
                                                                @keydown="addLink"
                                                                :rules="[validateUrl]"
                                                            ></v-text-field>
                                                            <v-text-field
                                                                v-model="new_link.button"
                                                                placeholder="Mensaje del botón"
                                                                @keydown="addLink"
                                                                :rules="[required]"
                                                            ></v-text-field>
                                                            <v-btn x-small color="green" text @click="addLink">Guardar</v-btn>
                                                            <v-btn x-small color="red" text @click="hideLinkFields()">Cancelar</v-btn>
                                                        
                                                    </li>
                                                </ul>
                                                <v-btn v-if="!link_input_is_displayed" @click="link_input_is_displayed = !link_input_is_displayed" text x-small color="green">Agregar enlace</v-btn>
                                            </v-card-text>
                                        </v-card>
                                    </v-col-->                                    
                                </v-row>

                            </v-card-text>
                        </v-card>
                    </v-col>
                    
                </v-row>
                
            </v-card-text>
            <v-card-actions class="justify-end">
                <v-btn class="white--text" color="green" @click="saveNewCovenant">Guardar</v-btn>
            </v-card-actions>
        </v-card>
        <v-dialog v-model="dialog_is_opened">
            <v-card>
                <v-card-text>asdf</v-card-text>
            </v-card>
        </v-dialog>
            <v-snackbar
                v-model="snackbar.is_displayed"
            >
                {{ snackbar.text }}
                <v-btn
                    color="blue"
                    text
                    @click="snackbar.is_displayed = false"
                >
                    Close
                </v-btn>
            
            </v-snackbar>
    </v-container>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    name:'CreateCovenant',
    data:()=>({

        dialog_is_opened:false,
        link_input_is_displayed:false,
        address_input_is_displayed:false,
        phone_input_is_displayed:[],
        parent_covenant: '',
        snackbar:{
            is_displayed:false,
            text:null,

        },

        files:{
            icon:null,
            image:null
        },

        covenant:{
            parent_id:null,
            //name:null,
            name:'Nombre',
            title:'Titulo',
            
            icon:null,

            //description:'',
            description:'Descripción',

            //image:null,
            image:null,

            //price:'',
            price:'Desde $400',

            //type_of_beneficiarie:null,
            type_of_beneficiarie:'Valido para dos personas',

        },

        new_link:{
            id:0,
            url:'',
            button:''
        },

        new_address:{
            
            id:0,
            name:''

        },
        
        new_phone:{

            id:0,
            number:''

        },        

    }),
    mounted(){
        this.setParentCovenant();
        this.$routeByRol(this.getUserFromStore());
    },
    computed:{
        previewImage(){
            return this.files.image == null ? 'https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_960_720.png' : URL.createObjectURL(this.files.image)
        }
    },
    methods:{

        ...mapGetters([
            'getUserFromStore'
        ]),
        //Bools
        phoneInputIsDisplayed(address_id){

                let i = this.covenant.addresses.findIndex(function(address){
                    return address.id == address_id;
                });
                return this.phone_input_is_displayed[i];
            
        },
        setDisplayedPhoneInputBool(address_id,bool){
            
            let i = this.covenant.addresses.findIndex(function(address){
                
                return address.id == address_id;
            });

            let j = this.phone_input_is_displayed.findIndex(function(value){
                return value == true;
            });

            this.phone_input_is_displayed[i] = bool;
            this.phone_input_is_displayed[j] = false;

            let aux = this.covenant.addresses[i].phones;

            let last_phone = aux[aux.length-1];
            
            if(aux.length == 0){
                
                this.covenant.addresses[i].phones.push(1);
                this.covenant.addresses[i].phones.pop();
            }else{
                
                this.covenant.addresses[i].phones.pop();
                
                this.covenant.addresses[i].phones.push({
                    id:last_phone.id,
                    number:last_phone.number
                });
            }
            
            
            
        },
        
        //validations
        required(field){
            
            return field != '' || 'Este campo no puede estar vacio'
        },   
        validateUrl(field){
            let url;
            try{
                url = new URL(field)
            }catch(_){
                return 'URL invalida. \n formato: https://google.com'
            }
            return url.protocol === 'http:' || url.protocol === 'https:';
        },
        validatePhoneFormat(number){
            let patt = '^[0-9 -]+$';
            
            return number.match(patt) ? true : 'Numero de telefono inválido. Formato: 123 - 456 7890';
        },

        //adds
        addPhone(e){
            
            if(e.key == 'Enter' || e.type == 'click'){
                if((this.new_phone.number !== '') && (this.validatePhoneFormat(this.new_phone.number)===true)){
                    let address_id = e.currentTarget.dataset.address;
                    let address_index = this.covenant.addresses.findIndex(function(address){
                        return address.id == address_id;
                    });
                    
                    this.covenant.addresses[address_index].phones.push({
                        id:this.new_phone.id,
                        number:this.new_phone.number
                    });
                    
                    this.hidePhoneField(address_id);
                        
                }
            }
        },
        addAddress(e){
            if(e.key == 'Enter' || e.type == 'click'){
                if((this.new_address.name !== '') && (this.required(this.new_address.name))){

                    this.covenant.addresses.push({
                        id:this.new_address.id,
                        name:this.new_address.name,
                        phones:[]
                    });

                    this.hideAddressField();
                }

            }

        },
        addLink(e){
            
            if(e.key == 'Enter' || e.type == 'click'){
                if(
                    (this.new_link.url !== '') &&
                    (this.new_link.button !== '') &&
                    (this.validateUrl(this.new_link.url)===true)
                ){
    
                    this.covenant.links.push({

                        id:this.new_link.id,
                        url:this.new_link.url,
                        button:this.new_link.button

                    });

                    this.hideLinkFields();
                    
                }

            }
            
        },
        
        //hides
        hideLinkFields(){
            this.new_link.id++;
            this.new_link.url = '';
            this.new_link.button = '';
            this.link_input_is_displayed=false;

        },
        hidePhoneField(address_id){
            this.new_phone.id++;
            this.new_phone.number='';
            this.setDisplayedPhoneInputBool(address_id,false);
        },
        hideAddressField(){
            this.new_address.id++;
            this.new_address.name='';
            this.address_input_is_displayed=false;
        },

        //deletes
        deleteLink(link_id){
            
            let i = this.covenant.links.findIndex(function(link){
                return link.id == link_id;
            })
            this.covenant.links.splice(i,1)

        },
        deleteAddress(address_id){
            
            let i = this.covenant.addresses.findIndex(function(address){
                return address.id == address_id;
            });

            this.covenant.addresses.splice(i,1);

        },
        deletePhone(address_id,phone_id){
            
            let i = this.covenant.addresses.findIndex(function(address){
                return address.id == address_id;
            });

            let j = this.covenant.addresses[i].phones.findIndex(function(phone){
                return phone.id == phone_id;
            });

            this.covenant.addresses[i].phones.splice(j,1);
        },

        //requests
        setParentCovenant(){
            this.axios.get('/covenants/'+this.$route.params.id)
            .then((r)=>{
                
                this.parent_covenant = r.data.data.name;
                this.covenant.parent_id = r.data.data.id;

            }).catch((e)=>{
                console.log(e.response);
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
        validateInputs(){
            
            return this.covenant.name != null &&
            this.covenant.parent_id != null
        },
        async saveNewCovenant(){

            if(this.validateInputs()){
                
                if(this.files.image !== null){

                    await this.setImageToBase64(this.files,'image');

                }
                if(this.files.icon !== null){

                    await this.setImageToBase64(this.files,'icon');

                }
                console.log(this.covenant);
                this.axios.post('/save_new_covenant',{

                    parent_id:this.covenant.parent_id,
                    name: this.covenant.name,
                    title: this.covenant.title,
                    description: this.covenant.description,
                    price: this.covenant.price,
                    type_of_beneficiarie: this.covenant.type_of_beneficiarie,
                    image: this.files.image,
                    icon: this.files.icon

                }).then((r)=>{
                    console.log(r.data);
                }).catch((e)=>{
                    console.log(e.response);

                });

            }else{

                this.snackbar.is_displayed = true;
                this.snackbar.text = 'ERROR: Debe indicar al menos el nombre del convenio';
            }

        },
        setImageToBase64(file,prop){

            return new Promise((resolve,reject)=>{
            
                let reader = new FileReader();
                reader.readAsDataURL(file[prop]);
    
                reader.onload = () => {

                    this.files[prop] = reader.result;
                    resolve();
                };

                reader.onerror = () => {
                    reject();
                };

            });
            
        },
    },

}
</script>
