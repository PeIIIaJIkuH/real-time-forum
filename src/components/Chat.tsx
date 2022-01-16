import {observer} from 'mobx-react-lite'
import {FC, useEffect} from 'react'
import chatsState from '../store/chatsState'
import {TSegment} from '../types'
import {ChatItem} from './ChatItem/ChatItem'
import {IonList} from '@ionic/react'

interface Props {
	segment: TSegment
}

export const Chat: FC<Props> = observer(({segment}) => {
	const loadData = () => {
		if (segment === 'users') {
			chatsState.fetchUsers().then()
		} else {
			chatsState.fetchChatRooms().then()
		}
	}

	useEffect(() => {
		loadData()
	}, [segment, chatsState.room])

	return (
		<IonList>
			{segment === 'users' && (
				chatsState.chatUsers.map(user => (
					<ChatItem user={user} key={user.id}/>
				))
			)}
			{segment === 'chats' && (
				chatsState.chatRooms.map(room => (
					<ChatItem user={room.user} key={room.user.id} lastMessage={room.lastMessage}
					          unreadMsgNumber={room.unreadMsgNumber}
					/>
				))
			)}
		</IonList>
	)
})
