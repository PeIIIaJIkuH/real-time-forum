import {TextFieldTypes} from '@ionic/core'
import {IonInput, IonItem, IonLabel} from '@ionic/react'
import clsx from 'clsx'
import {FC, KeyboardEventHandler} from 'react'
import {ErrorItem} from '../ErrorItem/ErrorItem'
import s from './InputItem.module.css'

interface Props {
	touched: boolean | undefined
	error: string | undefined
	value: string | number | null
	type: TextFieldTypes
	name: string
	label: string
	handleChange: any
	handleSubmit: any
}

export const InputItem: FC<Props> = ({
										 touched, error, value, name, label, handleChange, type, handleSubmit
									 }) => {
	const onKeyDown: KeyboardEventHandler = (e) => {
		if (e.key === 'Enter')
			handleSubmit()
	}

	return <>
		<IonItem className={clsx(touched && error && s.incorrect)}>
			<IonLabel position='floating'>{label}</IonLabel>
			<IonInput type={type} name={name} value={value} onIonChange={handleChange} onKeyDown={onKeyDown}/>
		</IonItem>
		{touched && error && (
			<ErrorItem message={error}/>
		)}
	</>
}
