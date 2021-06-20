export interface IUser {
	username: string
	email: string
	firstName: string
	lastName: string
	age: number
	gender: IGender
	createdAt: number
	lastActive: number
	status: IUserStatus
}

export interface ICategory {
	id: number
	name: string
}

export interface IPost {
	id: number
	author: IUser
	title: string
	content: string
	createdAt: number
	categories: ICategory[]
	commentsNumber: number
}

export interface IComment {
	id: number
	author: IUser
	postId: number
	content: string
	createdAt: number
}

export interface IMessage {
	id: number
	authorId: number
}

export interface IChatUser {
	id: number
	username: string
	status: string
}

export interface IChatRoom {
	id: number
	lastMessageDate: number
	user: IChatUser
}

export interface LoginValues {
	usernameOrEmail: string | null
	password: string | null
}

export type IGender = 'male' | 'female' | 'other'
export type IUserStatus = 'online' | 'offline'

export interface RegisterValues {
	username: string | null
	email: string | null
	password: string | null
	rePassword: string | null
	firstName: string | null
	lastName: string | null
	age: number | null
	gender: IGender | null
}

export interface ApiResponse {
	state: boolean
	httpCode: number
	message: string
	data: any
}

export interface PostValues {
	title: string | null
	content: string | null
	categories: string | null
}

export interface CommentValues {
	comment: string | null
}
