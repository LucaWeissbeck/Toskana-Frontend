import axios from "axios";
import BASE_URL from "./config"


export const getCurrentWeather = async (authCode) => {
    try {
        const response = await axios.get(BASE_URL + "/weather/weatherdata");
        return response.data;
    }
    catch (error) {
        console.log("Error in getCurrentWeather", error);
    }
}

export const getVideoData = async (authCode) => {
    try {
        const response = await axios.get(BASE_URL + "/camera/homedata", { headers: { authorization: authCode } });
        return response.data;
    }
    catch (error) {
        console.error("Error in getVideoData", error);
    }
}

export const getPHWeek = async () => {
    try {
        const response = await axios.get(BASE_URL + "/ph/week");
        return response.data;
    }
    catch (error) {
        console.error("Error in getPHWeek", error);
    }
}

export const getRenderData = async () => {
    try {
        const renderData = await axios.get(BASE_URL + "/information/services");
        return renderData.data
    }
    catch (error) {
        console.error("Error in getRenderData", error)
    }
}

export const getVideoEventData = async() => {
    try{
        const videoEventData = await axios.get(BASE_URL + "/camera/events");
        return videoEventData.data.body.home
    }
    catch(error){
        console.error("Error in getVideoEventData", error)
    }
}