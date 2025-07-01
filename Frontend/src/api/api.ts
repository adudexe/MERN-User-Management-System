import axios from "axios"

const api = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true,
})

interface responseData {
    accessToken:string
}

// Attach access token to every request
api.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken'); 
    if(token){
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
});

// Handle 401 responses
api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if(error.response?.status == 401 && !originalRequest._retry){
            originalRequest._retry = true;

            try{
                //Refresh Token Call
                const response:Axios.AxiosXHR<responseData> = await api.get('/refresh-token');
                const result = response.data;

                if(result && result.accessToken){
                    //Save New token
                    localStorage.setItem('accessToken',result.accessToken);

                    //Retry original Request with new token
                    originalRequest.headers.Authorization = `Bearer ${result.accessToken}`
                    return api(originalRequest);
                }
            } catch(err:any){
               console.error('Token Refresh failed',err);
               localStorage.removeItem('accessToken');

            }
        }
        return Promise.reject(error);
    }
);


export default api;