import {ApiResponse} from '../types'
import {defaultAxios} from './index'

const getAllUsers = (): Promise<ApiResponse> => defaultAxios.get('chats/users')

const getPrivateChats = (): Promise<ApiResponse> => defaultAxios.get('chats')

const getRoom = (id: number): Promise<ApiResponse> => defaultAxios.post('room', {
	userID: id
})

const getMessages = (id: number, lastMessageId: number): Promise<ApiResponse> => defaultAxios.post('messages', {
	roomID: id,
	lastMessageID: lastMessageId
})

export const chatsAPI = {
	getAllUsers,
	getPrivateChats,
	getRoom,
	getMessages
}
