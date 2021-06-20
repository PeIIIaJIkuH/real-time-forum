import {SegmentChangeEventDetail} from '@ionic/core'
import {IonGrid, IonLabel, IonList, IonListHeader, IonPage, IonSegment, IonSegmentButton} from '@ionic/react'
import {observer} from 'mobx-react-lite'
import {FC, useState} from 'react'
import {useHistory} from 'react-router'
import {ChatRooms} from '../components/ChatRooms'
import {ChatUsers} from '../components/ChatUsers'
import {Content} from '../components/Content/Content'
import {Header} from '../components/Header'
import authState from '../store/authState'

export const ChatsPage: FC = observer(() => {
	const history = useHistory(),
		[segment, setSegment] = useState<'all' | 'my'>('all')

	if (!authState.user && authState.connected) {
		setTimeout(() => history.push('/posts'))
	}

	const onSegmentChange = (e: CustomEvent<SegmentChangeEventDetail>) => {
		setSegment(e.detail.value! as 'all' | 'my')
	}

	return (
		<IonPage>
			<Header title='ChatsPage'/>
			<Content>
				<IonGrid fixed className='ion-no-padding'>
					<IonSegment onIonChange={onSegmentChange} value={segment}>
						<IonSegmentButton value='all'>
							<IonLabel>All Users</IonLabel>
						</IonSegmentButton>
						<IonSegmentButton value='my'>
							<IonLabel>My Chats</IonLabel>
						</IonSegmentButton>
					</IonSegment>
					<IonList>
						<IonListHeader>
							<IonLabel>{segment === 'all' ? 'All Users' : 'My Chats'}</IonLabel>
						</IonListHeader>
						{segment === 'all' ? (
							<ChatUsers/>
						) : (
							<ChatRooms/>
						)}
					</IonList>
				</IonGrid>
			</Content>
		</IonPage>
	)
})
