import axios from "axios";
import BASE_URL from "./config"

export const authorize = async() => {
    try{
        const response = await axios.get(BASE_URL + "/authorize");
        return response.data;
    }
    catch(err){
        console.error(err);
    }
}
