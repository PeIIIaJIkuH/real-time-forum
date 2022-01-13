import {IonCol, IonRow} from '@ionic/react'
import clsx from 'clsx'
import moment from 'moment'
import {FC} from 'react'
import {IMessage} from '../../types'
import s from './MessageItem.module.css'
import {dateFormat} from '../../utils/constants'

interface Props {
	message: IMessage
}

export const MessageItem: FC<Props> = ({message}) => {
	return (
		<IonRow className={s.wrapper}>
			<IonCol className={clsx(s.inner, message.isYourMessage && s.myMessage)} size='auto'>
				<div>{message.content}</div>
				<div className={s.date}>{moment(message.messageDate * 1000).calendar(null, dateFormat)}</div>
			</IonCol>
		</IonRow>
	)
}
