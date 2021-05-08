import {IonGrid, IonItem, IonList} from '@ionic/react'
import {FC, useEffect} from 'react'
import {Redirect} from 'react-router'
import appState from '../store/appState'
import authState from '../store/authState'

export const Chats: FC = () => {
	useEffect(() => {
		appState.setTitle('Chats')
	}, [])
	
	if (!authState.user)
		return <Redirect to='/auth'/>

	return (
		<IonGrid fixed className='ion-no-padding'>
			<IonList>
				{Array(25).fill(1).map((n, i) => (
					<IonItem key={i}>Chat {n}</IonItem>
				))}
			</IonList>
		</IonGrid>
	)
}
