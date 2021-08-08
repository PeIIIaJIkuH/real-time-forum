import {IonAvatar, IonItem, IonLabel, IonText} from '@ionic/react'
import moment from 'moment'
import {FC} from 'react'
import {IChatUser} from '../types'

interface Props {
	user: IChatUser
	getRoom: (user: IChatUser) => void
	lastMessageDate?: number
}

export const ChatItem: FC<Props> = ({user, getRoom, lastMessageDate}) => {
	return (
		<IonItem key={user.id} onClick={getRoom.bind(null, user)}>
			<IonAvatar>
				<img src='https://ionicframework.com/docs/demos/api/avatar/avatar.svg' alt='avatar'/>
			</IonAvatar>
			<IonLabel className='ion-margin-horizontal'>
				<h3>{user.username}</h3>
				<h4>{user.status}</h4>
			</IonLabel>
			{lastMessageDate ? (
				<IonText color='medium'>{moment(lastMessageDate * 1000).calendar()}</IonText>
			) : null}
		</IonItem>
	)
}
