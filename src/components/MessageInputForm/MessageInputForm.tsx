import {IonButton, IonIcon, IonItem} from '@ionic/react'
import {Form, Formik, FormikProps, FormikValues} from 'formik'
import {send} from 'ionicons/icons'
import {observer} from 'mobx-react-lite'
import {FC, RefObject, useEffect, useRef, useState} from 'react'
import appState from '../../store/appState'
import authState from '../../store/authState'
import chatsState from '../../store/chatsState'
import {MessageValues, WsEventType} from '../../types'
import {InputItem} from '../InputItem/InputItem'
import s from './MessageInputForm.module.css'
import {chatsAPI} from '../../api/chats'
import {InputChangeEventDetail} from '@ionic/core'
import throttle from 'lodash.throttle'

interface Props {
	endRef?: RefObject<HTMLDivElement>
}

export const MessageInputForm: FC<Props> = observer(({endRef}) => {
	const socket = useRef<WebSocket>()
	const [id, setId] = useState(0)
	const timer = useRef<number | null>(null)
	const value = useRef('')

	const initialValues: MessageValues = {
		content: null,
	}

	const onSubmit = async (values: FormikValues, {resetForm}: any) => {
		if (!values.content || !values.content.trim()) {
			resetForm()
			return
		}
		appState.setIsLoading(true)
		socket.current?.send(JSON.stringify({
			content: values.content,
			eventType: 'Message',
		}))
		resetForm()
	}

	const reconnect = () => {
		console.log('reconnect')
		setTimeout(() => {
			setId(prev => prev + 1)
		}, 1000)
	}

	const sendTyping = () => {
		if (!value.current) {
			return
		}
		const data = {
			eventType: 'TypingInReceiver',
			typingInReceiverID: chatsState.room?.user.id,
		}
		socket.current?.send(JSON.stringify(data))
	}

	const sendTypingInSender = throttle(sendTyping, 2000, {
		leading: true,
	})

	useEffect(() => {
		socket.current = new WebSocket(`ws://localhost:8081/api/v1/message/${chatsState.room?.id}`)
		socket.current!.onmessage = (e) => {
			const data = JSON.parse(e.data)
			const eventType: WsEventType = data.eventType
			switch (eventType) {
				case 'Message':
					appState.setIsLoading(false)
					const isYourMessage = data.message.user.id === authState.user?.id
					const message = {
						...data.message,
						isYourMessage,
					}
					if (!isYourMessage) {
						chatsAPI.readMessage(chatsState.room?.id!, message.id).then()
					}
					chatsState.pushFront([message])
					setTimeout(() => {
						endRef?.current?.scrollIntoView({behavior: 'smooth'})
					}, 10)
					break
				case 'PingMessage':
					socket.current?.send(JSON.stringify({
						eventType: 'PongMessage',
					}))
					break
				case 'TypingInSender':
					if (data.typingInUserID !== chatsState.room?.user.id) {
						break
					}
					chatsState.setIsTyping(true)
					if (timer.current) {
						window.clearTimeout(timer.current)
					}
					// @ts-ignore
					timer.current = setTimeout(() => {
						chatsState.setIsTyping(false)
					}, 3000)
					break
				case 'WsError':
				case 'WsClosed':
					reconnect()
					break
			}
		}
		return () => {
			socket.current!.close()
		}
	}, [id])

	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit}>
			{({values, handleSubmit, handleChange, errors, touched}: FormikProps<MessageValues>) => (
				<Form onSubmit={handleSubmit}>
					<IonItem className={s.item} lines='none'>
						<InputItem
							touched={touched.content} error={errors.content} value={values.content} type='text' name='content'
							handleSubmit={handleSubmit} withLine={false} placeholder='Message' padding={false} maxLength={100}
							handleChange={(e: CustomEvent<InputChangeEventDetail>) => {
								handleChange(e)
								if (e.detail.value != null) {
									value.current = e.detail.value
								}
								if (e.detail.value) {
									sendTypingInSender()
								}
							}}
						/>
						<IonButton type='submit' className={s.button} fill='clear' slot='end' shape='round' size='default'>
							<IonIcon icon={send} slot='icon-only'/>
						</IonButton>
					</IonItem>
				</Form>
			)}
		</Formik>
	)
})
