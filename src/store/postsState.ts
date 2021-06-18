import {makeAutoObservable} from 'mobx'
import {postsAPI} from '../api/posts'
import {IPost} from '../types'

class PostsState {
	posts: IPost[] = []
	lastPostId: number = 0
	completed: boolean = false

	constructor() {
		makeAutoObservable(this)
	}

	setPosts(posts: IPost[]) {
		this.posts = posts
	}

	appendPosts(posts: IPost[]) {
		this.posts.push(...posts)
	}

	setLastPostId(id: number) {
		this.lastPostId = id
	}

	setCompleted(completed: boolean) {
		this.completed = completed
	}

	async fetchAllPosts() {
		const response = await postsAPI.getAllPosts(this.lastPostId, 5)
		if (!response.data) {
			this.setCompleted(true)
			return
		}
		this.appendPosts(response.data)
		this.setLastPostId(this.posts[this.posts.length - 1].id)
		this.setCompleted(false)
	}

	async fetchCreatedPosts(limit: number) {
		const response = await postsAPI.getAllPosts(0, limit)
		console.log(response)
		if (response.state) {
			this.setPosts([...response.data, ...this.posts])
		}
	}
}

export default new PostsState()
