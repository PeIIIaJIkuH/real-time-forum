import {makeAutoObservable} from 'mobx'
import {chatsAPI} from '../api/chats'
import {IChatRoom, IChatUser, IMessage} from '../types'
import appState from './appState'

class ChatsState {
	chatUsers: IChatUser[] = []
	chatRooms: IChatRoom[] = []
	room: IChatRoom | null = null
	messages: IMessage[] = []
	completed: boolean = false
	lastMessageId: number = 0
	loading: boolean = false
	disabled: boolean = false

	constructor() {
		makeAutoObservable(this)
	}

	setChatsUsers(users: IChatUser[]) {
		this.chatUsers = users
	}

	setChatRooms(rooms: IChatRoom[]) {
		this.chatRooms = rooms
	}

	setRoom(room: IChatRoom | null) {
		this.room = room
	}

	setMessages(messages: IMessage[]) {
		this.messages = messages
	}

	pushBack(messages: IMessage[]) {
		this.messages = [...this.messages, ...messages]
	}

	pushFront(messages: IMessage[]) {
		this.messages = [...messages, ...this.messages]
	}

	setCompleted(completed: boolean) {
		this.completed = completed
	}

	setLastMessageId(id: number) {
		this.lastMessageId = id
	}

	setLoading(loading: boolean) {
		this.loading = loading
	}
	
	setDisabled(disabled: boolean) {
		this.disabled = disabled
	}

	async fetchUsers() {
		this.setChatsUsers([])
		this.setChatRooms([])
		appState.setIsLoading(true)
		const response = await chatsAPI.getAllUsers()
		appState.setIsLoading(false)
		if (response.state && response.data) {
			this.setChatsUsers(response.data)
		}
	}

	async fetchChatRooms() {
		this.setChatsUsers([])
		this.setChatRooms([])
		appState.setIsLoading(true)
		const response = await chatsAPI.getPrivateChats()
		appState.setIsLoading(false)
		if (response.state && response.data) {
			this.setChatRooms(response.data)
		}
	}

	async fetchMessages(callback?: () => void) {
		if (this.loading) {
			return
		}
		appState.setIsLoading(true)
		this.setLoading(true)
		const response = await chatsAPI.getMessages(this.room?.id!, this.lastMessageId)
		this.setLoading(false)
		appState.setIsLoading(false)
		if (!response.data) {
			this.setCompleted(true)
			return
		}
		this.pushBack(response.data)
		if (callback) {
			callback()
		}
		this.setLastMessageId(this.messages[this.messages.length - 1].id)
		this.setCompleted(false)
	}
}

export default new ChatsState()
