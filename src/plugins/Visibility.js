let homes = {
    a:'/usuarios',
    o:'/'
}
export default {
    install:(Vue)=>{
        Vue.prototype.$routeByRol = function(stored_user){
            
            switch (this.$route.meta.visibility.type){
                case 'private':{
            
                    if(stored_user.name != ''){
                        
                        if(this.$route.meta.visibility.roles.length != 0){
            
                            let rol = this.$route.meta.visibility.roles.find(el=>el == stored_user.rol);
            
                            if(rol == undefined){
            
                                this.$router.push(homes[stored_user.rol]);
            
                            }
            
                        }
                    }else{
                        this.$router.push('/login');
                    }
            
                    break;
                }
            
                case 'outside':{
                    if(stored_user.name != ''){
                        this.$router.push(homes[stored_user.rol]);
                    }
                    break;
                }
                default:{
                    
                    break
                }
            
                }
        }    
            
        
    }
}

