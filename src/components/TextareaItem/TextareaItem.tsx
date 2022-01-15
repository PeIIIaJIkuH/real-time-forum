import {IonButton, IonIcon, IonItem, IonLabel, IonPopover, IonTextarea} from '@ionic/react'
import clsx from 'clsx'
import {FC, KeyboardEventHandler, useState} from 'react'
import s from './TextareaItem.module.css'
import {alertCircleOutline} from 'ionicons/icons'

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
	const [isOpen, setIsOpen] = useState(false)

	const onClick = () => {
		setIsOpen(true)
	}

	const onDismiss = () => {
		setIsOpen(false)
	}

	const onKeyDown: KeyboardEventHandler = (e) => {
		if (e.key === 'Enter' && e.ctrlKey)
			handleSubmit()
	}

	return (
		<IonItem className={clsx(touched && error && s.incorrect, s.item)}>
			<IonLabel position='floating'>{label}</IonLabel>
			<IonTextarea name={name} value={value} onIonChange={handleChange} autoGrow onKeyDown={onKeyDown}/>
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
	)
}
