import axios from "axios";

export const getCurrentWeather = async(authCode) => {
    try{
        const reponse = await axios.get("http://localhost:8080/weather/weatherdata", {headers:{"authorization" : authCode}});  
        return reponse.data; 
    }
    catch(error){
        console.log("Error in getCurrentWeather", error);
    }
    

}