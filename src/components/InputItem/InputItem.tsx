import {TextFieldTypes} from '@ionic/core'
import {IonInput, IonItem, IonLabel} from '@ionic/react'
import clsx from 'clsx'
import {FC, KeyboardEventHandler, useRef} from 'react'
import {ErrorItem} from '../ErrorItem/ErrorItem'
import s from './InputItem.module.css'

interface Props {
	touched: boolean | undefined
	error: string | undefined
	value: string | number | null
	type: TextFieldTypes
	name: string
	label?: string
	handleChange: any
	handleSubmit: any
	withLine?: boolean
	placeholder?: string
	mode?: 'text' | 'email' | 'numeric'
	padding?: boolean
}

export const InputItem: FC<Props> = (
	{
		touched, error, value, name, label, handleChange,
		type, handleSubmit, withLine = true, placeholder, mode = 'text',
		padding = true
	}
) => {
	const ref = useRef<HTMLIonInputElement>(null)

	const onKeyDown: KeyboardEventHandler = (e) => {
		if (e.key === 'Enter')
			handleSubmit()
	}

	return <>
		<IonItem className={clsx(touched && error && s.incorrect, !padding && s.noPadding)} lines={withLine ? 'full' : 'none'}>
			{label && (
				<IonLabel position='floating'>
					{label}
				</IonLabel>
			)}
			<IonInput ref={ref} type={type} name={name} value={value} onIonChange={handleChange} onKeyDown={onKeyDown}
			          placeholder={placeholder} inputmode={mode} spellcheck={true} className={s.input}
			/>
		</IonItem>
		{touched && error && (
			<ErrorItem message={error}/>
		)}
	</>
}
