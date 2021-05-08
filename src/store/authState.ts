import {makeAutoObservable} from 'mobx'
import {authAPI} from '../api/auth'
import {IUser} from '../types'

class AuthState {
	user: IUser | null = null

	constructor() {
		makeAutoObservable(this)
	}

	setUser(user: IUser | null) {
		this.user = user
	}

	async fetchUserData() {
		const response = await authAPI.me()
		if (response.state) {
			const {nickname, email, firstName, lastName, age, gender, createdAt, lastActive} = response.data
			this.setUser({
				username: nickname, email, firstName, lastName, age, gender, createdAt, lastActive
			})
		} else {

		}
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
