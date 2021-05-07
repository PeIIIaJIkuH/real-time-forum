import {makeAutoObservable} from 'mobx'

class AppState {
	title: string = ''
	
	constructor() {
		makeAutoObservable(this)
	}
	
	setTitle(title: string) {
		this.title = title
	}
}

export default new AppState()
