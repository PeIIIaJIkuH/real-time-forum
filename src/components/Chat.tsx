import {observer} from 'mobx-react-lite'
import {FC, useEffect} from 'react'
import {chatsAPI} from '../api/chats'
import chatsState from '../store/chatsState'
import {IChatUser, TSegment} from '../types'
import {ChatItem} from './ChatItem'

interface Props {
	segment: TSegment
}

export const Chat: FC<Props> = observer(({segment}) => {
	useEffect(() => {
		if (segment === 'all') {
			chatsState.fetchChatUsers().then()
		} else {
			chatsState.fetchChatRooms().then()
		}
	}, [segment])

	const getRoom = async (user: IChatUser) => {
		const response = await chatsAPI.getRoom(user.id)
		if (response.state && response.data) {
			const {user, id, lastMessageDate} = response.data
			chatsState.setRoom({
				user, id, lastMessageDate
			})
		}
	}

	return <>
		{segment === 'all' ? (
			chatsState.chatUsers.map(user => (
				<ChatItem user={user} getRoom={getRoom} key={user.id}/>
			))
		) : (
			chatsState.chatRooms.map(room => (
				<ChatItem user={room.user} getRoom={getRoom} key={room.user.id} lastMessageDate={room.lastMessageDate}/>
			))
		)}
	</>
})
