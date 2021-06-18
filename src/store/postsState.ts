import {makeAutoObservable} from 'mobx'
import {postsAPI} from '../api/posts'
import {IPost} from '../types'

class PostsState {
	posts: IPost[] = []
	lastPostId: number = 0
	completed: boolean = false
	limit: number = 5

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
		const response = await postsAPI.getAllPosts(this.lastPostId, this.limit)
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
		if (response.state) {
			this.setPosts([...response.data, ...this.posts])
		}
	}

	async refreshPosts() {
		this.setLastPostId(0)
		this.setCompleted(false)
		this.setPosts([])
		await this.fetchAllPosts()
	}
}

export default new PostsState()
