import axios from "axios";

const authApiClient = axios.create({
    
  baseURL: 'http://localhost:8080/api/auth'
})

export const fetchUserData = async (userId) => {
    try {
      const response = await authApiClient.get(`/user/${userId}`); // Assuming your endpoint is /api/user/{userId}
      return response.data; // Assuming the response data contains the user object
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error; // Re-throw the error to handle it where the function is called
    }
  };
export const registerApi = (user) => authApiClient.post('/register', user)

export const loginApi = (username, password) => authApiClient.post('/login', { username, password })

export const saveLoggedUser = (userId, username) => {
    sessionStorage.setItem("activeUserId", userId)
    sessionStorage.setItem("authenticatedUser", username)
    // sessionStorage.setItem("role", role)
}

export const storeBasicAuth = (basicAuth) => localStorage.setItem("auth", basicAuth) 
export const getBasicAuth = () => localStorage.getItem("auth")

export const isUserLoggedIn = () => {

    const username = sessionStorage.getItem("authenticatedUser")

    if (username == null) {
        return false
    } else {
        return true
    }
}

export const getLoggedInUserId = () => {
    const userId = sessionStorage.getItem("activeUserId")
    return userId
}

export const getLoggedInUser = () => {
    const username = sessionStorage.getItem("authenticatedUser")
    return username
}

export const logout = () => {
    localStorage.clear()
    sessionStorage.clear()
}

