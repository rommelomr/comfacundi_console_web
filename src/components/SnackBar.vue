<template>
    <v-snackbar
        :color="text_color"
        v-model="data.is_displayed"
        :dark="is_dark"
        text
    >
        {{ data.text }}
        
        <v-btn
            :color="text_color"
            text
            @click="data.is_displayed = false"
        >
            Cerrar
        </v-btn>
    </v-snackbar>
</template>
<script>

export default {
    name:'SnackBar',
    props:['data'],
    data:()=>({
        is_dark:false,
        dark_backgrounds:['yellow','white'],
        text_color:''
    }),
    mounted(){

        this.setSnackbarTextColor(this.data.text_color);
        if(this.snackbarMustBeDark(this.data.text_color)){
            this.setSnackbarToDark();
        }
    },
    methods:{
        setSnackbarToDark(){
            this.is_dark = true;
        },
        snackbarMustBeDark(text_color){
            return this.dark_backgrounds.includes(text_color);
        },
        snackbarisDisplayed(){
            return this.data.is_displayed;
        },
        setSnackbarDisplay(bool){
            
            this.data.is_displayed = bool == null ? true : bool;

        },
        setSnackbarTextColor(text_color){

            if(text_color == null){
                this.text_color = 'black';
            }else{
                this.text_color = text_color;
            }
        },

    }
}
</script>
