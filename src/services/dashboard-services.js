import axios from "axios";

export const getCurrentWeather = async (authCode) => {
    try {
        const response = await axios.get("http://localhost:8080/weather/weatherdata", { headers: { "authorization": authCode } });
        return response.data;
    }
    catch (error) {
        console.log("Error in getCurrentWeather", error);
    }
}

export const getVideoData = async (authCode) => {
    try {
        const response = await axios.get("http://localhost:8080/camera/homedata", { headers: { authorization: authCode } });
        return response.data;
    }
    catch (error) {
        console.error("Error in getVideoData", error);
    }
}

export const getPHWeek = async () => {
    try {
        const response = await axios.get("http://localhost:8080/ph/week");
        return response.data;
    }
    catch (error) {
        console.error("Error in getPHWeek", error);
    }
}

export const getRenderData = async () => {
    try {
        const renderData = await axios.get("http://localhost:8080/information/services");
        return renderData.data
    }
    catch (error) {
        console.error("Error in getRenderData", error)
    }
}