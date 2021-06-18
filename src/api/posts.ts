import {ApiResponse, PostValues} from '../types'
import {defaultAxios} from './index'

const getCategories = (): Promise<ApiResponse> => defaultAxios.get('categories')

const createPost = (values: PostValues): Promise<ApiResponse> => defaultAxios.post('post', {
	title: values.title,
	content: values.content,
	categories: [values.categories]
})

const getAllPosts = (lastPostId: number, limit: number): Promise<ApiResponse> => defaultAxios.post('posts', {
	option: 'all',
	lastPostId,
	limit
})

const getPostById = (id: string): Promise<ApiResponse> => defaultAxios.get(`posts/${id}`)

const getPostComments = (postId: string, lastPostId: number, limit: number): Promise<ApiResponse> => defaultAxios.post('comments', {
	option: 'post',
	'post_id': +postId,
	lastPostID: lastPostId,
	limit
})

const createComment = (comment: string, postId: string): Promise<ApiResponse> => defaultAxios.post('comment', {
	content: comment,
	postID: +postId
}) 

export const postsAPI = {
	getCategories,
	createPost,
	getAllPosts,
	getPostById,
	getPostComments,
	createComment
}
