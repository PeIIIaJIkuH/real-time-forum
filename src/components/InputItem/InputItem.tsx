import {TextFieldTypes} from '@ionic/core'
import {IonButton, IonIcon, IonInput, IonItem, IonLabel, IonPopover} from '@ionic/react'
import clsx from 'clsx'
import {FC, KeyboardEventHandler, useRef, useState} from 'react'
import s from './InputItem.module.css'
import {alertCircleOutline} from 'ionicons/icons'

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
		padding = true,
	},
) => {
	const [isOpen, setIsOpen] = useState(false),
		ref = useRef<HTMLIonInputElement>(null)

	const onKeyDown: KeyboardEventHandler = (e) => {
		if (e.key === 'Enter') {
			handleSubmit()
		}
	}

	const onClick = () => {
		setIsOpen(true)
	}

	const onDismiss = () => {
		setIsOpen(false)
	}

	return <>
		<IonItem className={clsx(touched && error && s.incorrect, !padding && s.noPadding, s.item)} lines={withLine ? 'full' : 'none'}>
			{label && (
				<IonLabel position='floating'>
					{label}
				</IonLabel>
			)}
			<IonInput ref={ref} type={type} name={name} value={value} onIonChange={handleChange} onKeyDown={onKeyDown}
			          placeholder={placeholder} inputmode={mode} spellcheck={true} clearOnEdit={true}
			/>
			{touched && error && (
				<>
					<IonButton slot='end' onClick={onClick} fill='clear'>
						<IonIcon icon={alertCircleOutline} color='danger' slot='icon-only'/>
					</IonButton>
					<IonPopover isOpen={isOpen} onDidDismiss={onDismiss} cssClass={s.popover}>
						<div className={s.popover}>
							{error}
						</div>
					</IonPopover>
				</>
			)}
		</IonItem>
	</>
}
