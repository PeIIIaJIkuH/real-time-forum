import {IonAvatar, IonItem, IonLabel} from '@ionic/react'
import {observer} from 'mobx-react-lite'
import {FC, useEffect} from 'react'
import chatsState from '../store/chatsState'

interface Props {

}

export const ChatRooms: FC<Props> = observer(() => {
	useEffect(() => {
		chatsState.fetchChatRooms().then()
	}, [])

	return <>
		{chatsState.chatRooms.map(room => (
			<IonItem key={room.user.id}>
				<IonAvatar>
					<img src='https://ionicframework.com/docs/demos/api/avatar/avatar.svg' alt='avatar'/>
				</IonAvatar>
				<IonLabel className='ion-margin-horizontal'>
					<h3>{room.user.username}</h3>
					<h4>{room.user.status}</h4>
				</IonLabel>
			</IonItem>
		))}
	</>
})
