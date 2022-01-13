import {IonAvatar, IonIcon, IonItem, IonLabel, IonText} from '@ionic/react'
import moment from 'moment'
import {FC} from 'react'
import {chatsAPI} from '../../api/chats'
import chatsState from '../../store/chatsState'
import {IChatUser, IMessage} from '../../types'
import s from './ChatItem.module.css'
import {lastMessageDateFormat} from '../../utils/constants'
import {checkmarkDoneOutline} from 'ionicons/icons'
import authState from '../../store/authState'
import {observer} from 'mobx-react-lite'

interface Props {
	user: IChatUser
	lastMessage?: IMessage
	unreadMsgNumber?: number
}

export const ChatItem: FC<Props> = observer(({user, lastMessage, unreadMsgNumber}) => {
	const onClick = async () => {
		const response = await chatsAPI.getRoom(user.id)
		if (response.state && response.data) {
			const {user, id, unreadMsgNumber, lastMessage} = response.data
			chatsState.setRoom({
				user, id, lastMessage, unreadMsgNumber,
			})
		}
	}

	return (
		<IonItem key={user.id} onClick={onClick}>
			<IonAvatar>
				<img src='https://ionicframework.com/docs/demos/api/avatar/avatar.svg' alt='avatar'/>
			</IonAvatar>
			<IonLabel className='ion-margin-horizontal'>
				<div className={s.wrapper}>
					<IonText className={s.username}>{user.username}</IonText>
				</div>
				<div className={s.wrapper}>
					<IonText color='medium' className={s.lastMessageOrStatus}>
						{lastMessage ? lastMessage.content : user.status}
					</IonText>
				</div>
			</IonLabel>
			<div className={s.col}>
				{lastMessage ? (
					<IonText color='medium' className={s.lastMessageDate}>
						{moment(lastMessage.messageDate * 1000).calendar(null, lastMessageDateFormat)}
					</IonText>
				) : null}
				<div className={s.info}>
					{lastMessage?.user.id === authState.user?.id && lastMessage?.read ? (
						<IonIcon icon={checkmarkDoneOutline} color='primary'/>
					) : (
						!unreadMsgNumber ? null : (
							<IonText color='medium' className={s.unreadMessages}>{unreadMsgNumber}</IonText>
						)
					)}
				</div>
			</div>
		</IonItem>
	)
})
