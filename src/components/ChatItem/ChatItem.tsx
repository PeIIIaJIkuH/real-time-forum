import {IonAvatar, IonItem, IonLabel, IonText} from '@ionic/react'
import moment from 'moment'
import {FC} from 'react'
import {chatsAPI} from '../../api/chats'
import chatsState from '../../store/chatsState'
import {IChatUser} from '../../types'
import s from './ChatItem.module.css'

interface Props {
	user: IChatUser
	lastMessageDate?: number
	unreadMsgNumber?: number
}

export const ChatItem: FC<Props> = ({user, lastMessageDate, unreadMsgNumber}) => {
	const onClick = async () => {
		const response = await chatsAPI.getRoom(user.id)
		if (response.state && response.data) {
			const {user, id, lastMessageDate, unreadMsgNumber} = response.data
			chatsState.setRoom({
				user, id, lastMessageDate, unreadMsgNumber
			})
		}
	}
	
	return (
		<IonItem key={user.id} onClick={onClick}>
			<IonAvatar>
				<img src='https://ionicframework.com/docs/demos/api/avatar/avatar.svg' alt='avatar'/>
			</IonAvatar>
			<IonLabel className='ion-margin-horizontal'>
				<h3>{user.username}</h3>
				<h4>{user.status}</h4>
			</IonLabel>
			<div className={s.col}>
				{unreadMsgNumber ? (
					<IonText color='medium' className={s.unreadMessages}>{unreadMsgNumber}</IonText>
				) : null}
				{lastMessageDate ? (
					<IonText color='medium' className={s.lastMessageDate}>{moment(lastMessageDate * 1000).calendar()}</IonText>
				) : null}
			</div>
		</IonItem>
	)
}
