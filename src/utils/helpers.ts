import {CSRF_TOKEN} from './constants'
import {DateTime} from 'luxon'

export const setCSRFToken = (token: string) => {
	localStorage.setItem(CSRF_TOKEN, token)
}

export const getCSRFToken = (): string | null => {
	return localStorage.getItem(CSRF_TOKEN)
}

export const getTime = (seconds: number, withTime = false): string => {
	const date = DateTime.fromMillis(seconds * 1000).setLocale('en')
	const now = DateTime.now().setLocale('en')
	const isSameDay = now.diff(date, 'days').days < 1
	const isSameWeek = now.diff(date, 'weeks').weeks < 1
	if (isSameDay) {
		return date.toFormat('HH:mm')
	} else if (isSameWeek) {
		return date.weekdayShort + (withTime ? date.toFormat(' HH:mm') : '')
	}
	return date.toFormat(withTime ? 'DD' : 'dd:mm:yy HH:mm')
}

// todo
// fix bug with time
