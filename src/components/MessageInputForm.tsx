import {IonButton, IonIcon, IonList, useIonToast} from '@ionic/react'
import {Form, Formik, FormikProps, FormikValues} from 'formik'
import {paperPlaneOutline} from 'ionicons/icons'
import {observer} from 'mobx-react-lite'
import {FC, useEffect, useRef, useState} from 'react'
import appState from '../store/appState'
import chatsState from '../store/chatsState'
import {MessageValues} from '../types'
import {InputItem} from './InputItem/InputItem'

export const MessageInputForm: FC = observer(() => {
	const toast = useIonToast()[0],
		socket = useRef<WebSocket>(),
		[id, setId] = useState(0)

	const initialValues: MessageValues = {
		content: null
	}

	const onSubmit = async (values: FormikValues, {resetForm}: any) => {
		if (!values.content.trim()) {
			return
		}
		appState.setIsLoading(true)
		appState.setIsLoading(false)
		socket.current?.send(JSON.stringify({content: values.content}))
		resetForm()
	}

	useEffect(() => {
		socket.current = new WebSocket(`ws://localhost:8081/api/v1/message/${chatsState.room?.id}`)

		socket.current!.onclose = () => {
			setTimeout(() => {
				setId(prev => prev + 1)
			}, 1000)
		}

		socket.current!.onerror = () => {
			socket.current?.close()
		}

		socket.current!.onmessage = (e) => {
			console.log('message', JSON.parse(e.data))
		}

		return () => {
			socket.current!.close()
		}
	}, [id])

	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit}>
			{({values, handleSubmit, handleChange, errors, touched}: FormikProps<MessageValues>) => (
				<Form onSubmit={handleSubmit}>
					<IonList style={{display: 'flex', justifyContent: 'space-between'}}>
						<InputItem touched={touched.content} error={errors.content} value={values.content} type='text' name='content' label='Message'
								   handleChange={handleChange} handleSubmit={handleSubmit}/>
						<IonButton type='submit' expand='full' className='ion-margin' shape='round'>
							<IonIcon icon={paperPlaneOutline} slot='icon-only'/>
						</IonButton>
					</IonList>
				</Form>
			)}
		</Formik>
	)
})
