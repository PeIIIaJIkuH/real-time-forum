import {ApiResponse, RegisterValues} from '../types'
import {defaultAxios} from './index'

const signUp = (values: RegisterValues): Promise<ApiResponse> => defaultAxios.post('user/signup', {
	...values,
	nickname: values.username
}).then(r => r.data).catch(e => e.response.data)

export const authAPI = {
	signUp
}
