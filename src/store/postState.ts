import {makeAutoObservable} from 'mobx'
import {postsAPI} from '../api/posts'
import {IComment, IPost} from '../types'
import appState from './appState'

class PostState {
	post: IPost | null = null
	postError: boolean = false
	comments: IComment[] = []

	constructor() {
		makeAutoObservable(this)
	}

	setPost(post: IPost | null) {
		this.post = post
	}

	setPostError(error: boolean) {
		this.postError = error
	}

	setComments(comments: IComment[]) {
		this.comments = comments
	}

	async fetchPost(id: string) {
		appState.setIsLoading(true)
		const response = await postsAPI.getPostById(id)
		appState.setIsLoading(false)
		if (!response.state) {
			this.setPostError(true)
			return
		}
		this.setPost(response.data)
		this.setPostError(false)
	}

	async fetchComments(postId: string) {
		appState.setIsLoading(true)
		const response = await postsAPI.getPostComments(postId, 0, 10)
		appState.setIsLoading(false)
		if (!response.state) {
			return
		}
		this.setComments(JSON.parse(JSON.stringify(response.data), function (prop, value) {
			if (prop === 'post_id') {
				this.postId = value
				return
			} else {
				return value
			}
		}))
	}

	async fetchData(id: string) {
		await this.fetchPost(id)
		await this.fetchComments(id)
	}
}

export default new PostState()
