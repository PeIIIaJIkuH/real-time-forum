import {makeAutoObservable} from 'mobx'
import {chatsAPI} from '../api/chats'
import {IChatRoom, IChatUser} from '../types'
import appState from './appState'

class ChatsState {
	chatUsers: IChatUser[] = []
	chatRooms: IChatRoom[] = []

	constructor() {
		makeAutoObservable(this)
	}

	setChatsUsers(users: IChatUser[]) {
		this.chatUsers = users
	}

	setChatRooms(rooms: IChatRoom[]) {
		this.chatRooms = rooms
	}

	async fetchChatUsers() {
		this.setChatsUsers([])
		this.setChatRooms([])
		appState.setIsLoading(true)
		const response = await chatsAPI.getAllUsers()
		appState.setIsLoading(false)
		if (response.state) {
			this.setChatsUsers(response.data)
		}
	}

	async fetchChatRooms() {
		this.setChatsUsers([])
		this.setChatRooms([])
		appState.setIsLoading(true)
		const response = await chatsAPI.getPrivateChats()
		appState.setIsLoading(false)
		if (response.state) {
			this.setChatRooms(response.data)
		}
	}
}

export default new ChatsState()
