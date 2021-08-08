import {SegmentChangeEventDetail} from '@ionic/core'
import {IonGrid, IonLabel, IonList, IonModal, IonPage, IonSegment, IonSegmentButton} from '@ionic/react'
import {toJS} from 'mobx'
import {observer} from 'mobx-react-lite'
import {FC, useEffect, useState} from 'react'
import {useHistory} from 'react-router'
import {Chat} from '../components/Chat'
import {Content} from '../components/Content/Content'
import {Header} from '../components/Header'
import authState from '../store/authState'
import chatsState from '../store/chatsState'
import {TSegment} from '../types'
import {Messages} from './Messages/Messages'

export const ChatsPage: FC = observer(() => {
	const history = useHistory(),
		[segment, setSegment] = useState<TSegment>('all')

	if (!authState.user && authState.connected) {
		setTimeout(() => history.push('/posts'))
	}

	const onSegmentChange = (e: CustomEvent<SegmentChangeEventDetail>) => {
		setSegment(e.detail.value as TSegment)
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
				<IonGrid fixed className='ion-no-padding'>
					<IonSegment onIonChange={onSegmentChange} value={segment}>
						<IonSegmentButton value='all'>
							<IonLabel>All Users</IonLabel>
						</IonSegmentButton>
						<IonSegmentButton value='private'>
							<IonLabel>My Chats</IonLabel>
						</IonSegmentButton>
					</IonSegment>
					<IonList>
						<Chat segment={segment}/>
					</IonList>
				</IonGrid>
				<IonModal isOpen={!!chatsState.room}>
					<Messages/>
				</IonModal>
			</Content>
		</IonPage>
	)
})
