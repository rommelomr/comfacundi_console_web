<template>
    <div>
        <ul>
            <li v-for="(link,i) in links"
                :key="'links_'+i"
            >
                {{link.link}} <v-btn text color="red" x-small @click="deleteLink(link.id,i)"><v-icon small>mdi-close-box</v-icon></v-btn>
                <br>Botón: {{link.button}}
            </li>
        </ul>
        <div v-if="link_form_is_displayed">
            <v-text-field
                outlined
                label="Dirección URL"
                v-model="link.url"
                @keyup="addLink"
                :rules="[validateUrl]"
            ></v-text-field>
            <v-text-field
                outlined
                label="Texto del botón"
                v-model="link.button"
                @keyup="addLink"
                :rules="[required]"
            ></v-text-field>
            <v-btn text x-small color="green" @click="addLink">Guardar</v-btn>
            <v-btn text x-small color="red" @click="link_form_is_displayed = false">Cancelar</v-btn>
        </div>
        <div v-if="!link_form_is_displayed" class="d-flex flex-row-reverse">

            <v-btn text color="green" @click="link_form_is_displayed = true">Agregar enlace</v-btn>

        </div>
    </div>
</template>
<script>

export default {
    name:'AddLinks',
    data:()=>({
        link_form_is_displayed:false,

        link:{
            url:'',
            button:''
        }

        
    }),

    props:['links'],
    
    methods:{
        addLink(e){
            if(e.key == "Enter" || e.type == 'click'){
                if(this.validateUrl(this.link.url)==true && this.required(this.link.button) == true){
                    
                    let url = this.link.url;
                    this.$emit('add:link',{
                        url:url,
                        button:this.link.button
                    });

                    this.link_form_is_displayed = false;
                    this.link.url = '';
                    this.link.button = '';
                }

            }
        },
        deleteLink(link_id,link_index){

            this.$emit('delete:link',{
                link_id:link_id,
                link_index:link_index,
            });


        },
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

    }
}

</script>
