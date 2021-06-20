import {ApiResponse} from '../types'
import {defaultAxios} from './index'

const getAllUsers = (): Promise<ApiResponse> => defaultAxios.get('chats/users')

const getPrivateChats = (): Promise<ApiResponse> => defaultAxios.get('chats')

export const chatsAPI = {
	getAllUsers,
	getPrivateChats
}
