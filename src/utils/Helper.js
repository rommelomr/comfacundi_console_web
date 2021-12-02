export default {
    addNewPropertiesToVueInstance:(VueInstance)=>{
        VueInstance.prototype.redirect=function(route){
            this.$router.push(route)
        }
    }
}