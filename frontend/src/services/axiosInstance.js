import axios from "axios";
import { serverURL } from './serverURL'

const axiosInstance = axios.create({
    baseURL: serverURL,
    timeout: 5000
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("token")
        if (token) {
            config.headers.Authorization = `bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject({
            type: "configError",
            data: error
        })
    }
)

axiosInstance.interceptors.response.use(
    (response) => {

        console.log('Response received!');
        return response
    },
    (error) => {
        if (error.response) {
            const status = error.response.status
            if (status == 401) {
                console.log('Unauthorized access - Redirect to login');
            }
            else if (status == 404) {
                console.log('API not found');
            }
            else if (status == 500) {
                console.log('Server Error');
            }

        }
        else if (error.request) {
            console.log("No response from server");
        }
        else {
            console.log("Error :" + error.request);
        }
        return Promise.reject(error);
    }
)

export default axiosInstance
