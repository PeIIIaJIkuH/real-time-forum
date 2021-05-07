import {IonIcon, IonText} from '@ionic/react'
import {alertCircleOutline} from 'ionicons/icons'
import {FC} from 'react'
import s from './ErrorItem.module.css'

interface Props {
	message: string
}

export const ErrorItem: FC<Props> = ({message}) => {
	return (
		<div className={s.error}>
			<IonIcon icon={alertCircleOutline} color='danger' className={s.icon}/>
			<IonText color='danger'>{message}</IonText>
		</div>
	)
}
