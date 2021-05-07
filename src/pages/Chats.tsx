import {IonItem} from '@ionic/react'
import {FC, useEffect} from 'react'
import appState from '../store/appState'

export const Chats: FC = () => {
	useEffect(() => {
		appState.setTitle('Chats')
	}, [])
	
	return (
		<IonItem>Chats</IonItem>
	)
}
