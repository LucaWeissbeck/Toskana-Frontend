import axios from "axios";
import BASE_URL from "./config"

export const getToken = async() => {
    try{
        const response = await axios.get(BASE_URL + "/authorise/auth");
        return response.data;
    }
    catch(error){
        console.log("Error in getAuthToken", error);
    }
}
