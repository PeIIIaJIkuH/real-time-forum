import {IonButton, IonIcon, IonItem, useIonToast} from '@ionic/react'
import {Form, Formik, FormikProps, FormikValues} from 'formik'
import {send} from 'ionicons/icons'
import {observer} from 'mobx-react-lite'
import {FC, useEffect, useRef, useState} from 'react'
import appState from '../../store/appState'
import authState from '../../store/authState'
import chatsState from '../../store/chatsState'
import {MessageValues, WsEventType} from '../../types'
import {InputItem} from '../InputItem/InputItem'
import s from './MessageInputForm.module.css'

export const MessageInputForm: FC = observer(() => {
	const toast = useIonToast()[0],
		socket = useRef<WebSocket>(),
		[id, setId] = useState(0)

	const initialValues: MessageValues = {
		content: null
	}

	const onSubmit = async (values: FormikValues, {resetForm}: any) => {
		if (!values.content || !values.content.trim()) {
			return
		}
		appState.setIsLoading(true)
		appState.setIsLoading(false)
		socket.current?.send(JSON.stringify({
			content: values.content,
			eventType: 'Message'
		}))
		resetForm()
	}

	const reconnect = () => {
		console.log('reconnect')
		setTimeout(() => {
			setId(prev => prev + 1)
		}, 1000)
	}

	useEffect(() => {
		socket.current = new WebSocket(`ws://localhost:8081/api/v1/message/${chatsState.room?.id}`)
		socket.current!.onmessage = (e) => {
			const data = JSON.parse(e.data)
			const eventType: WsEventType = data.eventType
			console.log('message', data)
			switch (eventType) {
				case 'Message':
					const message = {
						...data.message,
						isYourMessage: data.message.user.id === authState.user?.id
					}
					chatsState.pushFront([message])
					break
				case 'PingMessage':
					socket.current?.send(JSON.stringify({
						eventType: 'PongMessage'
					}))
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
							handleChange={handleChange} handleSubmit={handleSubmit} withLine={false} placeholder='Message'
							padding={false}
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
