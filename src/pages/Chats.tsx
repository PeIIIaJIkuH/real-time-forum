import {IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react'
import {FC} from 'react'

export const Chats: FC = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar className='ion-text-center'>
					<IonTitle>Chats</IonTitle>
				</IonToolbar>
			</IonHeader>
		</IonPage>
	)
}
