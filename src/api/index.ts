import axios from 'axios'

export const defaultAxios = axios.create({
	baseURL: 'http://localhost:8081/api/v1/',
	withCredentials: true
})

defaultAxios.interceptors.response.use(r => r.data, e => e.response.data)
