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


// add book
export const addBookAPI = async (bookData) => {
    return await commonAPI("POST",`/addBook`,bookData)
}

//get latest books for home page
export const getHomeBooksAPI = async () => {
    return await commonAPI("GET",'/getHomeBooks',{})
}

//get all books
export const getAllBooksAPI = async(searchKey) => {
    return await commonAPI("GET",`/getAllBooks?search=${searchKey}`,{})
}

//view book
export const viewBookAPI = async (bookID) => {
    return await commonAPI("GET",`/viewBook/${bookID}`,{})
}

//get books uploaded by user
export const getBooksUploadedAPI = async () => {
    return await commonAPI('GET',`/userBooks`,{})
}

//get Purchase history
export const getPurchaseHistory = async () => {
    return await commonAPI('GET',`/purchaseHistory`)
}
//delete book 
export const deleteBookAPI = async (bookID) => {
    return await commonAPI('DELETE',`/deleteBook/${bookID}`,{})
}

//admin : get pending books
export const getAllBooksAdminAPI = async() => {
    return await commonAPI("GET",'/allBooks/admin',{})
}

//admin: approve book
export const approveBookAPI = async (bookID) => {
    return await commonAPI('PUT',`/approveBook/${bookID}`,{})
}

//admin: get users
export const getUsersAPI = async () => {
    return await commonAPI('GET','/getUsers',{})
}

//admin: update profile
export const updateAdminAPI = async (id,reqBody) => {
    return await commonAPI('PUT',`/updateAdmin/${id}`,reqBody)
}

//google auth
export const googleAuthAPI = async (reqBody) => {
    return await commonAPI('POST',`/googleAuth`,reqBody)
}

//abstrat
export const generateAbstractAPI = async (bookTitle) => {
    return await commonAPI('POST','/abstract/generate',{bookTitle})
}

//payment
export const makePaymentAPI = async (id)=>{
    return await commonAPI(`PUT`,`/make/payment/${id}`)
}