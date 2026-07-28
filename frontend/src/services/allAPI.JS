import commonAPI from "./commonAPI"


//register
export const registerAPI = async (reqBody) => {
    return await commonAPI("POST",'/register',reqBody)
}

//login
export const loginAPI = async (reqBody) => {
    return await commonAPI("POST",'/login',reqBody)
}

//update user
export const updateUserProileAPI = async (userID, reqBody) => {
    return await commonAPI("PUT",`/updateUser/${userID}`,reqBody)
}