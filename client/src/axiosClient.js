import axios from 'axios'

// Login ProUser
export const axiosClientLogin = axios.create()

axiosClientLogin.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

axiosClientLogin.interceptors.response.use((response) => {
    return response
}, (error) => {
    try {
        const { response } = error
        if(response.status === 401) {
            localStorage.removeItem('ACCESS_TOKEN')
        }
    } catch (error) {
        console.error(error)
    }
    
    throw error
})

export default axiosClientLogin