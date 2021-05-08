import {IonGrid, IonItem, IonList} from '@ionic/react'
import {FC, useEffect} from 'react'
import appState from '../store/appState'

export const Chats: FC = () => {
	useEffect(() => {
		appState.setTitle('Chats')
	}, [])

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
