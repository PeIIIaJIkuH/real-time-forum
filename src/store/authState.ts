import {makeAutoObservable} from 'mobx'
import {authAPI} from '../api/auth'
import {IUser} from '../types'
import appState from './appState'

class AuthState {
	user: IUser | null = null
	connected: boolean = false

	constructor() {
		makeAutoObservable(this)
	}

	setUser(user: IUser | null) {
		this.user = user
	}

	setConnected(connected: boolean) {
		this.connected = connected
	}

	async fetchUserData() {
		appState.setIsLoading(true)
		const response = await authAPI.me()
		appState.setIsLoading(false)
		if (response.state) {
			this.setUser(response.data)
		} else {

		}
		this.setConnected(true)
	}

	async signOut() {
		const response = await authAPI.signOut()
		if (response.state) {
			this.setUser(null)
		} else {

		}
	}
}

export default new AuthState()
