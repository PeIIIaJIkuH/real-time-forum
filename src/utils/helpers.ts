import {CSRF_TOKEN} from './constants'

export const setCSRFToken = (token: string) => {
	localStorage.setItem(CSRF_TOKEN, token)
}

export const getCSRFToken = (): string | null => {
	return localStorage.getItem(CSRF_TOKEN)
}
