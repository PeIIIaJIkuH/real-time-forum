import {IonButton, IonFooter, IonIcon, IonPage, IonToolbar} from '@ionic/react'
import {arrowBackOutline} from 'ionicons/icons'
import {observer} from 'mobx-react-lite'
import {FC, useCallback, useEffect, useRef, useState} from 'react'
import {Header} from '../../components/Header'
import {MessageInputForm} from '../../components/MessageInputForm/MessageInputForm'
import chatsState from '../../store/chatsState'
import {Content} from '../../components/Content/Content'
import {MessageItem} from '../../components/MessageItem/MessageItem'

import s from './Messages.module.css'
import {chatsAPI} from '../../api/chats'

export const Messages: FC = observer(() => {
	const [wasOnce, setWasOnce] = useState(false)
	const observer = useRef<IntersectionObserver>()
	const endRef = useRef<HTMLDivElement>(null)
	const ref = useRef<HTMLDivElement>(null)
	const scrollToBottom = () => {
		if (!wasOnce) {
			setTimeout(() => {
				endRef.current?.scrollIntoView({behavior: 'smooth'})
			}, 10)
		}
	}

	const detectorRef = useCallback(node => {
		observer.current && observer.current.disconnect()
		observer.current = new IntersectionObserver(async entries => {
			if (entries[0].isIntersecting) {
				await chatsState.fetchMessages(scrollToBottom)
				setTimeout(() => {
					setWasOnce(true)
				})
			}
		})
		node && observer.current.observe(node)
	}, [chatsState.completed, observer.current])

	const backButton = (
		<IonButton onClick={() => chatsState.setRoom(null)}>
			<IonIcon icon={arrowBackOutline} slot='icon-only'/>
		</IonButton>
	)

	useEffect(() => {
		chatsAPI.readMessages(chatsState.room?.id!).then()
		ref?.current?.addEventListener('scroll', e => {
			console.log(e)
		})
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
				<div className={s.messages} ref={ref}>
					<div ref={endRef}/>
					{chatsState.messages.map(message => (
						<MessageItem message={message} key={message.id}/>
					))}
					<div ref={detectorRef}/>
				</div>
			</Content>
			<IonFooter>
				<IonToolbar>
					<MessageInputForm endRef={endRef}/>
				</IonToolbar>
			</IonFooter>
		</IonPage>
	)
})
