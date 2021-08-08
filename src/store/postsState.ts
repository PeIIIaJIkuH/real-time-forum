import {makeAutoObservable} from 'mobx'
import {postsAPI} from '../api/posts'
import {IPost} from '../types'
import appState from './appState'

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

	async fetchPosts() {
		appState.setIsLoading(true)
		const response = await postsAPI.getAllPosts(this.lastPostId, this.limit)
		appState.setIsLoading(false)
		if (!response.data) {
			this.setCompleted(true)
			return
		}
		this.appendPosts(response.data)
		this.setLastPostId(this.posts[this.posts.length - 1].id)
		this.setCompleted(false)
	}

	async fetchCreatedPosts(limit: number) {
		appState.setIsLoading(true)
		const response = await postsAPI.getAllPosts(0, limit)
		appState.setIsLoading(false)
		if (response.state) {
			this.setPosts([...response.data, ...this.posts])
		}

	}

	async refreshPosts() {
		appState.setIsLoading(true)
		this.setLastPostId(0)
		this.setCompleted(false)
		this.setPosts([])
		await this.fetchPosts()
		appState.setIsLoading(false)
	}
}

export default new PostsState()
