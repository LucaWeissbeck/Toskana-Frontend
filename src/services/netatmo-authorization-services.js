import axios from "axios";

export const getAuthToken = async() => {
    try{
        const reponse = await axios.get("http://localhost:8080/authorise/auth");
        return reponse.data.access_token;
    }
    catch(error){
        console.log("Error in getAuthToken", error);
    }
}