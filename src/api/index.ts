import axios from 'axios'
import {CSRF_TOKEN} from '../utils/constants'
import {getCSRFToken, setCSRFToken} from '../utils/helpers'

export const defaultAxios = axios.create({
	baseURL: 'http://localhost:8081/api/v1/',
	withCredentials: true
})

defaultAxios.interceptors.request.use(c => {
	c.headers[CSRF_TOKEN] = getCSRFToken()
	return c
})

defaultAxios.interceptors.response.use(r => {
	switch (r.config.url) {
		case 'session/login':
			setCSRFToken(r.headers[CSRF_TOKEN])
			break
		case 'session/logout':
			setCSRFToken('')
			break
	}
	return r.data
}, e => e.response.data)
