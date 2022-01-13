import {ApiResponse} from '../types'
import {defaultAxios} from './index'

const getAllUsers = (): Promise<ApiResponse> => defaultAxios.get('chats/users/all')

const getOnlineUsers = (): Promise<ApiResponse> => defaultAxios.get('chats/users/online')

const getPrivateChats = (): Promise<ApiResponse> => defaultAxios.get('chats')

const getRoom = (userId: number): Promise<ApiResponse> => defaultAxios.post('room', {
	userID: userId,
})

const getMessages = (roomId: number, lastMessageId: number): Promise<ApiResponse> => defaultAxios.post('messages', {
	roomID: roomId,
	lastMessageID: lastMessageId,
})

const readMessages = (roomId: number): Promise<ApiResponse> => defaultAxios.put('room/messages', {
	roomID: roomId,
})

const readMessage = (roomId: number, messageId: number) => defaultAxios.put('room/message', {
	roomID: roomId,
	messageID: messageId,
})

export const chatsAPI = {
	getAllUsers,
	getOnlineUsers,
	getPrivateChats,
	getRoom,
	getMessages,
	readMessages,
	readMessage,
}
