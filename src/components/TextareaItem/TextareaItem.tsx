import {IonItem, IonLabel, IonTextarea} from '@ionic/react'
import clsx from 'clsx'
import {FC, KeyboardEventHandler} from 'react'
import {ErrorItem} from '../ErrorItem/ErrorItem'
import s from './TextareaItem.module.css'

interface Props {
	touched: boolean | undefined
	error: string | undefined
	value: string | null
	name: string
	label: string
	handleChange: any
	handleSubmit: any
}

export const TextareaItem: FC<Props> = ({
	                                        touched, error, value, name, label, handleChange, handleSubmit,
                                        }) => {
	const onKeyDown: KeyboardEventHandler = (e) => {
		if (e.key === 'Enter' && e.ctrlKey)
			handleSubmit()
	}

	return <>
		<IonItem className={clsx(touched && error && s.incorrect)}>
			<IonLabel position='floating'>{label}</IonLabel>
			<IonTextarea name={name} value={value} onIonChange={handleChange} autoGrow onKeyDown={onKeyDown}/>
		</IonItem>
		{touched && error && (
			<ErrorItem message={error}/>
		)}
	</>
}
