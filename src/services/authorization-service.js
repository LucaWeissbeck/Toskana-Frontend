import axios from "axios";

export const authorize = async() => {
    try{
        const response = await axios.get("http://localhost:8080/authorize");
        return response.data;
    }
    catch(err){
        console.error(err);
    }
}
