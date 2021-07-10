import axios from "axios";

export const getToken = async() => {
    try{
        const response = await axios.get("http://localhost:8080/authorise/auth");
        return response.data;
    }
    catch(error){
        console.log("Error in getAuthToken", error);
    }
}
