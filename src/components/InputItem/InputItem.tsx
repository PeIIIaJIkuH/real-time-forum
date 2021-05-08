import {TextFieldTypes} from '@ionic/core'
import {IonInput, IonItem, IonLabel} from '@ionic/react'
import clsx from 'clsx'
import {FC, useState} from 'react'
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
}

export const InputItem: FC<Props> = ({
										 touched, error, value, name, label, handleChange, type
									 }) => {
	const [isActive, setIsActive] = useState(false)

	const onFocus = () => {
		setIsActive(true)
	}

	const onBlur = () => {
		setIsActive(false)
	}

	return <>
		<IonItem className={clsx(touched && error && s.incorrect, touched && !error && isActive && s.correct)} onFocus={onFocus} onBlur={onBlur}>
			<IonLabel position='floating'>{label}</IonLabel>
			<IonInput type={type} name={name} value={value} onIonChange={handleChange}/>
		</IonItem>
		{touched && error && (
			<ErrorItem message={error}/>
		)}
	</>
}
