import {
	IonButton,
	IonContent,
	IonFooter,
	IonGrid,
	IonIcon,
	IonInfiniteScroll,
	IonPage,
	IonProgressBar
} from '@ionic/react'
import {arrowBackOutline} from 'ionicons/icons'
import {observer} from 'mobx-react-lite'
import {FC, useEffect} from 'react'
import {Header} from '../../components/Header'
import {MessageInputForm} from '../../components/MessageInputForm/MessageInputForm'
import {MessageItem} from '../../components/MessageItem/MessageItem'
import chatsState from '../../store/chatsState'
import s from './Messages.module.css'
import clsx from "clsx";
import appState from "../../store/appState";

export const Messages: FC = observer(() => {
	console.log(appState.isLoading)
	const closeModal = () => {
		chatsState.setRoom(null)
	}

	const backButton = (
		<IonButton onClick={closeModal}>
			<IonIcon icon={arrowBackOutline} slot='icon-only'/>
		</IonButton>
	)

	const onInfinite = async (e: any) => {
		console.log('123')
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
			<IonContent>
				<IonProgressBar type='indeterminate' className={clsx(s.progressBar, appState.isLoading && s.show)}/>
				<IonInfiniteScroll
					threshold='10%' onIonInfinite={onInfinite} disabled={chatsState.completed} position='top'
				/>
				<IonGrid className={s.grid}>
					{chatsState.messages.map(message => (
						<MessageItem message={message} key={message.id}/>
					))}
				</IonGrid>
			</IonContent>
			<IonFooter>
				<MessageInputForm/>
			</IonFooter>
		</IonPage>
	)
})
