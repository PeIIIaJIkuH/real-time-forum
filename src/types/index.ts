export type IAge = 'male' | 'female' | 'other'

export interface IUser {
	id: string
	username: string
	email: string
	firstName: string
	lastName: string
	age: number
	gender: IAge
}
