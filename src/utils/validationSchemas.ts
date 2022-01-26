import * as yup from 'yup'

export const registerValidationSchema = yup.object({
	username: yup
		.string()
		.nullable()
		.min(4, 'Minimum 4 characters')
		.max(15, 'Maximum 15 characters')
		.matches(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/, 'Only alphanumeric characters with [" ", "_", "-"]')
		.required('Required'),
	email: yup
		.string()
		.nullable()
		.min(5, 'Minimum 5 characters')
		.max(15, 'Maximum 15 characters')
		.email('Invalid email')
		.required('Required'),
	password: yup
		.string()
		.nullable()
		.min(6, 'Minimum 6 characters')
		.max(20, 'Maximum 20 characters')
		.required('Required'),
	rePassword: yup
		.string()
		.nullable()
		.oneOf([yup.ref('password')], 'Passwords must match')
		.required('Required'),
	firstName: yup
		.string()
		.nullable()
		.min(4, 'Minimum 4 characters')
		.max(15, 'Maximum 15 characters')
		.matches(/^[A-Za-z]+$/, 'Only alphabetic characters')
		.required('Required'),
	lastName: yup
		.string()
		.nullable()
		.min(4, 'Minimum 4 characters')
		.max(15, 'Maximum 15 characters')
		.matches(/^[A-Za-z]+$/, 'Only alphabetic characters')
		.required('Required'),
	age: yup
		.number()
		.nullable()
		.positive('Only positive numbers')
		.integer('Only integers')
		.min(10, 'Minimum 10')
		.max(100, 'Maximum 100')
		.required('Required'),
	gender: yup
		.string()
		.nullable()
		.required('Required'),
})

export const loginValidationSchema = yup.object({
	usernameOrEmail: yup
		.string()
		.nullable()
		.required('Required'),
	password: yup
		.string()
		.nullable()
		.required('Required'),
})

export const postValidationSchema = yup.object({
	title: yup
		.string()
		.nullable()
		.trim('No whitespaces are allowed at start or end of the string')
		.required('Required'),
	content: yup
		.string()
		.nullable()
		.trim('No whitespaces are allowed at start or end of the string')
		.required('Required'),
})

export const commentValidationSchema = yup.object({
	comment: yup
		.string()
		.nullable()
		.trim('No whitespaces are allowed at start or end of the string')
		.required('Required'),
})
