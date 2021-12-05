
import axios from 'axios'

const config = {
    baseUrl:'https://192.168.56.56/api',

}

const Axios = axios.create(config);

export default Axios;
