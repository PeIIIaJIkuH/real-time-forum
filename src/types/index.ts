export interface IUser {
	username: string
	email: string
	firstName: string
	lastName: string
	age: number
	gender: IGender
	createdAt: number
	lastActive: number
}

export interface ICategory {
	id: string
	text: string
}

export interface IPost {
	id: string
	authorId: string
	title: string
	content: string
	createdAt: number
	categories: ICategory[]
	comments: IComment[]
}

export interface IComment {
	id: string
	authorId: string
	postId: string
	text: string
	createdAt: number
}

export interface IMessage {
	id: string
	authorId: string
}

export interface IChat {
	id: string
}

export interface LoginValues {
	usernameOrEmail: string | null
	password: string | null
}

export type IGender = 'male' | 'female' | 'other'

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
}
