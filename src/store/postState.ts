import {makeAutoObservable} from 'mobx'
import {postsAPI} from '../api/posts'
import {IComment, IPost} from '../types'

class PostState {
	post: IPost | null = null
	postError: boolean = false
	comments: IComment[] | null = null
	commentsError: boolean = false

	constructor() {
		makeAutoObservable(this)
	}

	setPost(post: IPost | null) {
		this.post = post
	}

	setPostError(error: boolean) {
		this.postError = error
	}

	setComments(comments: IComment[] | null) {
		this.comments = comments
	}

	setCommentsError(error: boolean) {
		this.commentsError = error
	}

	async fetchPost(id: string) {
		const response = await postsAPI.getPostById(id)
		if (!response.state) {
			this.setPostError(true)
			return
		}
		this.setPost(response.data)
		this.setPostError(false)
	}

	async fetchComments(postId: string) {
		const response = await postsAPI.getPostComments(postId, 0, 10)
		if (!response.state) {
			this.setCommentsError(true)
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
		this.setCommentsError(false)
	}

	async fetchData(id: string) {
		await this.fetchPost(id)
		await this.fetchComments(id)
	}
}

export default new PostState()
