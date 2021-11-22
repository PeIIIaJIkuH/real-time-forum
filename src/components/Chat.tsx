import {observer} from 'mobx-react-lite'
import {FC, useEffect} from 'react'
import chatsState from '../store/chatsState'
import {TSegment} from '../types'
import {ChatItem} from './ChatItem/ChatItem'

interface Props {
	segment: TSegment
}

export const Chat: FC<Props> = observer(({segment}) => {
	useEffect(() => {
		if (segment === 'all') {
			chatsState.fetchUsers('all').then()
		} else if (segment === 'online') {
			chatsState.fetchUsers('online').then()
		} else {
			chatsState.fetchChatRooms().then()
		}
	}, [segment])

	return <>
		{segment === 'private' ? (
			chatsState.chatRooms.map(room => (
				<ChatItem user={room.user} key={room.user.id} lastMessageDate={room.lastMessageDate} unreadMsgNumber={room.unreadMsgNumber}/>
			))
		) : (
			chatsState.chatUsers.map(user => (
				<ChatItem user={user} key={user.id}/>
			))
		)}
	</>
})
