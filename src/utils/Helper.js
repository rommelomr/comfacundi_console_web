
export default {
    API_URL: process.env.NODE_ENV == 'production' ? "https://comfacundi-api.frb.io/api" : "http://192.168.56.56/api",
    SERVER_URL: process.env.NODE_ENV == 'production' ? "https://comfacundi-api.frb.io" : "http://192.168.56.56",
    
    addNewPropertiesToVueInstance:(VueInstance)=>{
        VueInstance.prototype.redirect=function(route){
            this.$router.push(route)
        }
    }
}