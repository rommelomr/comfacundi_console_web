export default {
    API_URL:"http://192.168.56.56/api",
    SERVER_URL:"http://192.168.56.56/",
    addNewPropertiesToVueInstance:(VueInstance)=>{
        VueInstance.prototype.redirect=function(route){
            this.$router.push(route)
        }
    }
}