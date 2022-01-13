import {makeAutoObservable} from 'mobx'

class AppState {
	isLoading: boolean = false

	constructor() {
		makeAutoObservable(this)
	}

	setIsLoading(isLoading: boolean) {
		this.isLoading = isLoading
	}
}

export default new AppState()
