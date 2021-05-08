import {ApiResponse, LoginValues, RegisterValues} from '../types'
import {defaultAxios} from './index'

const signUp = (values: RegisterValues): Promise<ApiResponse> => defaultAxios.post('user/signup', {
	...values,
	nickname: values.username
}).then(r => r.data).catch(e => e.response.data)

const signIn = (values: LoginValues): Promise<ApiResponse> => defaultAxios.post('session/login', {
	nickname: values.usernameOrEmail,
	password: values.password
}).then(r => r.data).catch(e => e.response.data)

const signOut = (): Promise<ApiResponse> => defaultAxios.delete('session/logout')
	.then(r => r.data).catch(e => e.response.data)

const me = (): Promise<ApiResponse> => defaultAxios.get('user/me')
	.then(r => r.data).catch(e => e.response.data)

export const authAPI = {
	signUp,
	signIn,
	signOut,
	me
}
