import {IonCol, IonRow} from '@ionic/react'
import clsx from 'clsx'
import {FC} from 'react'
import {IMessage} from '../../types'
import s from './MessageItem.module.css'
import {getTime} from '../../utils/helpers'

interface Props {
	message: IMessage
	innerRef?: any
}

export const MessageItem: FC<Props> = ({message, innerRef}) => {
	return (
		<IonRow className={s.wrapper} ref={innerRef}>
			<IonCol className={clsx(s.inner, message.isYourMessage && s.myMessage)} size='auto'>
				<div className='break-word'>{message.content}</div>
				<div className={s.date}>{getTime(message.messageDate, true)}</div>
			</IonCol>
		</IonRow>
	)
}
