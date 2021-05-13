import {ApiResponse, LoginValues, RegisterValues} from '../types'
import {defaultAxios} from './index'

const signUp = (values: RegisterValues): Promise<ApiResponse> =>
	defaultAxios.post('user/signup', values)

const signIn = (values: LoginValues): Promise<ApiResponse> => defaultAxios.post('session/login', values)

const signOut = (): Promise<ApiResponse> => defaultAxios.delete('session/logout')

const me = (): Promise<ApiResponse> => defaultAxios.get('users/me')

export const authAPI = {
	signUp,
	signIn,
	signOut,
	me
}
