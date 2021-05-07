import {IonContent, IonFooter, IonHeader, IonMenu, IonTitle, IonToolbar} from '@ionic/react'
import {FC} from 'react'

export const Menu: FC = () => {
	return (
		<IonMenu side='start' contentId='main'>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Real time forum</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonTitle>PeIIIaJIkuH, indecember</IonTitle>
				</IonToolbar>
			</IonFooter>
		</IonMenu>
	)
}
