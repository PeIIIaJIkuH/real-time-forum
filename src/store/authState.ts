import {makeAutoObservable} from 'mobx'
import {IUser} from '../types'

class AuthState {
	isAuth: boolean = false
	user: IUser | null = null

	constructor() {
		makeAutoObservable(this)
	}

	setIsAuth(isAuth: boolean) {
		this.isAuth = isAuth
	}
	
	setUser(user: IUser) {
		this.user = user
	}
}

export default new AuthState()
