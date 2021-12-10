<template>
    <div>
        <ul>

            <li v-for="(phone,i) in address.phones"
                :key="'phones_'+i">
                {{phone.phone_number}} <v-btn text x-small color="red" @click="deletePhone(address.index,i)"><v-icon small>mdi-close-box</v-icon> </v-btn>
            </li>

            <v-text-field
                v-if="phone_input_is_displayed"
                outlined 
                label="Nuevo teléfono"
                v-model="new_phone"
                :rules="[validatePhoneFormat]"   
            ></v-text-field>

            <v-btn
                v-if="phone_input_is_displayed"
                @click="savePhone"
                text x-small color="green">Guardar
            </v-btn>

            <v-btn
                v-if="phone_input_is_displayed"
                @click="phone_input_is_displayed = false"
                text x-small color="red">Cancelar
            </v-btn>
            
            <v-btn
                v-if="!phone_input_is_displayed"
                @click="displayPhoneInput"
                text x-small color="green" >Agregar teléfono

            </v-btn>
        </ul>

    </div>
</template>

<script>

    export default {
        name:'AddAddress',
        data:()=>({
            
            new_phone:'',
            phone_input_is_displayed:false,
                
        }),
        props:['address'],
        mounted(){
            console.log(this.address)
        },
        methods:{
            validatePhoneFormat(number){
                
                let patt = '^[0-9 -]+$';
                
                return number.match(patt) ? true : 'Numero de telefono inválido. Formato: 123 - 456 7890';

            },
            displayPhoneInput(bool){

                this.phone_input_is_displayed = bool == null ? true: bool;
            },
            deletePhone(addres_index,phone_index){
                this.$emit('delete:phone',{
                    address_index:addres_index,
                    phone_index:phone_index
                })
            },
            savePhone(e){

                if(e.key == 'Enter' || e.type == 'click'){

                    if(this.validatePhoneFormat(this.new_phone)==true){
                        let phone = this.new_phone;
                        this.$emit('add:phone',{

                            address_index: this.address.index,
                            address_id: this.address.id,
                            phone: phone

                        });

                        this.displayPhoneInput(false)
                        this.new_phone = null;

                    }

                }

            },
        }
    }

</script>
