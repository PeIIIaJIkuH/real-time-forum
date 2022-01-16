import {SegmentChangeEventDetail} from '@ionic/core'
import {
	IonGrid,
	IonLabel,
	IonModal,
	IonPage,
	IonRefresher,
	IonRefresherContent,
	IonSegment,
	IonSegmentButton,
} from '@ionic/react'
import {observer} from 'mobx-react-lite'
import {FC, useEffect, useState} from 'react'
import {useHistory} from 'react-router'
import {Chat} from '../../components/Chat'
import {Content} from '../../components/Content/Content'
import {Header} from '../../components/Header'
import authState from '../../store/authState'
import chatsState from '../../store/chatsState'
import {TSegment} from '../../types'
import {Messages} from '../Messages/Messages'
import s from './ChatsPage.module.css'

export const ChatsPage: FC = observer(() => {
	const history = useHistory(),
		[segment, setSegment] = useState<TSegment>('users')

	if (!authState.user && authState.connected) {
		setTimeout(() => history.push('/posts'))
	}

	const onSegmentChange = (e: CustomEvent<SegmentChangeEventDetail>) => {
		setSegment(e.detail.value as TSegment)
	}

	const loadData = async () => {
		if (segment === 'users') {
			await chatsState.fetchUsers()
		} else {
			await chatsState.fetchChatRooms()
		}
	}

	const refreshData = async (e: any) => {
		await loadData()
		e.detail.complete()
	}

	useEffect(() => {
		return () => {
			chatsState.setRoom(null)
		}
	}, [])

	return (
		<IonPage>
			<Header title='Chats'/>
			<Content>
				<IonRefresher slot='fixed' onIonRefresh={refreshData}>
					<IonRefresherContent/>
				</IonRefresher>
				<IonGrid fixed className='ion-no-padding'>
					<IonSegment onIonChange={onSegmentChange} value={segment} className={s.segment}>
						<IonSegmentButton value='users'>
							<IonLabel>Users</IonLabel>
						</IonSegmentButton>
						<IonSegmentButton value='chats'>
							<IonLabel>Chats</IonLabel>
						</IonSegmentButton>
					</IonSegment>
					<Chat segment={segment} loadData={loadData}/>
					{segment === 'chats' && chatsState.chatRooms.length === 0 && (
						<div className={s.noItems}>
							<div>There are no chats</div>
							<div>Be first to write to someone</div>
						</div>
					)}
					{segment === 'users' && chatsState.chatUsers.length === 0 && (
						<div className={s.noItems}>
							<div>There are no users</div>
							<div>Invite your friends</div>
						</div>
					)}
				</IonGrid>
				<IonModal isOpen={!!chatsState.room}>
					<Messages/>
				</IonModal>
			</Content>
		</IonPage>
	)
})
