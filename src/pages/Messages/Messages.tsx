import {IonButton, IonFooter, IonGrid, IonIcon, IonPage, IonToolbar} from '@ionic/react'
import {arrowBackOutline} from 'ionicons/icons'
import {observer} from 'mobx-react-lite'
import {FC, useCallback, useEffect, useRef, useState} from 'react'
import {Header} from '../../components/Header'
import {MessageInputForm} from '../../components/MessageInputForm/MessageInputForm'
import chatsState from '../../store/chatsState'
import {Content} from '../../components/Content/Content'
import {MessageItem} from '../../components/MessageItem/MessageItem'
import {chatsAPI} from '../../api/chats'
import s from './Messages.module.css'

export const Messages: FC = observer(() => {
	const [wasOnce, setWasOnce] = useState(false),
		observer = useRef<IntersectionObserver>(),
		endRef = useRef<HTMLDivElement>(null)

	const scrollToBottom = () => {
		if (!wasOnce) {
			setTimeout(() => {
				endRef.current?.scrollIntoView({behavior: 'smooth'})
			}, 10)
			setWasOnce(true)
		}
	}

	const detectorRef = useCallback(node => {
		observer.current && observer.current.disconnect()
		observer.current = new IntersectionObserver(async entries => {
			if (entries[0].isIntersecting && !chatsState.completed) {
				await chatsState.fetchMessages(scrollToBottom)
			}
		})
		node && observer.current.observe(node)
	}, [chatsState.completed, observer.current])

	const onBack = () => {
		chatsState.setRoom(null)
		chatsState.setDisabled(true)
		setTimeout(() => {
			chatsState.setDisabled(false)
		}, 500)
	}

	const backButton = (
		<IonButton onClick={onBack}>
			<IonIcon icon={arrowBackOutline} slot='icon-only'/>
		</IonButton>
	)

	useEffect(() => {
		chatsState.fetchMessages().then()
		chatsAPI.readMessages(chatsState.room?.id!).then()
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
				<IonGrid fixed className={s.messages}>
					<div ref={endRef}/>
					{chatsState.messages.map((message, index) => (
						<MessageItem message={message} key={message.id}
						             innerRef={chatsState.messages.length === index + 3 ? detectorRef : undefined}
						/>
					))}
				</IonGrid>
			</Content>
			<IonFooter>
				<IonToolbar>
					<MessageInputForm endRef={endRef}/>
				</IonToolbar>
			</IonFooter>
		</IonPage>
	)
})
