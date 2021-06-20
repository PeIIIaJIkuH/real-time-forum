import {IonAvatar, IonItem, IonLabel} from '@ionic/react'
import {observer} from 'mobx-react-lite'
import {FC, useEffect} from 'react'
import chatsState from '../store/chatsState'

interface Props {

}

export const ChatUsers: FC<Props> = observer(() => {
	useEffect(() => {
		chatsState.fetchChatUsers().then()
	}, [])

	return <>
		{chatsState.chatUsers.map(chat => (
			<IonItem key={chat.id}>
				<IonAvatar>
					<img src='https://ionicframework.com/docs/demos/api/avatar/avatar.svg' alt='avatar'/>
				</IonAvatar>
				<IonLabel className='ion-margin-horizontal'>
					<h3>{chat.username}</h3>
					<h4>{chat.status}</h4>
				</IonLabel>
			</IonItem>
		))}
	</>
})
