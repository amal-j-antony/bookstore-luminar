import axios from "axios";
import axiosInstance from "./axiosInstance";

const commonAPI = async (httpMethod,url,reqBody ,reqHeaders) => {

    const reqConfig = {
        method: httpMethod,
        url,
        data: reqBody,
        headers: reqHeaders
    }

    // return await axios(reqConfig).then(res => {
    //     return res
    // }).catch(err => {
    //     return err
    // })

    try {
        const response = await axiosInstance(reqConfig)
        return response
    } catch (error) {
        throw error
    }
}

export  default commonAPI