import {IonButton, IonFooter, IonGrid, IonIcon, IonPage, IonToolbar} from '@ionic/react'
import {arrowBackOutline} from 'ionicons/icons'
import {observer} from 'mobx-react-lite'
import {FC, useEffect} from 'react'
import {Content} from '../../components/Content/Content'
import {Header} from '../../components/Header'
import {MessageInputForm} from '../../components/MessageInputForm'
import {MessageItem} from '../../components/MessageItem/MessageItem'
import chatsState from '../../store/chatsState'
import s from './Messages.module.css'

export const Messages: FC = observer(() => {
	const closeModal = () => {
		chatsState.setRoom(null)
	}

	const backButton = (
		<IonButton onClick={closeModal}>
			<IonIcon icon={arrowBackOutline} slot='icon-only'/>
		</IonButton>
	)

	const onInfinite = async (e: any) => {
		await chatsState.fetchMessages()
		e.target!.complete()
	}

	useEffect(() => {
		chatsState.fetchMessages().then()

		return () => {
			chatsState.setMessages([])
			chatsState.setLastMessageId(0)
			chatsState.setCompleted(false)
		}
	}, [])
	
	return (
		<IonPage>
			<Header title={chatsState.room?.user.username!} backButton={backButton}/>
			<Content>
				<IonGrid className={s.grid}>
					{/*<IonInfiniteScroll threshold='100px' onIonInfinite={onInfinite} disabled={chatsState.completed} position='top'>*/}
					{/*	<IonInfiniteScrollContent/>*/}
					{/*</IonInfiniteScroll>*/}
					{chatsState.messages.map(message => (
						<MessageItem message={message} key={message.id}/>
					))}
				</IonGrid>
			</Content>
			<IonFooter>
				<IonToolbar>
					<MessageInputForm/>
				</IonToolbar>
			</IonFooter>
		</IonPage>
	)
})
